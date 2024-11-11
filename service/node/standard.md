# 模块规范

## CJS

引入模块

```js
// 内置模块
const fs = require('node:fs')
// 第三方模块
const express = require('express')
// 自定义模块
const myModule = require('./myModule.js')
// C++ 扩展模块
const nodModule = require('./myModule.node')
```

导出模块

```js
// 对象导出
module.exports = {}
// 变量导出
module.exports = [variable]
```





## ESM

导出模块

```js
// 变量导出
export const variable = 'node'
// 定义后再导出
export {a,b}
// 默认导出只能存在一个
export default variable
```



静态导入：必须写在顶层

```js
// 默认导出名字可以随意
import variable from './myModule.js'
// 具名导入
import {a,b} from './myModules.js'
// 导入重命名
import { a as _a} from './myModules.js'
// 导入整个模块
import * as M from './myModules.js'
// 具名+默认
import variable,{a} from './myModules.js'
// 导入JSON文件，低版本不支持，高版本为实验特性
import data from './data.json' assert { type: "json" }
```

动态导入：import函数模式

```js
if(true) import('./myModule.js').then()
```



ESM的导入是引用传递

```js
export let a = 1
export const fn = () => { a++, console.log('module:', a) } // module: 2

setTimeout(fn, 2000)
```

```js
import { a } from './esm.js'

let b = a

console.log(a) // 1

b++
console.log(a, b) // 1 2

setTimeout(() => console.log('main:', a), 3000) // main: 2
```



## 两者区别

1、CJS是基于运行时的同步加载，ESM是基于编译时的异步加载

2、CJS是可修改值的，ESM值是只读的

3、CJS不可以`tree shaking`，ESM支持`tree shaking`

4、CJS中顶层的`this`指向这个模块本身，而ESM中顶层`this`指向`undefined`

