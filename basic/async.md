# 异步

## async

`async`声明函数是异步的，而`await`用于等待一个异步方法的执行完成

可修饰的对象：函数语句、函数表达式、Lambda表达式

```js
async function fn() {}
const fn = async () => {}
```

返回值：promise

```js
// 常量：自动封装为 Promise.resolve(variable)
const fn = async () => 'async'
// 无返回值：自动封装为 Promise.resolve(undefined)
const fn = async () => {}
```

::: info

await只能出现在async中，await会阻塞后面的代码

无await情况下，不会阻塞后面的代码，此时无异于普通函数

:::

await等待一个async函数执行完成，准确的说是等待的是表达式结果即返回值，可以任何值

```js
const getValue = () => 'value'
const getAsync =  async () => Promise.resolve('async')

async function fn() {
  // 表达式返回非Promise，立即完成
  const v0 = await 10 // 10
  const v1 = await getValue() // value
  // 表达式返回的是Promise对象，等待决议完成
  const v2 = await getAsync() // async
}
```





## promise

promise决议后将永远保持该状，即Promise只能被决议一次，任何通过then注册的回调只会被调用一次

promise决议后，该Promise上所有通过then注册的回调都会在下一个异步时机点立即调用,这些回调中的任意一个都无法影响或延误对其他回调的调用

| 方式              | 描述                                                         |
| :---------------- | :----------------------------------------------------------- |
| Promise.all([..]) | 列表中的值有任何一个被拒绝则立马返回被拒绝的Promise，数组为空返回完成Promise |
| Promise.race[..]  | 根据列表值最先决议的结果返回Promise，数组为空永远不会决议    |
| Promise.none[..]  | 列表所有值为拒绝，即拒绝转化为完成                           |
| Promise.any[..]   | 只需要一个完成，忽略拒绝直到第一个完成                       |
| Promise.first[..] | 只要第一个完成，忽略后续任何拒绝或完成                       |
| Promise.last[..]  | 只要最后一个完成                                             |

错误处理

```ts
const p = Promise.resolve(10)

p.then(
  function fulfilled(msg){
    console.log(msg.toLowerCase())	// 出现错误
  },
  function rejected(err){
    console.log(err)
  }
)

// 无法在该then中调用拒绝处理函数，毕竟Promise只能决议一次，只能由下一个then处理，假如没有下一个then?
// 1.浏览器可以追踪Promise对象，在它被垃圾回收时若有拒绝，浏览器能够确保是一个真正的未捕获错误
// 2. .done(null,handleError),如果自身handleError引发异常会被抛出全局
// 3. 异常会跟随链式调用往下传递直到被捕获处理
```

执行顺序 [可视化执行栈](https://www.jsv9000.app/)

```ts
Promise.resolve()
  .then(() => {
  console.log('1')
  return Promise.resolve(2)
})
  .then((res) => {
  console.log(res)
})

Promise.resolve()
  .then(() => {
  console.log('3')
})
  .then(() => {
  console.log(4)
})
  .then(() => {
  console.log(5)
})

// 1 3 4 5 2
```

