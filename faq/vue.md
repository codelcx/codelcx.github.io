# 面试题（Vue）



## 生命周期

setup（vue3）

```
初始化逻辑，如定义响应式数据、计算属性、方法...
```

beforeCreate

```
实例初始化之后，数据观测、事件、侦听器配置之前被调用
```

created

```
实例创建完成后被立即调用，已经完成数据观测、事件、监听器配置
可以访问组件实例及组件中的数据源和函数等，但无法访问DOM
常用于异步请求和事件监听器的注册
```

beforeMount

```
挂载之前，首次执行 render 相关函数
```

mounted

```
实例已挂载，视图已渲染，可访问DOM以及计算后的样式
```

beforeUpdate

```
数据更新时调用，发生在虚拟DOM打补丁前，此时访问的是更新前的DOM
```

updated

```
数据已完成更新，视图已更新，此时访问的是最新的DOM
```

beforeUnmount（vue3）、beforeDestory（vue2）

```
实例销毁前，可执行清理工作，如移除监听器、定时器...
```

unmounted（vue3）、Destory（vue2）

```
实例及其子实例已全部销毁，所有资源都将被清除
```



## 模板编译流程

```html
<template>
  <div> vue template</div>
  <div v-model="name" :name="name" @click="onClick">{{msg}}</div>
</template>
```

1、解析阶段（模板字符串 -> 模板AST）

```
1、遍历模板字符串，识别其中HTML标签、属性、指令、插值表达式、组件
2、识别组件：判断标签名是否属于HTML中的标签名，不是的话将其标记为组件
3、识别指令：语法糖此时会被转换为对应的指令名（如 : -> bind, @ -> on)
```

::: details  Template AST

```json
{
  "type": 0, // ROOT 类型
  "children": [
    {
      "type": 1, // ELEMENT 类型
      "tag": "div",
      "children": [
        { "type": 2, "content": " vue template" } // TEXT 类型
      ],
      "isSelfClosing": false
    },
    {
      "type": 1,
      "tag": "div",
      "props": [
        // v-model 转换为 modelValue 和 onUpdate:modelValue
        { 
          "type": 7, // DIRECTIVE 类型
          "name": "model",
          "exp": { "content": "name", "isStatic": false }
        },
        // :name 动态属性
        { 
          "type": 6, // ATTRIBUTE 类型
          "name": "name",
          "value": { "content": "name", "isStatic": false }
        },
        // @click 事件
        { 
          "type": 7, 
          "name": "on", 
          "modifiers": ["click"],
          "exp": { "content": "onClick", "isStatic": false }
        }
      ],
      "children": [
        { 
          "type": 5, // INTERPOLATION 类型（{{ msg }}）
          "content": { "content": "msg", "isStatic": false }
        }
      ]
    }
  ]
}
```

:::

2、转换阶段（模板AST -> JS AST）

```
指令是Vue内部定义的，无法直接使用，需要进一步转换，形成通用的 AST
1、标记静态节点（hoisted: true） 
2、标记动态节点 （dynamic: true）
3、标记动态文本（patchFlag：1、9）
4、指令转换（v-model -> modelValue 、 onUpdate:modelValue)
```

::: details JS AST

```json
{
  "type": 0,
  "children": [
    {
      "type": 1,
      "tag": "div",
      "children": [
        { "type": 2, "content": " vue template" }
      ],
      "codegenNode": {
        "type": 13, // VNODE_CALL 类型
        "tag": "'div'",
        "children": [{ "type": 2, "content": " vue template" }],
        "isStatic": true, // 标记为静态
        "hoisted": true    // 静态提升
      }
    },
    {
      "type": 1,
      "tag": "div",
      "props": [
        // v-model 转换后的属性
        { "key": "modelValue", "value": { "content": "name" } },
        { "key": "onUpdate:modelValue", "value": "$event => (name = $event)" },
        // :name 动态属性
        { "key": "name", "value": { "content": "name" }, "dynamic": true },
        // @click 事件
        { "key": "onClick", "value": "onClick" }
      ],
      "children": [
        { 
          "type": 5,
          "content": { "content": "msg" },
          "codegenNode": {
            "type": 8, // COMPOUND_EXPRESSION 类型
            "children": ["_toDisplayString(msg)"],
            "patchFlag": "1 /* TEXT */" // 标记动态文本
          }
        }
      ],
      "codegenNode": {
        "type": 13,
        "tag": "'div'",
        "props": {
          "type": 4, // JS_OBJECT_EXPRESSION 类型
          "properties": [
            { "key": "modelValue", "value": "name" },
            { "key": "onUpdate:modelValue", "value": "$event => (name = $event)" },
            { "key": "name", "value": "name", "dynamic": true },
            { "key": "onClick", "value": "onClick" }
          ]
        },
        "children": [
          { 
            "type": 8, 
            "children": ["_toDisplayString(msg)"],
            "patchFlag": "1 /* TEXT */"
          }
        ],
        "patchFlag": "9 /* PROPS, TEXT */", // 组合标记
        "dynamicProps": ["name"],          // 动态属性列表
        "isBlock": true                     // 标记为 Block 节点
      }
    }
  ]
}
```

:::

3、代码生成（JS AST -> Render） 

```js
import { 
    createElementVNode as _createElementVNode, 
    toDisplayString as _toDisplayString } from "vue";

const _hoisted_1 = _createElementVNode("div", null, " vue template"); 

export function render(_ctx, _cache) {
  return _createElementVNode("template", null, [
    _hoisted_1,
    _createElementVNode("div", {
      modelValue: _ctx.name,
      "onUpdate:modelValue": $event => (_ctx.name = $event),
      name: _ctx.name,
      onClick: _ctx.onClick
    }, _toDisplayString(_ctx.msg), 1 /* TEXT */)
  ]);
}
```





## 数据双向绑定原理

背景

```
数据发生变化时视图随着改变
```

架构

```
MVVM：M（数据模型层）、V（视图层）、VM（视图模型层）
```

绑定流程

```
1、初始化实例，对数据实现响应式处理
2、编译模板，关联动态数据与渲染函数
3、Dep管理数据和订阅者的关系，更新时通知相关订阅者
```



## keep-alive 的原理

背景

```
缓存组件实例和状态，从而实现组件状态的保留及避免重新创建再渲染
```

场景

```
1、路由器切换：如从列表页进入详情页
2、标签页切换：标签页数据大，重新渲染耗时
3、数据持久化：如表单填写，切换后仍能够保持状态
```

语法

```
activated: 组件激活	
deactivated：组件切换
```

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
})

onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
})
</script>
```

```
max：最大缓存数量
include: 指定缓存的组件 
exclude：指定不缓存的组件 
```

```vue
<!-- 必须有且只能包含一个组件 -->

<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>

<!-- 通过路径区分缓存 -->
<keep-alive>
  <router-view :key="$route.fullPath"/> 
</keep-alive>
```

组件源码（vue2）

```ts
// Vue 2.7.x 源码简化版
export default {
  name: 'keep-alive',
  abstract: true, // 标记为抽象组件（不会出现在父子关系链中）

  props: {
    include: [String, RegExp, Array], // 允许缓存的组件白名单
    exclude: [String, RegExp, Array], // 不允许缓存的组件黑名单
    max: [String, Number] // 最大缓存数量（LRU 策略）
  },

  created() {
    this.cache = Object.create(null) // 缓存对象 { key: VNode }
    this.keys = [] // 缓存键数组（用于LRU淘汰）
  },

  destroyed() {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  render() {
    // 获取默认插槽中的第一个子节点（VNode）
    const slot = this.$slots.default
    const vnode: VNode = getFirstComponentChild(slot)

    const componentOptions: ?VNodeComponentOptions 
        = vnode && vnode.componentOptions
    if (componentOptions) {
      // 获取组件名称（优先使用组件自身的 name 选项）
      const name: ?string = getComponentName(componentOptions)

      const { include, exclude } = this
      // 检查是否需要缓存（include/exclude 规则）
      if (
        (include && (!name || !matches(include, name))) ||
        (exclude && name && matches(exclude, name))
      ) {
        return vnode // 不满足条件直接返回原始 VNode
      }

      const { cache, keys } = this
      // 生成缓存键（核心逻辑）
      const key: ?string = vnode.key == null
        ? componentOptions.Ctor.cid + (componentOptions.tag 
                                       ? `::${componentOptions.tag}` : '')
        : vnode.key

      // 命中缓存时的处理
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance // 复用实例
        remove(keys, key) // 更新 LRU 位置
        keys.push(key)
      } else {
        cache[key] = vnode // 首次缓存
        keys.push(key)
        // 超出最大数量时淘汰最久未使用的
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys)
        }
      }

      vnode.data.keepAlive = true // 标记为被 keep-alive 缓存
    }
    return vnode || (slot && slot[0])
  }
}
```

组件源码（vue3）

```ts
// packages/runtime-core/src/components/KeepAlive.ts
export const KeepAliveImpl: ComponentOptions = {
  name: `KeepAlive`,
  __isKeepAlive: true, // 标记为 KeepAlive 组件

  props: {
    include: [String, RegExp, Array], // 缓存白名单
    exclude: [String, RegExp, Array], // 缓存黑名单
    max: [Number, String] // 最大缓存数量
  },

  setup(props: KeepAliveProps, { slots }: SetupContext) {
    const instance = getCurrentInstance()! // 当前组件实例
    const sharedContext = instance.ctx as KeepAliveContext

    // 缓存容器改用 Map 结构（Vue 3 优化）
    const cache: Cache = new Map()
    const keys: Keys = new Set() // 使用 Set 管理键（替代 Vue2 的数组）

    // 当前激活的组件键（用于 LRU 更新）
    let pendingCacheKey: CacheKey | null = null

    // 缓存父组件的子树（避免卸载时丢失）
    const parentSuspense = instance.suspense

    // 生成缓存键的逻辑
    const getCacheKey = (vnode: VNode): CacheKey => {
      return vnode.key == null
        ? vnode.type // 直接使用组件类型（替代 Vue2 的 cid + tag）
        : vnode.key
    }

    // 检查是否匹配 include/exclude
    const shouldCache = (vnode: VNode): boolean => {
      const name = getComponentName(vnode.type)
      return (
        (name &&
          ((props.include && !matches(props.include, name)) ||
          (props.exclude && matches(props.exclude, name)))
      )
    }

    // 挂载/激活时的处理
    sharedContext.activate = (vnode, container, anchor) => {
      const instance = vnode.component!
      move(vnode, container, anchor) // 移动 DOM 节点
      patch(instance, vnode, container, anchor) // 触发激活钩子
    }

    // 卸载/停用时的处理
    sharedContext.deactivate = (vnode: VNode) => {
      move(vnode, parentSuspense!.hiddenContainer) // 移入隐藏容器
    }

    return () => {
      // 获取默认插槽内容
      const children = slots.default?.()
      const rawVNode = children && children[0]

      if (!rawVNode || !isVNode(rawVNode)) {
        return rawVNode
      }

      const vnode = getInnerChild(rawVNode) // 获取真实 VNode
      const comp = vnode.type as Component
      const name = getComponentName(comp)

      // 检查是否需要缓存
      if (name && (
        (props.include && !matches(props.include, name)) ||
        (props.exclude && matches(props.exclude, name))
      )) {
        return vnode // 直接返回不缓存
      }

      const key = getCacheKey(vnode)
      const cachedVNode = cache.get(key)

      if (vnode.el) {
        // 已挂载的 VNode，克隆以防复用
        vnode = cloneVNode(vnode)
      }

      pendingCacheKey = key

      if (cachedVNode) {
        // 命中缓存：复用组件实例
        vnode.component = cachedVNode.component
        vnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE
        keys.delete(key) // 更新 LRU 顺序
      } else {
        keys.add(key) // 新增缓存
        // 检查最大数量限制
        if (props.max && keys.size > parseInt(props.max as string, 10)) {
          pruneCacheEntry(cache, keys.values().next().value)
        }
      }

      vnode.shapeFlag |= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE
      return vnode
    }
  }
}
```

