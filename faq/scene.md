# 面试题（场景）

## 如何排查白屏问题

可能原因

```
1、网络问题：服务器响应时间过长或请求超时
2、代码错误：js、css文件中语法错误或引用错误
3、资源加载失败：图片、字体、外部脚本等资源加载失败
4、环境配置错误：构建工具某些属性设置错误
5、兼容问题：浏览器不支持某些新特性或API
6、缓存问题：旧的缓存导致页面无法 加载
```

排查过程

```
1、查看控制台：检查是否存在报错信息
2、查看网络请求：检查是否存在404、500错误
3、查看DOM结构：检查HTML结构是否错误
4、查看资源加载情况：检查所有静态资源是否能够正确加载
5、调试代码：通过断点、日志排查JS中的错误代码
6、清理缓存：清空缓存或使用无痕模式访问页面排除缓存问题 
```

解决方案

```
1、代码分割，使用动态导入，按需加载
2、压缩图片和资源，使用懒加载、预加载技术
3、服务端渲染，提前生成HTML，减少客户端渲染时间
4、静态资源部署到CDN，减少服务器负载
5、利用浏览器缓存（强缓存）和HTTP缓存（弱缓存）
```



## 如何深度SEO优化

```
1、结构优化：
语义化标签（nav、header、article、section、aside、footer）
标题（title）、关键字|描述（<meata name="keywords|description" content=""> 

2、内容优化：保证页面中关键字的覆盖率

3、技术优化：站点地图、结构化数据<script type="application/ld+json">{}</script> 
```



## 如何解决移动端适配

解决方案

```
1、根据不同端开发不同页面
2、根据不同端加载不同CSS文件
3、根据响应式，运行不同样式规则（常用）
```

相关技术

```js
// 视窗设置，配置元信息
<meta name="viewport" content="width=device-width" inital-scal="1.0">
```

```js
// 媒体查询
@media (min-width: 750px) and (max-width: 1024px) {}

// 预处理器scss
$pc: 1024px;
$app: 750px;
@media (min-width: $pc) {}
@media (min-width: $app) {}
```

```js
// rem、em
html { font-size: 16px }
header { font-size: 1rem }
header title { font-size: 0.8em }
```

```js
// 弹性布局 flex (主轴、侧轴、对齐方式) 
```



## 如何修改第三方库

```
1、直接修改node_modules
2、patch-package（第三方包）
3、fork-package->修改源码->发布npm
```



## 如何降级处理静态资源加载失败

```js
// 图片
1）占位图，alt描述图片
2）重试机制（404、501）

<img src="source.png" alt="example image" onerror="handleImageError(this)">
 
function handleImageError(image) {
    image.onerror = null // 防止死循环
    image.src = "placehholder.png" // 占位图
    image.src = "source.png" // 重试
}
```

```js
class ImageLoader {
    constructor(src, maxRetries = 3, retryDelay = 1000) {
        this.src = src;
        this.maxRetries = maxRetries;
        this.retryDelay = retryDelay;
        this.retries = 0;
        this.img = new Image();
        this.img.onload = this.onLoad.bind(this);
        this.img.onerror = this.onError.bind(this);
    }
 
    load() {
        this.img.src = this.src;
    }
 
    onLoad() {
        console.log('Image loaded successfully!');
        // 这里可以添加图片加载成功的处理逻辑，比如更新DOM等
    }
 
    onError() {
        this.retries++;
        if (this.retries <= this.maxRetries) {
            console.log(`Failed to load image. Retrying... 
            (${this.retries}/${this.maxRetries})`);
            setTimeout(() => {
                this.load(); // 重新尝试加载图片
            }, this.retryDelay);
        } else {
            console.log('Failed to load image after multiple retries.');
            // 这里可以添加图片加载失败的处理逻辑，比如显示错误信息等
        }
    }
}
 
// 使用示例
const imageLoader = new ImageLoader('path/to/your/image.jpg');
imageLoader.load(); // 开始加载图片，并处理重试逻辑
```

```js
// css
1）关键样式，通过内联方式
2）使用备用样式

<link rel="stylesheet" href="styles.css" onError="loadCSSError">
    
function loadCSSError() {
    const fallbackCSS = document.createElement('link')
    fallbackCSS.rel = 'fallback-style.css'
    document.head.appendChild(fallbackCSS)
}
```

```js
// js
1）关键脚本，通过内联方式
2）使用备用脚本

<script src="main.js" onError="loadJSError">
    
function loadJSError() {
    const fallbackJS = document.createElement('script')
    fallbackJS.src = 'fallback-main.js'
    document.head.appendChild(fallbackJS)
}
```



## 如何理解函数式编程

1）函数是一等公民，通过函数封装的方式解决问题

```
对于实际问题，将其拆分为多个小问题并以函数方式实现，最终以函数组合的方式解决整个问题
通过函数的组合，可以实现函数的复用
```

2）纯函数：相同输入得到相同输出，不改变和依赖外部状态，无任何副作用

3）高阶函数：对函数加工，函数可作为参数传递给其他函数，也可以作为函数的返回值

4）不可变性：函数不能改变传入的参数和外部变量，只能通过返回新的值达到更新状态的目的



## 如何对页面布局做兼容性处理

```
1、CSS前缀：不同的浏览器可能需要特定的 CSS 属性前缀才能正确渲染
例如，-webkit-、-moz-、-ms- 和 -o-。可以使用工具如 Autoprefixer 自动添加这些前缀。

2、CSS重置：不同的浏览器默认的样式可能会有所不同
重置可以减少这些差异，使页面样式在不同浏览器中更加一致。

3、使用相对单位：如 em、rem、% 等

4、媒体查询：使用 CSS 媒体查询可以根据不同的屏幕尺寸和分辨率应用不同的样式规则。

5、响应式设计：使用响应式设计可以创建一个能够适应不同屏幕尺寸和分辨率的布局

6、JavaScript 和 Polyfills：无法通过 CSS 解决的兼容性问题
例如，一些旧浏览器不支持某些 CSS 属性，可以使用 JavaScript 模拟这些属性的效果
```



## 如何跨页面通信

