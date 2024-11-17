# 集合

## Set

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set

1、允许你存储任何类型的值

2、集合中的元素是唯一的，相同元素会被剔除

3、能够保持原有的插入顺序对集合中的元素迭代

``` js
const set = new Set()

// 插入元素
set.add(1)
set.add('set')
set.add('set')
set.add({ a: 1 })
set.add(() => {})

// 集合元素个数
set.size

// 删除指定元素，返回布尔值
set.delete(1)

// 判断指定值是否存在集合中，返回布尔值
set.has('set')

// 遍历，按元素插入顺序访问
set.forEach(item => console.log(item))

// 新迭代对象，按插入顺序访问， 每个元素是元组形式：[value, value]
set.entries().forEach(item => console.log(item))

// 新迭代对象，按插入顺序访问, 包含所有元素的值，两者方式等价 
set.keys().forEach(item => console.log(item))
set.values().forEach(item => console.log(item))

// 清除集合所有元素
set.clear()
```



## WeakSet

1、只允许你存储对象和符号

2、集合中的元素是唯一的，相同元素会被剔除

3、无法保持原有的插入顺序，无法被遍历

```js
const set = new WeakSet()
const obj = { a: 1 }
const symbol = Symbol('WeakSet')

// 插入元素
set.add(obj)
set.add(symbol)

// 判断元素是否存在，返回布尔值
set.has(obj)

// 删除元素，返回布尔值
set.delete(obj)
```

::: tip

集合中对象的引用为弱引用，未被其它对象引用将会被GC

:::

## Map

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map

1、允许存储任何值为键或值

2、能够保持原始的插入顺序

```js
const map = new Map()
const obj = { obj: 1 }
const symbol = Symbol('map')

// 插入元素
map.set('a', 1)
map.set(obj, 2)
map.set(symbol, 3)

// 键值对数量
map.size

// 删除指定键值对，返回布尔值
map.delete('a')

// 判断是否存在某个键，返回布尔值
map.has(symbol)

// 获取指定键所对应的值，不存在返回 undefined
map.get(symbol)

// 新迭代对象，按插入顺序访问， 每个元素是元组形式：[key, value]
map.entries().forEach(item => console.log(item))

// 新迭代对象，按插入顺序访问， 包含所有元素的键
map.keys().forEach(item => console.log(item))

// 新迭代对象，按插入顺序访问， 包含所有元素的值
map.values().forEach(item => console.log(item))

// 删除所有元素
map.clear() 
```



## WekMap

1、只允许你存储对象和符号

2、无法保持原有的插入顺序，无法被遍历

```js
const map = new WeakMap()
const obj = { a: 1 }
const symbol = Symbol('WeakSet')

// 插入元素
map.set(obj, 1)
map.set(symbol, 2)

// 删除指定键值对，返回布尔值
map.delete('a')

// 判断是否存在某个键，返回布尔值
map.has(symbol)

// 获取指定键所对应的值，不存在返回 undefined
map.get(symbol)
```



::: tip

Map中对象的引用为弱引用，未被其它对象引用将会被GC

:::
