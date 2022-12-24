import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,e}from"./app.f6447a9f.js";const p={},t=e(`<h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2><p>webpack是模块化打包工具，能够处理模块之间的依赖，并将其打包为合适的格式以供浏览器使用</p><p>grunt/gulp以task为核心，即要处理的事务（ES6、ts转化、图片压缩..）,能够优化前端的开发流程</p><p>webpack依赖于node环境,需要安装好node</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//版本查看</span>
node -v
npm -v
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//全局安装webpack</span>
npm install webpack -g 
npm install webpack@【具体版本】
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//局部安装webpack，进入相应的文件</span>
npm install webpack@<span class="token number">3.6</span>.<span class="token number">0</span> --save--dev 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//配置环境变量</span>
系统变量-》NODE_PATH  D<span class="token operator">:</span>\\Program Files\\nodejs\\node_modules
用户变量-》C<span class="token operator">:</span>\\Users\\Admin\\AppData\\Roaming\\npm 更改为 D<span class="token operator">:</span>\\Program Files\\nodejs\\node_modules
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>node配置文件</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>npm init    <span class="token comment">//生成package.json 存放与node的相关版本范围的信息</span>
npm install <span class="token comment">//安装package.json中的依赖，生成package-lock.json存放与node相关具体版本的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="出入口" tabindex="-1"><a class="header-anchor" href="#出入口" aria-hidden="true">#</a> 出入口</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//没配置之前对模块的依赖进行打包: webpack 入口文件(./src/main.js) 出口文件(./dist/bundle.js)</span>

<span class="token comment">//配置后：npm run build</span>

<span class="token comment">//package.json</span>
  <span class="token string-property property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token string">&quot;echo \\&quot;Error: no test specified\\&quot; &amp;&amp; exit 1&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;webpack&quot;</span>
    <span class="token comment">//配置脚本文件后，会优先在局部中寻找webpck，不存在则使用全局webpack</span>
  <span class="token punctuation">}</span>

<span class="token comment">//webpack.config.json</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span> <span class="token comment">//node中处理路径的模块path</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&#39;./src/main.js&#39;</span><span class="token punctuation">,</span><span class="token comment">//入口文件只有这一个，所以需要在该文件中添加各种依赖，如js、css等模块</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">//path必须是绝对路径</span>
    <span class="token comment">//path.resolve动态获取当前路径,并可以拼接字符串</span>
    <span class="token comment">//__dirname全局变量</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;bundle.js&#39;</span><span class="token punctuation">,</span><span class="token comment">//打包后的文件名</span>
    <span class="token literal-property property">publicPath</span><span class="token operator">:</span><span class="token string">&#39;dist/&#39;</span>   <span class="token comment">//自定义输出路径,生成的所有url都会在之前添加&#39;dist/&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">}</span>  <span class="token comment">//配置loader</span>
  resolve：<span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">//配置vue</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span>  <span class="token comment">//插件</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">//搭建本地服务器</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="loader" tabindex="-1"><a class="header-anchor" href="#loader" aria-hidden="true">#</a> loader</h2><p>webpack主要是用于处理js代码，但是实际中除了js代码，还有诸如加载css、图片、ES6转换ES5，TypeScript转换成ES5..</p><p>对于webpack本身并不支持这些额外的功能，此时需要扩展webpack，即安装对应的loader使其支持对应的功能</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">//1.处理css</span>
    <span class="token punctuation">{</span>
      <span class="token comment">//匹配所有.css文件</span>
      <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> 
        
      <span class="token comment">//css-loader只负责加载css文件</span>
      <span class="token comment">//style-loader负责将样式添加到DOM中</span>
      <span class="token comment">//使用多个loader时,从右向左起效</span>
      <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;style-loader&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">]</span>

      <span class="token comment">// UnhandledPromiseRejectionWarning: TypeError: this.getResolve is not a function</span>
      <span class="token comment">//版本过高时产生的错误</span>
      <span class="token comment">//可以手动将package.json文件下的style-loader与css-loader的版本降低</span>
      <span class="token comment">//执行命令 npm install 重新安装项目依赖</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
      
    <span class="token comment">// 2.处理图片</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(png|jpg|gif)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;url-loader&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token comment">//限制图片大小8k;假如图片小于该限制,则以base64编码;大于则需要使用file-loader</span>
            <span class="token comment">//file-loader会将通过32位哈希命名好的图片添加到dist文件夹下（默认情况下）</span>
            <span class="token literal-property property">limit</span><span class="token operator">:</span> <span class="token number">8192</span><span class="token punctuation">,</span>
            
            <span class="token comment">//自定义路径名/文件名</span>
            <span class="token comment">//[name]中的name代表变量名(图片原文件名),直接写name会被当成文件夹名，为了易于识别图片内容</span>
            <span class="token comment">//[hash:3]通过哈希随机生成唯一文件名,截取生成哈希字符串的前三位</span>
            <span class="token comment">//.代表字符串连接</span>
            <span class="token comment">//[ext]后缀名</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;img/[name].[hash:3].[ext]&#39;</span><span class="token punctuation">,</span><span class="token comment">//最终会将命名好的图片存放在dist/img下</span>
          
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue" tabindex="-1"><a class="header-anchor" href="#vue" aria-hidden="true">#</a> Vue</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//npm install vue --save 运行时依赖,后续运行也需要</span>
<span class="token comment">//安装位置默认在node_modules文件夹中</span>
<span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">extensions</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&#39;.js&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;.css&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;.vue&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token comment">//后缀简写，导入时不必再写类似App.vue而是简写App</span>
  <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token comment">//别名</span>
    <span class="token comment">//import Vue from &#39;v&#39;导入vue时会优先使用以下的路径寻找</span>
    <span class="token string-property property">&#39;vue$&#39;</span><span class="token operator">:</span><span class="token string">&#39;vue/dist/vue.esm.js&#39;</span>  <span class="token comment">//runtime-complier版本</span>
      						    <span class="token comment">//默认vue.runtime.js,即runtime-only版本</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//未配置时会有报错,此时使用的是runtime-only版本</span>
<span class="token comment">//runtime-only--代码中不可以有任何的template，它无法编译</span>
<span class="token comment">//runtime-complier--代码中可以有template，complier可用于编译template</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//同css一样需要配置loader</span>
<span class="token literal-property property">rules</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
    <span class="token comment">//npm install vue-loader vue-template-compiler --save-dev</span>
    <span class="token comment">//vue-loader 加载vue文件</span>
    <span class="token comment">//vue-template-compiler 编译vue  </span>
      <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.vue$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;vue-loader&#39;</span><span class="token punctuation">]</span>
    <span class="token comment">//vue-loader was used without the corresponding plugin.</span>
    <span class="token comment">//版本&gt;14.0，0会需要插件</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="plugin" tabindex="-1"><a class="header-anchor" href="#plugin" aria-hidden="true">#</a> plugin</h2><ul><li>loader主要用于转换某些类型的模块，它是一个转换器</li><li>plugin是插件，它是对webpack本身的扩展（如打包优化、文件压缩），是扩展器</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;webpack&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> HtmlWebpackPlugin<span class="token operator">=</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;html-webpack-plugin&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> uglifyjsWebpackPlugin<span class="token operator">=</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;uglifyjs-webpack-plugin&#39;</span><span class="token punctuation">)</span>
<span class="token comment">//根据需要安装插件，并将其导入再配置</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">//1.为打包的文件添加版权声明，webpack自带插件BannerPlugin</span>
    <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>BannerPlugin</span><span class="token punctuation">(</span><span class="token string">&#39;最终版权归..所有&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token comment">//2.打包index.html到dist文件中,此时publicPath反而多余需要去掉</span>
    <span class="token comment">//安装插件 npm install html-webpack-plugin --save-dev</span>
    <span class="token comment">// new HtmlWebpackPlugin() 根据模板生成</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">index.html</span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token comment">// 3.对js文件压缩，开发时不需要 发布才用</span>
    <span class="token comment">//npm install uglifyjs-webpack-plugin --save-dev  </span>
    <span class="token keyword">new</span> <span class="token class-name">uglifyjsWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!--index.html--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!--npm run build 将打包的js自动插入
&lt;script type=&quot;text/javascript&quot; src=&quot;bundle.js&quot;&gt;&lt;/script&gt; --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="devserver" tabindex="-1"><a class="header-anchor" href="#devserver" aria-hidden="true">#</a> devServer</h2><p>搭建本地服务器，是基于node搭建，内部使用express框架，可以实现浏览器自动刷新显示修改后的结果</p><p>首先将要生成的文件存放到内存中，用于测试，执行npm run build 后写入磁盘</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//npm install webpack-dev-server@2.9.3 --save-dev 该版本应该与webpack版本契合  </span>
<span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">contentBase</span><span class="token operator">:</span> <span class="token string">&#39;./dist&#39;</span><span class="token punctuation">,</span><span class="token comment">//为哪一个文件夹服务</span>
    <span class="token comment">//port:端口号，不设置会使用默认</span>
    <span class="token literal-property property">inline</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//页面是否实时刷新</span>
    <span class="token comment">//historyApiFallback: spa页面依赖html5的history模式</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//package.json</span>
<span class="token string-property property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token string">&quot;echo \\&quot;Error: no test specified\\&quot; &amp;&amp; exit 1&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;webpack --config ./build/pro.config.js&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;webpack-dev-server --open --config ./build/dev.config.js&quot;</span><span class="token comment">//--open 自动打开浏览器</span>
  <span class="token punctuation">}</span>
<span class="token comment">//合并配置文件  npm install webpack-merge --save-dev</span>
<span class="token comment">//默认会寻找webpack.config.js配置文件，因此需要指定配置文件的路径</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置分离" tabindex="-1"><a class="header-anchor" href="#配置分离" aria-hidden="true">#</a> 配置分离</h2><p>webpack.config.js 包括开发时依赖与发布时依赖，将其分开，存放在build文件夹下</p><p>base.config.js 开发与发布的依赖</p><p>dev.config.js 开发时依赖</p><p>pro.config.js 发布时依赖</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//base.config.js</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> BannerPlugin <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;webpack&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;webpack&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> HtmlWebpackPlugin<span class="token operator">=</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;html-webpack-plugin&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> uglifyjsWebpackPlugin<span class="token operator">=</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;uglifyjs-webpack-plugin&#39;</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&#39;./src/main.js&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">//当前目录下</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;../dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">//不再是./dist,当前目录是build，需要z上一级目录下创建dist</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;bundle.js&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">// publicPath:&#39;dist/&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;style-loader&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(png|jpg|gif)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;url-loader&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span> 
              <span class="token literal-property property">limit</span><span class="token operator">:</span> <span class="token number">8192</span><span class="token punctuation">,</span>
              <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;img/[name].[hash:3].[ext]&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> 
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.vue$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;vue-loader&#39;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">extensions</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&#39;.js&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;.css&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;.vue&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;vue$&#39;</span><span class="token operator">:</span><span class="token string">&#39;vue/dist/vue.esm.js&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">BannerPlugin</span><span class="token punctuation">(</span><span class="token string">&#39;最终版权归..所有&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">index.html</span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//dev.config.js</span>
<span class="token keyword">const</span> webpackMerge<span class="token operator">=</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;webpack-merge&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> baseConfig <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./base.config&#39;</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> webpackMerge<span class="token punctuation">.</span><span class="token function">merge</span><span class="token punctuation">(</span>baseConfig<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">contentBase</span><span class="token operator">:</span> <span class="token string">&#39;../dist&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">inline</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//pro.config.js</span>
<span class="token keyword">const</span> uglifyjsWebpackPlugin<span class="token operator">=</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;uglifyjs-webpack-plugin&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> webpackMerge<span class="token operator">=</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;webpack-merge&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> baseConfig <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./base.config&#39;</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> webpackMerge<span class="token punctuation">.</span><span class="token function">merge</span><span class="token punctuation">(</span>baseConfig<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">uglifyjsWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="路径别名" tabindex="-1"><a class="header-anchor" href="#路径别名" aria-hidden="true">#</a> 路径别名</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//webpack.config.js</span>
<span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">extensions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;.js&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.vue&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.json&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;@&#39;</span><span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token string-property property">&#39;assets&#39;</span><span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/assets&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token string-property property">&#39;components&#39;</span><span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/component&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token string-property property">&#39;views&#39;</span><span class="token operator">:</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/views&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

<span class="token comment">//import 导入直接使用别名</span>
<span class="token keyword">import</span> Home form <span class="token string">&#39;component/home.vue&#39;</span>

<span class="token comment">//css中的src 需要在别名前加~</span>
<span class="token operator">&lt;</span>img <span class="token operator">~</span>src<span class="token operator">=</span><span class="token string">&#39;assets/xxx.png&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文件配置" tabindex="-1"><a class="header-anchor" href="#文件配置" aria-hidden="true">#</a> 文件配置</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//webpack</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> BannerPlugin <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;webpack&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;webpack&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> HtmlWebpackPlugin<span class="token operator">=</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;html-webpack-plugin&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> uglifyjsWebpackPlugin<span class="token operator">=</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;uglifyjs-webpack-plugin&#39;</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&#39;./src/main.js&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;bundle.js&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">//loader</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token comment">//css</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;style-loader&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">//picture</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(png|jpg|gif)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;url-loader&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span> 
              <span class="token literal-property property">limit</span><span class="token operator">:</span> <span class="token number">8192</span><span class="token punctuation">,</span>
              <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;img/[name].[hash:3].[ext]&#39;</span><span class="token punctuation">,</span>
              <span class="token comment">// publicPath:&#39;dist/&#39;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">//vue</span>
      <span class="token punctuation">{</span>
      <span class="token comment">//npm install vue-loader vue-template-compiler --save-dev</span>
      <span class="token comment">//vue-loader 加载vue文件</span>
      <span class="token comment">//vue-template-compiler 编译vue  </span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.vue$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;vue-loader&#39;</span><span class="token punctuation">]</span>
      <span class="token comment">//vue-loader was used without the corresponding plugin.</span>
      <span class="token comment">//版本&gt;14.0，0会需要插件</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">//vue路径</span>
  <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">//后缀简写</span>
    <span class="token literal-property property">extensions</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&#39;.js&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;.css&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;.vue&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;vue$&#39;</span><span class="token operator">:</span><span class="token string">&#39;vue/dist/vue.esm.js&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">//插件</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">//1.为打包的文件添加版权声明，webpack自带插件BannerPlugin</span>
    <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>BannerPlugin</span><span class="token punctuation">(</span><span class="token string">&#39;最终版权归..所有&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token comment">//2.打包index.html到dist文件中</span>
    <span class="token comment">//安装插件 npm install html-webpack-plugin --save-dev</span>
    <span class="token comment">// new HtmlWebpackPlugin() 根据模板生成</span>
    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">index.html</span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">//TypeError: Cannot read property &#39;initialize&#39; of undefined</span>
    <span class="token comment">//版本过高</span>

    <span class="token comment">// 3.对js文件压缩</span>
    <span class="token comment">//npm install uglifyjs-webpack-plugin --save-dev</span>
    <span class="token comment">// new uglifyjsWebpackPlugin() 开发时不需要 发布才用</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">//本地服务器</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">//为哪一个文件夹服务</span>
    <span class="token literal-property property">contentBase</span><span class="token operator">:</span> <span class="token string">&#39;./dist&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">//port端口号</span>
    <span class="token comment">//页面是否实时刷新</span>
    <span class="token literal-property property">inline</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token comment">//historyApiFallback spa页面依赖html5的history模式</span>

    <span class="token comment">//npm install webpack-dev-server@2.9.3 --save-dev 该版本应该与webpack版本契合</span>
    <span class="token comment">//&quot;dev&quot;:&quot;webpack-dev-server --open&quot; 脚本 优先本地寻找</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">=</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
<span class="token comment">//设置配置文件</span>
<span class="token comment">//不加该文件以前的打包 E:\\前端\\Vue\\webpack\\基本使用&gt;webpack ./src/main.js ./dist/bundle.js</span>
<span class="token comment">//经过以下更改后只需要输入webpack即可打包</span>
<span class="token comment">//path的使用需要安装的依赖 npm init</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//设置出入口</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&#39;./src/main.js&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">//path必须是绝对路径</span>
    <span class="token comment">//path.resolve动态获取当前路径,并可以拼接字符串</span>
    <span class="token comment">//__dirname全局变量</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;bundle.js&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token comment">//设置规则</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">//1.处理css</span>
    <span class="token comment">//css - loader / style - loader</span>
    <span class="token punctuation">{</span>
      <span class="token comment">//匹配所有.css文件</span>
      <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
      <span class="token comment">//css-loader只负责加载css文件</span>
      <span class="token comment">//style-loader负责将样式添加到DOM中</span>
      <span class="token comment">//使用多个loader时,从右向左起效</span>
      <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;style-loader&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">]</span>

      <span class="token comment">// UnhandledPromiseRejectionWarning: TypeError: this.getResolve is not a function</span>
      <span class="token comment">//版本过高时产生的错误</span>
      <span class="token comment">//手动将package.json文件下的style-loader(1.0.0)与css-loader(3.3.0)的版本降低</span>
      <span class="token comment">//执行命令 npm install 重新安装项目依赖</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 2.处理图片</span>
    <span class="token comment">//2.1 url-loader</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(png|jpg|gif)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;url-loader&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token comment">//限制图片大小8k;假如图片小于该限制,则以base64编码;大于则需要使用file-loader</span>
            <span class="token comment">//fiel-loder不需要做相应的配置</span>
            <span class="token literal-property property">limit</span><span class="token operator">:</span> <span class="token number">8192</span><span class="token punctuation">,</span>
            
            <span class="token comment">//自定义路径名/文件名</span>
            <span class="token comment">//[name]中的name代表变量名(图片文件名),直接写name会被当成文件夹名</span>
            <span class="token comment">//[hash:3]通过哈希随机生成唯一文件名,截取生成哈希字符串的前三位</span>
            <span class="token comment">//.代表字符串连接</span>
            <span class="token comment">//[ext]后缀名</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;img/[name].[hash:3].[ext]&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">//自定义输出路径,生成的所有url都会在之前添加&#39;dist/&#39;</span>
            <span class="token literal-property property">publicPath</span><span class="token operator">:</span><span class="token string">&#39;dist/&#39;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">//2.2 file-loader</span>
    <span class="token comment">//Module build failed: TypeError [ERR_INVALID_ARG_TYPE]: The &quot;path&quot; argument must be of type string. Received type undefined</span>
    <span class="token comment">//版本过高</span>
    <span class="token comment">//npm install file-loader@4.0.0 --save-dev</span>
  <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token comment">//3.vue</span>
  <span class="token comment">//npm install vue --save 运行时依赖</span>
  <span class="token comment">//安装位置默认在node_modules文件夹中</span>
  <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">//导入vue时会优先使用以下的路径寻找</span>
      <span class="token string-property property">&#39;vue$&#39;</span><span class="token operator">:</span><span class="token string">&#39;vue/dist/vue.esm.js&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  
<span class="token punctuation">}</span>


<span class="token comment">//npm run build 使用的时的是本地的webpack,因为脚本优先寻找本地的</span>
<span class="token comment">//不配置脚本情况下,终端中使用本地webpack node_modules/.bin/webpack </span>

<span class="token comment">//起初未能直接在json中注释,点击下方JSON-json的配置文件相关联-搜索json-点击json with comment</span>
<span class="token comment">//安装本地webpack在当前目录下输入命令 npm install webpack@3.6.0 --save-dev</span>


<span class="token comment">//1.创建配置文件webpack.config.js</span>
<span class="token comment">//2.npm init 初始化 生成package.json</span>
<span class="token comment">//3.npm install 安装依赖 生成package.lock.json</span>
<span class="token comment">//4.npm install webpack@3.6.0 --save-dev 安装本地webpack </span>
<span class="token comment">//5.配置相应loader</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,41),o=[t];function l(i,c){return s(),a("div",null,o)}const d=n(p,[["render",l],["__file","Webpack.html.vue"]]);export{d as default};
