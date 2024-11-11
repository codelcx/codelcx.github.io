# 全局变量



## global

```js
global.name = 'node'
globalThis.name = 'node'
```

> globalThis：ESMA2020新特性，为跨平台，浏览器自动转为 window，node自动转为global



## dirname

```js
const path = __dirname // 当前文件所在的目录的绝对路径
```



## filename

```js
const fileName = __filename // 当前文件的绝对路径
```



## process

```js
process.env // 当前环境的变量
process.cwd() // 当前工作目录绝对路径
process.on(event,listener) // 事件监听
process.exit([code]) // 退出当前进程，可提供可选退出码参数
process.pid // 当前进程ID
process.kill([pid]) // j
process.argv // 命令行参数数组，第一个参数：nodejs执行路径，第二个参数：当前执行文件的路径，其余参数：命令行参数
process.memoryUsage // 内存信息
```



## Buffer

创建实例

```js
Buffer.alloc(size[,fill[,encoding]]) // 创建指定大小的实例
Buffer.from(array) // 创建指定数组的实例
Buffer.from(string[,encoding]) // 创建指定字符串实例
```

读写数据

```js
buffer[index] // 读取实例指定字节
buffer.length // 获取实例字节长度
buffer.toString([encoding[,start[,end]]]) // 将实例转为字符串
buffer.slice([start[,end]]) // 获取原始实例部分内容
```

转换数据

```js
buffer.toJSON() 
```

其他方法

```js
Buffer.isBuffer(buffer) // 检测是否为Buffer实例
Buffer.concat(list[,totalLength]) // 将一组Buffer连接为新实例 
```

