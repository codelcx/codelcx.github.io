# 内置模块

中文：https://nodejs.cn/api/

官网：https://nodejs.org/docs/latest/api/



## fs

```js
// 回调形式
const fs = require('node:fs')
// promise形式
const pfs = require('node:fs/promises')
```

文件夹

```js
fs.mkdir(path[,options],callback)
```

```js
// 创建文件夹
fs.mkdir('/temp', err=> {})
fs.mkdir('/temp/demo', { recursive: true }) 

// 删除文件夹
fs.rm('/temp/demo', { recursive: true }) 

// 重命名文件夹
fs.rename('/temp/demo','/temp/test') // 重命名
fs.rename('/temp/demo', 'test') // 移动至temp同级并重命名
```

监听文件

```js
fs.watch('test.txt', (event, filename)=>{})
```

读取文件

```js
fs.readFile('./test.txt',(err,data)=> {})
pfs.readFile('./test.txt').then(res=>{}).catch(err=>{})
```

读取文件流

```js
const stream = fs.createReadStream('./test.txt')
stream.on('data', chunk => console.log(chunk.toString()))
stream.on('end',() => console.log('read end'))
```

```js
const fileHandler = pfs.open('./test.txt')
const stream = fileHandler.createReadStream()
stream.on('data', chunk => console.log(chunk.toString()))
```

写入文件

```js
// 替换文件内容
fs.writeFile('/test.txt', 'Hello World',err=>{})
// 追加文件内容
fs.appendFile('test.txt', 'Hello World!', err=>{})
```

写入文件流

```js
const content = ['Hello', 'World', 'Node.js']
const stream = fs.createWriteStream('file.txt', 'utf-8')

content.forEach(item => stream.write(item + '\n'))

stream.on('finish', () => {})
stream.on('error', (err) => {})
stream.end() // 需要关闭
```







## os

```js
const os = require('node:os')
```

```js
os.type() // 操作系统类型 Linux：Linux、macOS：Darwin、windows：Windows_NT
os.platform() // 返回标识为其编译Nodejs二进制文件的操作系统平台字符串
os.release() // 返回操作系统的版本
os.version() // 返回操作系统版本
os.homedir() // 返回用户目录，底层原理  windows:%userprofile%  macOS: $H
os.arch() // 返回CPU架构
os.cpus() // 获取CPU线程及其详细信息
os.networkInterfaces() // 获取网络信息
```



## util

```js
const util = require('node:util')
```

```js
// 普通函数改造为Promise
const execPromise = util.promisify(exec)
execPromise('node -v')
  .then(res => console.log(res))
  .catch(err => console.log(err))
```

```js
// Promise转为回调函数
const fn = flag => flag ? Promise.resolve('success') : Promise.reject('error')
const callback = util.callbackify(fn)
callback(1, (err,value) => console.log(err,value))
```



## zlib

```js
const fs = require('node:fs')
const zlib = require('node:zlib')

const { 
  createGzip, createGunzip,
  createDeflate, createInflate,
} = zlib

// gzip：适合压缩文件
const readStream1 = fs.createReadStream('test.txt')
const writeStream1 = fs.createWriteStream('test.txt.gz')
readStream1.pipe(createGzip()).pipe(writeStream1)

// gunzip
const readStream2 = fs.createReadStream('test.txt.gz')
const writeStream2 = fs.createWriteStream('test.txt')
readStream2.pipe(createGunzip()).pipe(writeStream2)


// deflate：适合压缩编码内容
const readStream3 = fs.createReadStream('test.txt')
const writeStream3 = fs.createWriteStream('test.txt.deflate')
readStream3.pipe(createDeflate()).pipe(writeStream3)

// inflate
const readStream4 = fs.createReadStream('test.txt.deflate')
const writeStream4 = fs.createWriteStream('test.txt')
readStream4.pipe(createInflate()).pipe(writeStream4)
```



## http

```bash
npm install nodemon -g 
nodemon index.js # 监听文件变化自动重启服务
```

```bash
# vscode plugin: REST Client  file: <name>.http   接口请求插件 
GET http://localhost:3000/api/get?name=John%20Doe&email=john.doe@example.com HTTP/1.1

POST http://localhost:3000/api/post
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john.doe@example.com"
}
```

```js
const url = require('node:url')
const http = require('node:http')

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true)

  if (req.method === 'POST' && pathname === '/api/post') {
    req.on('data',chunk=> console.log(chunk.toString()))
    req.on('end',()=> res.end('post request ok'))
  } 

  else if (pathname === '/api/get') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(query))
  }
  
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not found URL')
  }
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/')
})
```



## path

```js
const path = require('node:path')
```

```js
path.basename('/temp/index.html') // index.html 返回指定路径的最后一部分 
path.dirname('/temp/index.html') // /temp 返回指定路径除了最后一部分的内容
path.extname('/temp/index.html') // .html 返回最后一个扩展名，无.则返回空
path.join('/temp','index.html') // /temp/index.html 路径拼接
```

```js
path.resolve() // 将相对路径解析为绝对路径
path.resolve('/a','/b') // 多个相对路径只返回最后一个的绝对路径
path.resolve(__dirname, 'index.html') // 返回__dirname+index.html
path.resolve('index.html') // 返回工作目录+index.html
```

```js
path.parse('/temp/index.html') // 返回路径的组成部分的一个对象

{
  root: '/',
  dir: '/temp',
  base: 'index.html',
  ext: '.html'
  name: 'index'
}

path.formt({...}) // 将路径组成的对象转为字符串
```



## crypto

```js
const crypto = require('node:crypto')
```

对称加密

```js
const iv = crypto.randomBytes(16)
const key = crypto.randomBytes(32)

const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
cipher.update('hello world', 'utf8', 'hex')
const encrypted = cipher.final('hex')
console.log(encrypted)

const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
decipher.update(encrypted, 'hex', 'utf8')
const decrypted = decipher.final('utf8')
console.log(decrypted)
```

非对称加密

```js
const { publicKey, privateKey } = crypto.generateKeyPairSync(
  'rsa', { modulusLength: 2048 }
)
const encrypted = crypto.publicEncrypt(publicKey, Buffer.from('hello world'))
console.log(encrypted.toString('hex'))
const decrypted = crypto.privateDecrypt(privateKey, encrypted)
console.log(decrypted.toString('utf-8'))
```

哈希函数

```js
const hash = crypto.createHash('md5')
hash.update('hello world')
console.log(hash.digest('hex'))

// md5常用于校验文件完整性 
```



## events

```js
const eventEmitter = require('node:events')
```

```js
const event = new EventEmitter()

// 监听事件
event.on('test', (data) => console.log(data))

// 派发事件
event.emit('test', 'test-event')

// 取消事件,必须是同一个函数
const fn = (data) => console.log(data)
event.on('off-test', fn)
event.off('off-test', fn)

// 仅监听一次
event.emit('once-test', 'xxx')
event.emit('once-test', 'zzz')
event.once('once-test', (data) => console.log(data)) // xxx
```





## child_process

```js
const {
  fork,
  exec, execSync, 
  spawn, spawnSync, 
  execFile, execFileSync 
} = require('child_process')

// 存在`Sync`后缀表示为同步方法，否则为异步方法
```

options

```js
cwd <string> // 子进程的当前工作目录
env <Object> // 环境变量键值对
encoding <string> // // 默认为 'utf8' 
shell <string> // 用于执行命令的 shell。 UNIX默认为 '/bin/sh'，Windows 默认为process.env.ComSpec
timeout <number> // 默认为 0 
maxBuffer <number> // stdout，stderr 允许最大字节数。 默认为 200*1024。 如果超过限制，则子进程会被终止
killSignal <string> | <integer> // 默认为 'SIGTERM'
uid <number> // 设置该进程的用户标识
gid <number> // 设置该进程的组标识
```



exec：执行shell命令，字节上限200kb

```js
exec('node -v',(err,stdout,stderr)=>{})
execSync('node -v') // 直接返回结果（Buffer）
execSync('start chrome http://www.baidu.com') // 与软件交互
```



spawn：执行shell命令，实时返回流，无字节上限

```js
const {stdout} = spawn('netstat',['-a'])
stdout.on('data', msg => console.log(msg))
stdout.on('close', () => console.log('end'))
```



execFile：执行可执行文件，如 cmd、shell、bash

```js
execFile('./bat.cmd',(err, stdout,stderr)=>{})
```



fork：适合CPU密集型任务或耗时任务的场景

```js
const testProcess = fork('./test.js')

testProcess.send('我是主进程')
testProcess.on("message", data => console.log('我是主进程接受消息：',data))
```

```js
process.on('message', data => console.log('子进程接受消息：',data))
process.send('我是子进程')
```

