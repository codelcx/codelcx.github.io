# 组件通信

不同组件之间可共享数据和方法，要有以下几种方式：

1. **props**：父组件可以通过props向子组件传递数据，子组件可通过props接收父组件传递的数据
2. **自定义事件**：子组件通过`emit`方法触发，父组件通过监听这些事件接收子组件传递的数据
3. **事件总线**：在Vue 2.x中，可使用一个空的Vue实例作为事件总线，实现任意组件之间的通信。在Vue 3.x中，可以使用`mitt`库来实现类似的功能
4. **依赖注入**：祖先组件通过`provide`提供数据，后代组件通过`inject`注入数据
5. **状态管理**：可以使用Vuex、Pinia...作为状态管理库，实现全局状态的管理和组件之间的通信
6. **组件实例**：子组件可通过 `getCurrentInstance().parent`获取父组件实例；父组件可以通过`ref`属性，访问子组件实例；从而调用组件实例的方法和数据



## 父子组件通信

1、props & emit

```vue
<template>
  <children :data="data" @transmit="onReceive" />
  <div>子组件传递的数据：{{ childrenData }}</div>
</template>

<script setup lang="ts">
import children from './children.vue'

const data = ref('parent data')
const childrenData = ref('')
const onReceive = (val: string) => childrenData.value = val
</script>
```

```vue
<template>
  <!-- Props属性名和组件定义的属性名相同时，显示组件属性值 -->
  <!-- 不存在同名属性时，会自动解析 -->
  <div>子组件数据：{{ data }}</div>
  <div>父组件传递的数据：{{ props.data }}</div>
  <button @click="onTransmit">向父组件传递数据</button>
</template>

<script setup lang="ts">
type Props = {
  data: string
}

type Emits = {
  (e: 'transmit', value: string): void
}

const data = ref('children data')
const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const onTransmit = () => emits('transmit', data.value)
</script>
```

2、依赖注入

```vue
<template>
  <h1>Parent</h1>
  <span>父组件数据：{{ data }}</span>
  <Son />
</template>

<script setup lang="ts">
import Son from './son.vue'

const data = ref('parent data')
const update = (val: string) => data.value = val

provide('data', data)
provide('update', update)
</script>
```

```vue
<template>
  <h1>Son</h1>
  <div>父组件数据：{{ data }}</div>
  <button @click="update('son update parent data')">修改父组件数据</button>
  <GrandSon />
</template>

<script setup lang="ts">
import GrandSon from './grandson.vue'
const data = inject('data')
const update = inject('update')
</script>
```

```vue
<template>
  <h1>GrandSon</h1>
  <div>祖先组件数据：{{ data }}</div>
  <button @click="update('grandson update parent data')">
    修改祖先组件数据
  </button>
</template>

<script setup lang="ts">
const data = inject('data')
const update = inject('update')
</script>
```



3、组件实例(不推荐)

```vue
<template>
  <children ref="childrenRef" />
  <div>子组件传递的数据：{{ getData() }}</div>
  <button @click="update">修改子组件数据</button>
</template>

<script setup lang="ts">
import children from './children.vue'
type childrenRef = InstanceType<typeof children>

const childrenRef = ref<childrenRef>()
const parentData = ref('parent data')

const update = () => childrenRef.value?.updateData()
const getData = () => childrenRef.value?.childrenData
const updateData = () => parentData.value = 'update parent data'

defineExpose({ parentData, updateData })
</script>
```

```vue
<template>
  <div>父组件传递的数据：{{ getData() }}</div>
  <button @click="update">修改父组件数据</button>
</template>

<script setup lang="ts">
const childrenData = ref('children data')
const instance = getCurrentInstance()
const parentInstance = instance?.parent

const update = () => parentInstance?.exposed?.updateData()
const getData = () => parentInstance?.exposed?.parentData
const updateData = () => childrenData.value = 'update children data'

defineExpose({ childrenData, updateData })
</script>
```





## 兄弟组件通信

1、mitt

```ts
import mitt from 'mitt'

type EventName = 'send' | 'receive' | 'update'
type EventType = Record<EventName, any>

const emitter = mitt<EventType>()

export default emitter
```

```vue
<template>
  <h1>Index</h1>
  <Home />
  <About />
</template>

<script setup lang="ts">
import Home from './home.vue'
import About from './about.vue'
</script>
```

```vue
<template>
  <h1>Home数据：{{ data }}</h1>
  <button @click="onSend">发送数据</button>
  <GrandSon />
</template>

<script setup lang="ts">
import emitter from '@/utils/mitt'

const data = ref('home data')
const onSend = () => emitter.emit('send', data.value)
emitter.on('update', (val) => data.value = val)
</script>
```

```vue
<template>
  <h1>About</h1>
  <div>接收Home数据：{{ data }}</div>
  <button @click="update('update home data')">修改Home数据</button>
</template>

<script setup lang="ts">
import emitter from '@/utils/mitt'

const data = ref('')
emitter.on('send', (val) => data.value = val)
const update = (val: string) => emitter.emit('update', val)
</script>
```

2、状态管理

```ts
export const data = ref('raw data')
export const update = (val: string) => data.value = val
```

```vue
<template>
  <h1>Index</h1>
  <Home />
  <About />
</template>

<script setup lang="ts">
import Home from './home.vue'
import About from './about.vue'
</script>
```

```vue
<template>
  <h1>Home:{{ data }}</h1>
  <button @click="update('home data')">修改数据</button>
</template>

<script setup lang="ts">
import { data, update } from './data'
</script>
```

```vue
<template>
  <h1>About:{{ data }}</h1>
  <button @click="update('about data')">修改数据</button>
</template>

<script setup lang="ts">
import { data, update } from './data'
</script>
```

