## 防抖

```js
 const debounce = (fn, delay) => {
   let timer = null
   return (...args) => {
     const context = this
     if (timer) clearTimeout(timer)

     timer = setTimeout(() => {
       fn.apply(context, args)
     }, delay)
   }
 }
```



## 节流

```js
const throttle = (fn, delay) => {
  let timer = null
  return (...args) => {
    const context = this
    if (timer) return

    timer = setTimeout(() => {
      fn.apply(context, args)
      timer = null
    }, delay)
  }
}
```



## 去重

```js
function unique1(arr) {
  return [...new Set(arr)]
}

function unique2(arr) {
  const obj = {}
  return arr.filter(item => {
    const flag = !obj[item] ? true : false
    if (flag) obj[item] = true
    return flag
  })
}

function unique3(arr) {
  const result = []
  arr.forEach(item => {
    if (result.indexOf(item) == -1) {
      result.push(item)
    }
  })
  return result
}
```



## 拷贝

```js
function deepClone(obj, result) {
  const result = result || {}

  for (let prop in obj) {
    // 判断是否为自身属性
    if (obj.hasOwnProperty(prop)) {
      if (typeof obj[prop] == 'object' && obj[prop] !== null) {
        // 引用值：Array、Object
        const isObject = Object.prototype.toString.call(obj[prop]) == '[object Object]'
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



## 树形

数据类型

```ts
type TreeNode = {
  id: number
  name: string
  children: TreeNode[]
}
```

::: details 测试数据

```ts
[
  {
    id: 1,
    name: 'Node 1',
    children: [
      {
        id: 2,
        name: 'Node 1.1',
        children: [
          {
            id: 3,
            name: 'Node 1.1.1',
            children: []
          },
          {
            id: 4,
            name: 'Node 1.1.2',
            children: []
          }
        ]
      },
      {
        id: 5,
        name: 'Node 1.2',
        children: [
          {
            id: 6,
            name: 'Node 1.2.1',
            children: []
          },
          {
            id: 7,
            name: 'Node 1.2.2',
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 8,
    name: 'Node 2',
    children: [
      {
        id: 9,
        name: 'Node 2.1',
        children: [
          {
            id: 10,
            name: 'Node 2.1.1',
            children: []
          },
          {
            id: 11,
            name: 'Node 2.1.2',
            children: []
          }
        ]
      },
      {
        id: 12,
        name: 'Node 2.2',
        children: [
          {
            id: 13,
            name: 'Node 2.2.1',
            children: []
          },
          {
            id: 14,
            name: 'Node 2.2.2',
            children: []
          }
        ]
      }
    ]
  }
]
```

:::

寻找指定元素

```tsx
function findNodeById(tree: TreeNode[], id: number) {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].id === id) return tree[i]
    if (tree[i].children.length > 0) {
      const result = findNodeById(tree[i].children, id)
      if (result) return result
    }

  }

  return null
}
```

寻找指定元素的父节点

```ts
function findParentNodeById(tree: TreeNode[], id: number) {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].children.length > 0) {
      for (let j = 0; j < tree[i].children.length; j++) {
        if (tree[i].children[j].id === id) return tree[i]
        const result = findParentNodeById(tree[i].children[j].children, id)
        if (result) return result
      }
    }
  }

  return null
}
```

寻找指定元素的下一个兄弟节点

```ts
function findNextSiblingNodeById(tree: TreeNode[], id: number) {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].children.length > 0) {
      for (let j = 0; j < tree[i].children.length; j++) {
        if (tree[i].children[j].id === id) return tree[i].children[j + 1] || null
        const result = findNextSiblingNodeById(tree[i].children[j].children, id)
        if (result) return result
      }
    }
  }

  return null
}
```

