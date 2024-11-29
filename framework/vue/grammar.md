# 语法入门

## 属性绑定

```vue
<template>
  <!-- 文本插值 -->
  <div>{{ msg }}</div>
  <!-- JS表达式 -->
  <div>{{ disabled ? 'YES' : 'NO' }}</div>
  <!-- 原始HTML -->
  <div v-html="rawHTML"></div>
  <!-- 单个属性绑定 -->
  <div :id="bind.id"></div>
  <div v-bind:id="bind.id"></div>
  <!-- 多个属性绑定 -->
  <div v-bind:data="bind"></div>
  <!-- 布尔类型属性, true时可省略 -->
  <div disabled></div>
  <div :disabled="disabled"></div>
  <!-- 动态属性 -->
  <div :[attrName]="attrValue"></div>
  <!-- 同名简写，仅支持3.4版本及以上 -->
  <div :msg></div>
</template>

<script setup lang="ts">
const bind = { id: '1' }
const disabled = false
const msg = 'Hello World'
const attrName = 'data'
const attrValue = '1'
const rawHTML = '<span style="color: red">This should be red.</span>'
</script>
```



## 样式绑定

```vue
<template>
  <!-- 动态class -->
  <div :class="{ active: isActive }"></div>
  <!-- 动静class -->
  <div class="static" :class="{ active: isActive }"></div>
  <!-- 表达式class -->
  <div :class="isActive ? activeClass : errorClass"></div>
  <!-- 数组class -->
  <div :class="[activeClass, errorClass]"></div>
  <div :class="[isActive ? activeClass : '', errorClass]"></div>
  <!-- 对象class -->
  <div :class="objectClass"></div>
  <div :class="{ active: isActive, danger: false }"></div>
  <!-- 嵌套class -->
  <div :class="[{ active: isActive }, errorClass]"></div>

  <!-- 动态style -->
  <div :style="{ color: isActive ? 'red' : 'blue' }"></div>
  <!-- 数组style -->
  <div :style="[baseStyles, overridingStyles]"></div>
  <!-- 对象style -->
  <div :style="baseStyles"></div>
  <div :style="{ color: 'red', fontSize: '13px' }"></div>
  <!-- 多值style -->
  <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
</template>

<script setup lang="ts">
const isActive = ref(false)
const activeClass = ref('active')
const errorClass = ref('danger')
const objectClass = ref({ active: true, danger: false })

const baseStyles = ref({ color: 'red', fontSize: '13px' })
const overridingStyles = ref({ fontSize: '14px' })
</script>
```



## 元素渲染

```vue
<template>
  <!-- 条件渲染 -->
  <div v-if="awesome"></div>
  <!-- v-else 必须直接跟着v-if | v-else-if -->
  <div v-else></div>

  <!-- v-show -->
  <div v-show="awesome"></div>

  <!-- 多元素条件渲染，使用template包装 -->
  <template v-if="awesome">
    <h1>H!</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
  </template>

  <!-- 列表渲染 -->
  <div v-for="v, index in items" :key="v.id">
    {{ index }}-{{ v.name }}
  </div>

  <div v-for="v, index of items" :key="v.id">
    {{ index }}-{{ v.name }}
  </div>

  <!-- v-if、v-for同时使用 -->
  <template v-for="v, index in items" :key="v.id">
    <div v-if="v.id === 1">
      {{ index }}-{{ v.name }}
    </div>
  </template>
</template>

<script setup lang="ts">
const awesome = ref(true)
const items = ref([
  { id: 1, name: 'a' },
  { id: 2, name: 'b' }
])
</script>
```

::: tip v-if  vs  v-show

`v-if` 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建。

`v-if` 也是**惰性**的：如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染。

相比之下，`v-show` 简单许多，元素无论初始条件如何，始终会被渲染，只有 CSS `display` 属性会被切换。

总的来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 `v-show` 较好；如果在运行时绑定条件很少改变，则 `v-if` 会更合适。

:::

::: tip v-if  vs  v-for

当它们同时存在于一个节点上时，`v-if` 比 `v-for` 的优先级更高。这意味着 `v-if` 的条件将无法访问到 `v-for` 作用域内定义的变量别名，需要配合`<template>`使用

:::



## 事件处理

```vue
<template>
  <p>{{ count }}</p>
  <!-- 普通写法 -->
  <div v-on:click="onAdd">ADD</div>

  <!-- 语法糖 -->
  <div @click="onAdd">ADD</div>

  <!-- 内联 -->
  <div @click="count++">ADD</div>

  <!-- 参数 -->
  <div @click="onAddArg(10)">ADD</div>

  <!-- 修饰符，可链式 -->
  <div @click.prevent.stop="onAdd">ADD</div>
</template>

<script setup lang="ts">
const count = ref(0)
const onAdd = () => count.value++
const onAddArg = (num: number = 1) => count.value += num
</script>
```

