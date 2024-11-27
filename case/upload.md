# 文件分片

1. ‌**减少单次上传的数据量**‌：将大文件切割成多个小文件（切片）后，每个切片的大小相对较小，这样可以减少单次上传的数据量。每次上传的数据量减少，可以显著降低网络传输的负担，从而提高上传速度‌
2. ‌**并发上传**‌：客户端可以将多个切片同时上传，利用多线程或多进程并发上传这些切片。这样不仅可以充分利用网络带宽，还能在某个切片上传失败时，其他切片继续上传，从而提高整体的上传效率和稳定性‌
3. ‌**减少上传失败的概率**‌：由于每个切片的大小较小，即使某个切片上传失败，也不会影响整个文件的上传。服务器可以重新上传失败的切片，而不需要重新上传整个文件，这大大减少了上传失败的可能性‌





## 基本布局

::: details html

```vue
<template>
  <div class="upload-file">
    <h2>文件上传</h2>

    <div class="show-upload-file">
      <div class="file-item" v-for="item in uploadFileList">
        <div class="info">
          <span class="name">{{ item.fileName }}</span>
          <span class="size">{{ formatFileSize(item.fileSize) }}</span>
          <el-progress :percentage="item.progress" />
        </div>

        <div class="op">
          <span v-if="item.status === UploadStatus.wait">等待</span>
          <span v-if="item.status === UploadStatus.processing">正在处理</span>
          <span v-if="item.status === UploadStatus.uploading" @click="pauseUpload(item)">暂停</span>
          <span v-if="item.status === UploadStatus.pause" @click="continueUpload(item)">恢复</span>
          <span v-if="item.status === UploadStatus.uploading" @click="cancelUpload(item)">删除</span>
          <span v-if="item.status === UploadStatus.success">完成</span>
          <span v-if="item.status === UploadStatus.error" @click="continueUpload(item)">重试</span>
        </div>
      </div>
    </div>

    <div class="select-upload-file" @click="$refs.upload.click()">
      <span>选择文件</span>
      <input ref="upload" type="file" multiple @change="onChange" style="display: none;" />
    </div>
  </div>
</template>
```

:::

::: details setup

```ts
// format file size kb|M|G
const formatFileSize = (size: number) => {}

// web-worker
const useWorker = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('../utils/worker.ts', import.meta.url))
    worker.postMessage({ file })
    worker.onmessage = (e) => {
      const { err } = e.data
      err ? reject(err) : resolve(e.data as any)
    }

    worker.onerror = (err) => reject(err)
  })
}

// upload file
const onChange = async (e: Event) => {
  const files = (<HTMLInputElement>e.target)?.files || []
  if (!files.length) return
  Array.from(files).forEach(file => handleUploadFile(file, useWorker))
}
```



:::

::: details css

```css
<style scoped lang="scss">
.upload-file {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 600px;
  height: 800px;
  padding: 20px;
  margin: 0 auto;
  box-sizing: border-box;

  .show-upload-file {
    flex: 1;
    width: 100%;
    overflow-y: auto;

    .file-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .info {
        flex: 1;

        .name {
          font-weight: bold;
        }

        .size {
          color: #ccc;
          font-size: 14px;
          margin-left: 10px;
        }
      }

      .op {
        display: flex;
        gap: 10px;
        align-self: flex-end;
        width: 100px;
        color: #4096ef;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }

  .select-upload-file {
    width: 100%;
    padding: 10px;
    text-align: center;
    color: #fff;
    background-color: #4096ef;
    border-radius: 10px;
    cursor: pointer;
  }
}
</style>
```

:::



## 类型定义

```ts
// 切片类型
export type UploadChunk = {
  /**  文件hash */
  fileHash: string
  /**  文件大小 kb */
  fileSize: number
  /**  文件名 */
  fileName: string
  /**  文件切片 */
  chunkFile: Blob
  /**  文件切片索引 */
  chunkIndex: number
  /**  文件切片hash */
  chunkHash: string
  /**  文件切片个数 */
  chunkNum: number
  /**  文件切片大小 */
  chunkSize: number
  /**  是否已上传 */
  finish: boolean
  /** 取消请求 */
  cancel: Function | null
}

export enum UploadStatus {
  /** 未处理 */
  wait,
  /** 处理中 */
  processing,
  /** 上传中 */
  uploading,
  /** 暂停 */
  pause,
  /** 错误 */
  error,
  /** 成功 */
  success,
}

export type UploadStatusValue = `${UploadStatus}`
export type UploadStatusKey = keyof typeof UploadStatus

// 文件类型
export type UploadFile = {
  /**  文件hash */
  fileHash: string
  /**  文件大小 kb */
  fileSize: number
  /**  文件名 */
  fileName: string
  /**  所有未上传的切片 */
  chunks: UploadChunk[]
  /**  文件切片个数 */
  chunkNum: number
  /**  完成个数 */
  finishNum: number
  /**  错误个数 */
  errorNum: number
  /**  进度 */
  progress: number
  /**  状态 */
  status: UploadStatus
  /** 正在请求的队列 */
  queue: UploadChunk[]
}

// webWork Hash
export type HashData = {
  hash: string
  chunks: Blob[]
}

export type HashFunction = (file: File) => Promise<HashData>
```

```ts
// upload file hook
export function useUpload() {
  // 上传列表
  let uploadFileList = reactive<UploadFile[]>([])
  // 错误次数
  const errorNum = 3
  // 请求并发数，浏览器同域名同一时间请求的最大并发数限制为6
  const maxRequest = 6
  
  // mthods: handleUploadFile、uploadFile、uploadChunk... 
 }
```



## 前置处理

```ts
  const handleUploadFile = async (file: File, callback: HashFunction) => {
    // 初始化上传文件
    const initUploadFile: UploadFile = reactive({
      fileHash: '',
      fileSize: file.size,
      fileName: file.name,
      chunks: [],
      chunkNum: 0,
      finishNum: 0,
      errorNum: 0,
      progress: 0,
      status: UploadStatus.wait,
      queue: []
    })

    // 添加到上传列表
    uploadFileList.push(initUploadFile)

    // 解析文件
    console.log('开始解析文件：', file.name)
    initUploadFile.status = UploadStatus.processing
    const { hash, chunks } = await callback(file)
    console.log('解析文件完成：', file.name)

    // 文件校验
    const lastIndex = file.name.lastIndexOf('.')
    const baseName = lastIndex === -1 ? file.name : file.name.slice(0, lastIndex)
    const fileHash = `${baseName}-${hash}`
    const [needUpload, uploadChunkList] = await verifyFile(fileHash, file.name)
    if (needUpload === false) {
      uploadComplete(initUploadFile)
      return
    }

    // 初始化切片
    initUploadFile.fileHash = fileHash
    initUploadFile.chunks = chunks.map((item, index) => {
      return {
        fileHash: fileHash,
        fileName: file.name,
        fileSize: file.size,
        chunkFile: item,
        chunkIndex: index,
        chunkHash: `${fileHash}-${index}`,
        chunkSize: item.size,
        chunkNum: chunks.length,
        finish: false,
        cancel: null
      }
    })

    // 过滤已上传的切片,并更新需要上传的切片数量
    initUploadFile.chunkNum = initUploadFile.chunks.length
    initUploadFile.finishNum = uploadChunkList.length || 0
    initUploadFile.progress = Math.floor(initUploadFile.finishNum / initUploadFile.chunkNum * 100)
    initUploadFile.chunks = initUploadFile.chunks.filter(item => !uploadChunkList.includes(item.chunkHash))

    // 上传文件
    uploadFile(initUploadFile)
  }
```





## 分片上传

对文件切片，同时上传多个分片，提高上传速度

上传过程检测错误，如网络中断，需要重新上传相关分片

同域名下浏览器并发请求存在限制，大量请求占用过多系统资源，容易造成接口阻塞，浏览器卡死

```ts
  // 上传文件
  const uploadFile = (task: UploadFile) => {
    // 切片全部上传或队列中的请求未完成则不处理
    if (task.chunks.length === 0 || task.queue.length > 0) return

    // 正在处理、上传的文件列表
    const taskArr = uploadFileList.filter(item => item.status === UploadStatus.processing || item.status === UploadStatus.uploading)

    // 动态获取每个文件能够并发请求的个数
    const limit = Math.ceil(maxRequest / taskArr.length)

    // 请求队列，分片从后往前请求，优先上传最后一片
    const queue = task.chunks.slice(-limit)
    task.queue.push(...queue)
    if (task.chunks.length > limit) task.chunks.splice(-limit)
    else task.chunks = []

    // 上传切片
    task.status = UploadStatus.uploading
    task.queue.forEach(item => uploadChunk(item, task))
  }

  // 上传切片
  const uploadChunk = async (chunk: UploadChunk, task: UploadFile) => {
    const data = new FormData()
    const { fileHash, fileName, fileSize, chunkFile, chunkIndex, chunkHash, chunkSize, chunkNum } = chunk
    data.append('fileHash', fileHash)
    data.append('fileName', fileName)
    data.append('fileSize', fileSize.toString())
    data.append('chunkFile', chunkFile)
    data.append('chunkHash', chunkHash)
    data.append('chunkIndex', chunkIndex.toString())
    data.append('chunkSize', chunkSize.toString())
    data.append('chunkNum', chunkNum.toString())

    const [res] = await uploadChunkApi(data, (fn: Function) => chunk.cancel = fn)
    if (task.status === UploadStatus.pause || task.status === UploadStatus.error) return

    // 上传失败
    if (!res || res.code !== 0) {
      task.errorNum++
      if (task.errorNum > errorNum) {
        task.status = UploadStatus.error
        pauseUpload(task, false)
        console.log('切片上传失败超过次数限制，暂停上传')
      }
      else {
        uploadChunk(chunk, task)
        console.log('切片上传失败且未超过次数限制，重新上传')
      }
    }

    // 上传成功
    else if (res.code == 0) {
      task.finishNum++
      chunk.finish = true
      task.errorNum > 0 ? task.errorNum-- : task.errorNum = 0
      task.progress = Math.floor(task.finishNum / chunkNum * 100)
      task.queue = task.queue.filter(item => item.finish === false)

      if (task.finishNum === chunkNum) {
        const [res] = await mergeFileApi(task.fileHash, task.fileName)
        if (!res || res.code !== 0) {
          task.status = UploadStatus.error
          console.log('合并文件失败')
        }
        else if (res.code == 0) {
          uploadComplete(task)
          console.log('合并文件成功，上传完成')
        }
      } else {
        uploadFile(task)
      }
    }
  }
```

```ts
	// 暂停上传
  const pauseUpload = (task: UploadFile, pause = true) => {
    // pause:true-> 手动暂定，false-> 请求中断
    task.status = pause ? UploadStatus.pause : UploadStatus.error
    task.errorNum = 0
    task.queue.forEach(item => item.cancel && item.cancel())
  }

  // 继续上传
  const continueUpload = (task: UploadFile) => {
    task.status = UploadStatus.uploading
    task.chunks.push(...task.queue)
    task.queue = []
    uploadFile(task)
  }
  
	// 取消上传
  const cancelUpload = (task: UploadFile) => {
    pauseUpload(task)
    uploadFileList = uploadFileList.filter(item => item.fileHash !== task.fileHash)
  }

  // 全部取消
  const cancelAllUpload = () => {
    uploadFileList.forEach(item => cancelUpload(item))
    uploadFileList = []
  }

  // 上传完成
  const uploadComplete = (task: UploadFile) => {
    task.progress = 100
    task.status = UploadStatus.success
  }
```



## 续传秒传 

利用MD5检测服务器是否已上传过该文件

- 如果存在则无需上传，直接显示上传完成

- 如果不存在，则返回之前上传过的所有文件切片哈希值，无需再次上传，并以此更新进度

```ts
  // 文件校验
  const verifyFile = async (fileHash: string, fileName: string) => {
    const data = new FormData()
    data.append('fileHash', fileHash)
    data.append('fileName', fileName)

    // 校验文件是否已上传
    const [res] = await verifyFileApi(fileHash, fileName)
    if (res && !res.data.needUpload) console.log('文件已上传')

    // 秒传标记  
    const needUpload = res?.data?.needUpload

    // 已上传的切片hash列表
    const chunks = res?.data?.uploadChunkList as string[] || []
    return [needUpload, chunks] as const
  }
```





## 哈希计算

哈希计算是CPU密集型任务，如果直接在主线程中执行，会阻塞主线程，导致页面卡顿

Web Worker可以在后台线程中执行哈希计算，不会阻塞主线程，从而保持页面的流畅运行‌

```ts
// @ts-ignore
importScripts('spark-md5.min.js');

/**
 * 文件切片
 * @param file 文件
 * @param size 分片大小，默认10M
 */
const createChunks = (file: File, size: number): Promise<Blob[]> => {
  return new Promise((resolve) => {
    const chunks: Blob[] = []
    for (let i = 0; i < file.size; i += size) {
      chunks.push(file.slice(i, i + size))
    }
    resolve(chunks)
  })
}

/**
 * 文件Hash
 * @param chunks 文件切片
 */
const calculateHash = (chunks: Blob[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    const spark = new SparkMD5()

    function _read(i: number) {
      if (i >= chunks.length) {
        resolve(spark.end())
        return
      }

      const blob = chunks[i]
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(blob)
      fileReader.onload = (e) => {
        const bytes = e.target!.result as ArrayBuffer
        spark.append(bytes)
        _read(i + 1)
      }

      fileReader.onerror = (err) => reject(err)
    }

    _read(0)
  })
}

const defaultChunkSize = 10 * 1024 * 1024

// 监听主线程的消息
self.addEventListener('message', async (e) => {
  try {
    const { file, chunkSize = defaultChunkSize } = e.data
    const chunks = await createChunks(file, chunkSize)
    const hash = await calculateHash(chunks)
    self.postMessage({ hash, chunks })
    self.close()
  }
  catch (err) {
    console.error('worker error:', e)
    self.postMessage({ err })
    self.close()
  }
})

// 监听主线程的错误
self.addEventListener('error', (e) => {
  console.error('master thread error:', e)
  self.close()
})


```

::: info 优化

对于超大文件，可以通过分块的形式，使用多个 webwrok 分别计算不同块的哈希，所有计算完成后，将结果排序，最终得到完整的文件哈希值

:::



## 前端请求

```ts
type RequestParam = {
  url: string
  data: any
  method?: RequestInit['method']
  headers?: RequestInit['headers'],
  signal?: AbortSignal
}

// 封装请求
const request = async (param: RequestParam) => {
  const { url, data, method = "GET", headers = {}, signal } = param

  return await fetch(`${url}`, {
    method,
    headers,
    signal,
    body: data
  })
    .then(res => res.json())
    .catch(err => console.log('request error', err))
}

// 文件校验
export const verifyFileApi = async (fileHash: string, fileName: string) => {
  const res = await request({
    url: '/api/verify',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ fileHash, fileName }),
  })

  return [res, null] as const
}


// 文件上传
export const uploadChunkApi = async (data: FormData, callback: Function) => {
  const controller = new AbortController()
  const { signal } = controller
  callback(() => controller.abort())

  const res = await request({
    url: '/api/upload',
    method: 'post',
    data,
    signal,
  })

  return [res, null] as const
}

// 文件合并
export const mergeFileApi = async (fileHash: string, fileName: string) => {
  const res = await request({
    url: '/api/merge',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ fileHash, fileName }),
  })

  return [res, null] as const
}
```



## 后端接口

```ts
import Koa from 'koa'
import Cors from '@koa/cors'
import koaBody from 'koa-body'
import KoaRouter from 'koa-router'
import fs from 'node:fs'
import path from 'node:path'

const app = new Koa()
const router = new KoaRouter()


// 文件上传
router.post('/upload', async (ctx) => {
  try {
    const data = ctx.request.body as UploadChunk
    const files = ctx.request.files?.chunkFile
    if (!data) return ctx.response.body = failUpload

    // 临时目录
    const { fileHash, chunkHash } = data
    const cachePath = createUploadDir(fileHash)

    // 二进制文件切片
    const chunkFile = Array.isArray(files) ? files[0] : files
    if (!chunkFile) return ctx.response.body = failUpload

    // 保存文件
    const content = fs.readFileSync(chunkFile.filepath)
    fs.writeFileSync(`${cachePath}/${chunkHash}`, content)

    ctx.response.body = successUpload
  }

  catch (err) {
    console.error('upload err:', err)
    ctx.response.body = failUpload
  }
})

// 文件合并
router.post('/merge', async (ctx) => {
  try {
    const data = ctx.request.body as UploadChunk
    const { fileHash, fileName } = data

    await mergeChunks(fileHash, fileName)
    ctx.response.body = successUpload
  }

  catch (err) {
    console.error('merge err:', err)
    ctx.response.body = failUpload
  }
})

// 文件校验
router.post('/verify', async (ctx) => {
  try {
    const data = ctx.request.body as UploadChunk
    const { fileHash, fileName } = data

    const ext = path.extname(fileName)
    const targetPath = path.join(UPLOAD_TARGET_DIR, `${fileHash}${ext}`)

    if (!fs.existsSync(targetPath)) {
      const cachePath = path.join(UPLOAD_TEMP_DIR, fileHash)
      const files = fs.existsSync(cachePath) ? fs.readdirSync(cachePath) : []
      const result = { needUpload: true, uploadChunkList: files }
      return ctx.response.body = Object.assign(verifyUpload, { data: result })
    }
    else {
      const result = { needUpload: false, uploadChunkList: [] }
      return ctx.response.body = Object.assign(verifyUpload, { data: result })
    }
  }
  catch (err) {
    console.error('verify err:', err)
    return ctx.response.body = verifyUpload
  }
})


// middleware
app.use(Cors({ origin: '*' }))
app.use(koaBody({
  multipart: true,
  json: true,
  formidable: {
    multiples: true,
  }
}))

// app.use(middlewareLog)
app.use(router.routes())


// error handle
app.on('error', async (err: any, ctx: any) => {
  console.error(err)
  ctx.status = 500
})

// listen
app.listen(port, () => {
  console.info(`Server is running on 3000 port`)
})
```

文件操作

```ts
// 临时文件目录，用于存储上传的文件
export const UPLOAD_TEMP_DIR = path.resolve(__dirname, '../../temp')
export const UPLOAD_TARGET_DIR = path.resolve(__dirname, '../../target')

// 创建临时文件夹
export const createUploadDir = (hash: string) => {
  const dir = path.resolve(UPLOAD_TEMP_DIR, hash)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  return dir
}

// 创建目标文件夹
export const createTargetDir = () => {
  const dir = path.resolve(__dirname, '../../target')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  return dir
}

// 合并切片
export const mergeChunks = async (fileHash: string, fileName: string) => {
  const targetPath = createTargetDir()
  const cachePath = createUploadDir(fileHash)
  const ext = path.extname(fileName)

  const files = fs.readdirSync(cachePath)
  // 切片排序
  files.sort((a, b) => Number(a.split('-').slice(-1)) - Number(b.split('-').slice(-1)))

  // 创建可写流，目标文件不存在时创建
  const writeStream = fs.createWriteStream(`${targetPath}/${fileHash}${ext}`)

  // 保证切片合并顺序
  const writeChunk = async (file: string) => {
    return new Promise((resolve, reject) => {
      const chunkPath = `${cachePath}/${file}`
      const readStream = fs.createReadStream(chunkPath)

      readStream.on('data', (chunk) => {
        writeStream.write(chunk)
      })

      readStream.on('end', () => {
        resolve('success')
        console.log(`chunk ${file} write finish`)
      })

      readStream.on('error', (err) => {
        console.error('readStream error:', err)
        writeStream.close()
        reject(err)
      })
    })
  }

  // 监听错误
  writeStream.on('error', (err) => {
    console.error('writeStream error:', err)
    writeStream.close()
  })

  // 监听写入完成
  writeStream.on('finish', () => {
    console.log('writeStream finish')
    // fs.rm(cachePath, { recursive: true }, err => console.log('delete temp dir error:', err))
  })

  for (const file of files) {
    await writeChunk(file)
  }

  // 关闭可写流
  writeStream.close()
}
```

响应数据格式

```ts
interface UploadResponse {
  data?: any
  message: string
  code: -1 | 0// 0: 成功，-1: 失败
}

interface verifyUpload extends UploadResponse {
  data: {
    needUpload: boolean
    uploadedList: string[]
  }
}

export const successUpload: UploadResponse = {
  code: 0,
  message: 'success',
}

export const failUpload: UploadResponse = {
  code: -1,
  message: 'error',
}


export const verifyUpload: verifyUpload = {
  code: 0,
  message: 'success',
  data: {
    needUpload: true,
    uploadedList: [],
  }
}
```

