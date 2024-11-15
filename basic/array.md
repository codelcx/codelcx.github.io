# Array

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array



## 数组解构

```js
const arr = [1, [2], 3, 4]
const [a,[b]] = arr

// 默认
const [a, b] = arr // a:1, b:2
// 忽略
const [, , c] = arr // c: 3
// 剩余
const [d, ...rest] = arr // d:1, rest: [2, 3, 4]
// 多余
const [, , , , e] = arr // e: undefined
// 默认值
const [, , , , f = 100] = arr // f:100
```





## 静态方法

### Array.of

创建新的数组实例，可接收可变数量的参数初始化数组

```js
Array.of() // []

Array.of('a', 'b', 1, 2, new Set([10])) // ['a', 'b', 1, 2, Set(2)] 
```

### Array.from

将可迭代或类数组对象转为数组实例

```js
Array.from('foo') // ['f', 'o', 'o']

Array.from([1, 2, 3], x => x + x)) // [2， 4， 6]

Array.from(new Set(['a', 'b'])) // ['a', 'b']

Array.from(new Map([[1,2]])) // [[1, 2]]
```



## 实例方法

### fill

填充数组中从起始索引到终止索引内的全部元素，修改原数组并返回

```js
const arr = [1, 2, 3, 4]

arr.fill(10) // [10, 10, 10, 10]
arr.fill(0, 2, 4) // [1, 2, 0, 0]
```

### sort

数组排序，默认是将元素转换为字符串并根据`UTF-16` 码值升序，修改原数组并返回

```js
const numArr = [10, 8, 6]
const strArr = ['Z','C','A']

strArr.sort() // ['A', 'C', 'Z']
numArr.sort() // [10， 8， 6]
numArr.sort((a, b) => a - b ) // [6, 8, 10]
numArr.sort((a, b) => b - a ) // [10, 8 , 6] 
```

::: tip

空槽位、undefined 均会被移动至数组末尾，空槽位排最后

:::



### pop

删除数组最后一个元素并返回该元素的值，影响原数组

```js
const arr = [1, 2, 3]
arr.pop() // 3
```



### push

将指定元素添加到数组末尾，并返回新数组长度，影响原数组

```js
const arr = []
arr.push(1,[2,3]) // 2, arr:[1, [2, 3]]
```



### shift

删除数组第一个元素并返回该元素的值，影响原数组

```js
const arr = [1, 2, 3]
arr.shift() // 3
```



### unshift

将指定元素添加到数组开头，并返回新数组长度，影响原数组

```js
const arr = ['x']
arr.unshift(1,[2,3]) // 3, arr:[1, [2, 3], 'x']
```



### splice

移除或替换已存在的元素，或添加新元素，返回被删除的元素，影响原数组

```js
// splice(index[,deleteCount[, ...itemN]])

const arr = [1, 2, 3]
arr.splice(1, 0, 10, 12) // [], arr: [1, 10, 12, 2, 3]
arr.splice(1, 1) // [10], arr: [1, 12, 2, 3]
arr.splice(1, 2, 20, 30, 40) // [12, 2], arr: [1, 20, 30, 40, 3]
```



### reverse

数组反转，修改原数组并返回

```js
const arr = ['A', 'B', 'C']
arr.reverse() // ['C', 'B', 'A']
```



### concat

合并多个数组，返回新数组

```js
const arr1 = [1, 2]
const arr2 = [3, 4]
arr1.concat(arr2, 'A', 'B') //  [1, 2, 3, 4, 'A', 'B']
arr1.concat(arr2, ['A', 'B']) //  [1, 2, 3, 4, 'A', 'B']
```



### slice

截取数组，返回新数组

```js
const arr = [1, 2, 3, 4, 5]
arr.slice() // [1, 2, 3, 4, 5]
arr.slice(2) // [3, 4, 5]
arr.slice(1, 3) // [2, 3]
```





### find

返回满足条件的第一个元素值

```js
[1, 2, 12, 20].find(v=> v > 10) // 12
```

反方向寻找

```js
[1, 2, 12, 20].findLast(v=> v > 10) // 12
```



### findIndex

返回满足条件的第一个元素索引值，不存在返回 `-1`

```js
[1, 2, 12, 20].findIndex(v=> v > 10) // 2
```

反方向查找

```js
[1, 2, 12, 20].findLastIndex(v=> v > 10) // 3
```



### includes

判断数组是否包含指定值

```js
[1, 2, 3].includes(2) // true 
```



### flat

扁平化数组，它会忽略空槽位，接收一个参数表示扁平的深度，默认`1`

```js
[1, 2, [3, [4]]].flat() // [1, 2, 3, [4]]
[1, 2, [3, [4]]].flat(2) // [1, 2, 3, 4]
```



### map

数组中的每个元素都经过提供函数的一次调用，返回新数组

```js
[1, 2, 3].map(v => v *2) // [2, 4, 6]
```





### filter

过滤数组中的元素，返回新数组

```js
[1, 2, 3, 4].filter(v => v % 2 === 0) // [2, 4]
```



### reduce

结果汇总，每次调用函数都将上次结果作为参数传入，返回结果值

```js
[1, 2, 3, 4].reduce((pre, cur) => pre + cur, 0) // 10
```

