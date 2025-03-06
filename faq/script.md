# 面试题（Javascript）



## 作用域

作用域是限制变量能够访问的范围

作用域链是查找变量的规则

```
1. 全局作用域
2. 函数作用域
3. 块级作用域（由{}、let/const、if、for等创建）
4. 模块作用域（ES6模块）
5. eval作用域（严格模式下eval有自己的作用域）
6. 动态作用域（如Bash中的，但JavaScript默认是词法作用域）
```



## 定时器

**`setTimeout`**：这个函数用于在指定的毫秒数后执行一个函数或指定的代码段。它返回一个定时器ID，可以用于取消定时器。

```ts
setTimeout(function() {
  console.log("Hello, world!");
}, 1000); // 1秒后执行
```

**`setInterval`**：这个函数用于每隔指定的毫秒数重复执行一个函数或指定的代码段。它返回一个定时器ID，可以用于取消定时器。

```ts
setInterval(function() {
  console.log("Hello, world!");
}, 1000); // 每秒执行一次
```

**`requestAnimationFrame`**：用于在浏览器准备好绘制下一帧时执行一个函数。它通常用于动画效果，因为它可以确保动画的流畅性。

```ts
function animate() {
  // 更新动画
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```



## 标签加载

脚本加载

```
defer：异步下载，延迟到整个页面都解析完毕后再执行。脚本会在DOMContentLoaded之前执行
async：异步下载，如果HTML未加载完成会阻塞页面渲染。脚本下载完成后，一旦可用就会执行
```

样式加载

```
css加载会阻塞DOM树渲染，不会阻塞DOM树解析；DOM解析和CSS解析是并行的
css加载会阻塞JS的执行，因此样式表位置应与JS位置之前，保证先加载CSS
```

```
link & @import

1、link属于HTML标签，无兼容性问题；@import是CSS提供的，低版本不支持
2、link多个时会按顺序加载
3、@import必须顶层导入，多个则按顺序加载
4、@import会在当前样式表加载完成后才加载
5、link权重高于@import，link优先加载
```



## 拷贝字符串

```js
const str = 'hello word'

str.substring()
str.concat()
str.slice()
```



## 深拷贝对象

```js
function deepClone(obj, result) {
  const result = result || {}

  for (let prop in obj) {
    // 判断是否为自身属性
    if (obj.hasOwnProperty(prop)) {
      if (typeof obj[prop] == 'object' && obj[prop] !== null) {
        // 引用值：Array、Object
        const isObject = 
              Object.prototype.toString.call(obj[prop]) == '[object Object]'
        result[prop] = isObject ? {} : []
        deepClone(obj[prop], result[prop])
      } else {
        // 原始值、Function
        result[prop] = obj[prop]
      }
    }
  }

  return result
}
```

:::danger JSON.parse、JSON.stringify深拷贝弊端

```
无法复制函数和 undefined：忽略对象的函数属性和 undefined 属性
这些属性在拷贝后的对象中不会存在。

无法复制循环引用：如果对象中存在循环引用会抛出错误。

无法复制特殊类型：无法正确处理 Date、RegExp、Map、Set、Blob 等特殊类型的对象。
这些对象在拷贝后的对象中可能会丢失部分信息或无法正确地复制。

无法复制不可枚举属性：只能复制对象自身的可枚举属性，不能复制继承的可枚举属性。

无法复制 Symbol 属性：会忽略对象的 Symbol 属性。

无法复制属性描述符：只能复制属性值，不能复制属性描述符（如 writable、enumerable、...）

性能问题：对于大型对象可能会导致性能问题。
```

:::

```js
const obj = {
	name: 'vue',
	addr: undefined,
	say: () => console.log('hello'),
	set: new Set([1,2]),
    map: new Map([['key', 'value']]),
	syml: Symbol('syml'),
    [Symbol('symbol')]: 'symbol'
}

Object.defineProperty(obj, 'age', {
  value: 30,
  enumerable: false
});

JSON.parse(JSON.stringify(obj))
// {"name": "vue","set": {},"map": {}}
```



## 实现 new

```js
function myNew(constructor, ...args) {
  // 1. 创建新对象，并关联构造函数的原型
  const newObj = Object.create(constructor.prototype);
  
  // 2. 执行构造函数，绑定this到新对象
  const result = constructor.apply(newObj, args);
  
  // 3. 根据返回值类型决定最终结果
  const isObjectOrFunction = result !== null 
  && (typeof result === 'object' || typeof result === 'function');
    
  return isObjectOrFunction ? result : newObj;
}
```



## 实现 Promise

````ts
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;    // 存储成功的结果
    this.reason = undefined;   // 存储失败的原因
    this.onFulfilledCallbacks = []; // 成功回调队列
    this.onRejectedCallbacks = [];  // 失败回调队列

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject); // 同步执行传入的函数
    } catch (err) {
      reject(err); // 捕获同步错误
    }
  }
}
````

```ts
class MyPromise {
  // ... 前面的构造函数代码 ...

  then(onFulfilled, onRejected) {
    // 处理非函数参数（规范要求）
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err; };

    const newPromise = new MyPromise((resolve, reject) => {
      const handleFulfilled = () => {
        // 使用 setTimeout 模拟微任务（真实 Promise 是微任务）
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      };

      const handleRejected = () => {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      };

      // 根据当前状态决定立即执行还是加入队列
      if (this.state === 'fulfilled') {
        handleFulfilled();
      } else if (this.state === 'rejected') {
        handleRejected();
      } else { // pending
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });

    return newPromise;
  }
}

// 辅助函数：处理 then 返回值的递归解析（兼容其他 Promise）
function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('Chaining cycle detected'));
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}
```

