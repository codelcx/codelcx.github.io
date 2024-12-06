# 认识组件

在Vue.js中，组件（Component）是构建用户界面的基本单位。Vue.js允许开发者通过定义组件来封装可重用的代码片段，这些代码片段可以包含自己的模板、逻辑和样式。

Vue组件的主要特点包括：

1. **可复用性**：组件可以在同一个Vue应用中多次使用，也可以在不同的应用中复用
2. **独立性**：每个组件都有自己的状态、行为和样式，它们独立于其他组件
3. **易于维护**：通过将界面拆分成多个组件，可以更方便地管理和维护代码
4. **模块化**：组件是模块化的，可以组合成更复杂的界面，同时保持每个组件的独立性

::: info SFC

SFC是Single File Component的缩写，译为单文件组件。在Vue.js中，SFC是一种特殊的文件格式，用于定义Vue组件。它将模板、脚本和样式封装在一个文件中，使得组件的代码更加清晰和易于管理

:::



## 生命周期

每个 Vue 组件实例在创建时都需要经历一系列的初始化步骤，比如设置好数据侦听，编译模板，挂载实例到 DOM，以及在数据改变时更新 DOM。在此过程中，它也会运行被称为生命周期钩子的函数，让开发者有机会在特定阶段运行自己的代码

![lifecycle_zh-CN.W0MNXI0C](assets/lifecycle_zh-CN.W0MNXI0C.png)



## 执行顺序

挂载阶段

```
父beforeCreate------>父created------>父beforeMount------>
子beforeCreate------>子created------>子beforeMount------>
子Mounted------>父Mounted
```



**更新阶段**

```
父beforeUpdate------>子beforeUpdate------>子updated------>父updated
```



**销毁阶段**

```
父beforeDestroy------>子beforeDestroy------->子destroyed------>父destroyed
```





