import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,e as t}from"./app.f6447a9f.js";const e={},p=t(`<h2 id="基础配置" tabindex="-1"><a class="header-anchor" href="#基础配置" aria-hidden="true">#</a> 基础配置</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> Vite <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span>
<span class="token keyword">import</span> Path <span class="token keyword">from</span> <span class="token string">&#39;path&#39;</span> <span class="token comment">// npm i @types/node -D</span>

<span class="token keyword">const</span> cwd <span class="token operator">=</span> process<span class="token punctuation">.</span><span class="token function">cwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> env <span class="token operator">=</span> Vite<span class="token punctuation">.</span><span class="token function">loadEnv</span><span class="token punctuation">(</span><span class="token string">&#39;development&#39;</span><span class="token punctuation">,</span> cwd<span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token comment">// &#39;&#39;表示任意前缀，默认VITE_</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Vite<span class="token punctuation">.</span><span class="token function">defineConfig</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
		<span class="token comment">// 项目根目录，一般多页面时配置，可以是绝对路径或相对该配置文件路径</span>
		<span class="token literal-property property">root</span><span class="token operator">:</span> process<span class="token punctuation">.</span><span class="token function">cwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

		<span class="token comment">// 访问服务的公共基础路径[/、/xxx/、https://xxx.com]</span>
		<span class="token literal-property property">base</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>

		<span class="token comment">// 模式[development、production],指明可覆盖serve/build中的模式</span>
		<span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;development&#39;</span><span class="token punctuation">,</span>

		<span class="token comment">// 静态资源服务文件夹，可以是绝对路径或相对根目录路径</span>
		<span class="token comment">// 构建期间直接复制到outDir</span>
		<span class="token comment">// 源码中引用该文件夹资源时(如public/icon.png,引用时/icon.png)</span>
		<span class="token literal-property property">publicDir</span><span class="token operator">:</span> <span class="token string">&#39;public&#39;</span><span class="token punctuation">,</span>

		<span class="token comment">// 加载.env文件目录,默认为root，可以是绝对路径或相对该配置文件路径</span>
		<span class="token literal-property property">envDir</span><span class="token operator">:</span> process<span class="token punctuation">.</span><span class="token function">cwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

		<span class="token comment">// 配置环境变量前缀，可通过i<wbr>mport.meta.env暴露在源码中 </span>
		<span class="token literal-property property">envPrefix</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;VITE_&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

		<span class="token comment">// 存储缓存文件的目录(--force可删除），可以是绝对路径或相对根目录路径</span>
		<span class="token literal-property property">cacheDir</span><span class="token operator">:</span> <span class="token string">&#39;node_modules/.vite&#39;</span><span class="token punctuation">,</span>

		<span class="token comment">// 静态资源处理，引用的资源作为构建资源图的一部分包括在内，生成散列文件名，可由插件进行处理优化</span>
		<span class="token comment">// 资源体积小于 assetsInlineLimit 选项值 则会被内联为 base64 data URL</span>
		<span class="token comment">// 内建支持资源类型 https://github.com/vitejs/vite/blob/main/packages/vite/src/node/constants.ts</span>
		<span class="token literal-property property">assetsInclude</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;**/*.png&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

		<span class="token comment">// 控制台输出级别 info|warn|error|silent</span>
		<span class="token literal-property property">logLevel</span><span class="token operator">:</span> <span class="token string">&#39;info&#39;</span><span class="token punctuation">,</span>

		<span class="token comment">// 清屏</span>
		<span class="token literal-property property">clearScreen</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

		<span class="token comment">// 定义全局常量替换方式</span>
		<span class="token literal-property property">define</span><span class="token operator">:</span> <span class="token punctuation">{</span>
             <span class="token literal-property property">__APP_ENV__</span><span class="token operator">:</span> env<span class="token punctuation">.</span><span class="token constant">APP_ENV</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

		<span class="token comment">// 应用类型 spa单页面|mpa多页面|custom定制化页面</span>
		<span class="token literal-property property">appType</span><span class="token operator">:</span> <span class="token string">&#39;spa&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="服务配置" tabindex="-1"><a class="header-anchor" href="#服务配置" aria-hidden="true">#</a> 服务配置</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> Vite<span class="token punctuation">.</span><span class="token function">defineConfig</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
		<span class="token literal-property property">server</span><span class="token operator">:</span> <span class="token punctuation">{</span>

			<span class="token comment">// 指定服务器监听的IP，0.0.0.0 / true 表示监听所有地址(局域网+公网)</span>
			<span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">&#39;localhost&#39;</span><span class="token punctuation">,</span>

			<span class="token comment">// 指定服务器端口，已使用则自动尝试下一个端口</span>
			<span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">3000</span><span class="token punctuation">,</span>

			<span class="token comment">// 设置为true表示端口号被占用则直接退出不做尝试</span>
			<span class="token literal-property property">strictPort</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>

			<span class="token comment">// 设置true表示开发服务器启动自动在浏览器打开,默认打开http://localhost:3000</span>
			<span class="token comment">// 设置字符串表示用作URL路径,如设置为 index.html 则打开http://localhost:3000/index.html</span>
			<span class="token literal-property property">open</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>

			<span class="token comment">// 代理</span>
			<span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span>
				<span class="token comment">// 字符串简写写法</span>
				<span class="token string-property property">&#39;/api1&#39;</span><span class="token operator">:</span> <span class="token string">&#39;http://localhost:3001&#39;</span><span class="token punctuation">,</span>

				<span class="token comment">// 选项写法</span>
				<span class="token string-property property">&#39;/api2&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
					<span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&#39;http://localhost:3002&#39;</span><span class="token punctuation">,</span>
					<span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
					<span class="token function-variable function">rewrite</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">path</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> path<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\/api2</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>

				<span class="token comment">// 正则表达式写法</span>
				<span class="token string-property property">&#39;^/api3/.*&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
					<span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&#39;http://localhost:3003&#39;</span><span class="token punctuation">,</span>
					<span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
					<span class="token function-variable function">rewrite</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">path</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> path<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\/api3</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>

				<span class="token comment">// 使用 proxy 实例</span>
				<span class="token string-property property">&#39;/api&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
					<span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&#39;http://localhost:3004&#39;</span><span class="token punctuation">,</span>
					<span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
					<span class="token function-variable function">configure</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">proxy<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
						<span class="token comment">// proxy 是 &#39;http-proxy&#39; 的实例</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>

				<span class="token comment">// Proxying websockets or socket.io</span>
				<span class="token string-property property">&#39;/socket.io&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
					<span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&#39;ws://localhost:3000&#39;</span><span class="token punctuation">,</span>
					<span class="token literal-property property">ws</span><span class="token operator">:</span> <span class="token boolean">true</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>

			<span class="token comment">//跨域 CorsOptions|boolean，默认启用并允许任何资源</span>
			<span class="token literal-property property">cors</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

			<span class="token comment">//文件监听，默认忽略.git / node_modules目录监听,可对其取反监听</span>
			<span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span>
				<span class="token literal-property property">ignored</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;!**/node_modules/your-package-name/**&#39;</span><span class="token punctuation">]</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>

			<span class="token comment">// 文件访问权限</span>
			<span class="token literal-property property">fs</span><span class="token operator">:</span> <span class="token punctuation">{</span>
				<span class="token comment">// 默认undefined可以访问所有目录，设置true限制仅可访问工作区root</span>
				<span class="token literal-property property">strict</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

				<span class="token comment">// 限制那些文件可以通过/@fs/路径提供服务</span>
				<span class="token comment">// 设置该选项是，工作区根目录自动检索被禁用</span>
				<span class="token comment">// strict为true是，访问该目录以外文件将返回403</span>
				<span class="token literal-property property">allow</span><span class="token operator">:</span> <span class="token punctuation">[</span>
					<span class="token comment">// 搜索工作区的根目录</span>
					Vite<span class="token punctuation">.</span><span class="token function">searchForWorkspaceRoot</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span><span class="token function">cwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

					<span class="token comment">// 自定义规则</span>
					<span class="token string">&#39;/path/to/custom/allow&#39;</span>
				<span class="token punctuation">]</span><span class="token punctuation">,</span>

				<span class="token comment">// 敏感文件黑名单，优先级高于allow</span>
				<span class="token literal-property property">deny</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;.env&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.env.*&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;*.{pem,crt}&#39;</span><span class="token punctuation">]</span>

			<span class="token punctuation">}</span><span class="token punctuation">,</span>

			<span class="token comment">// hmr</span>
			<span class="token comment">// base</span>
			<span class="token comment">// https</span>
			<span class="token comment">// origin</span>
			<span class="token comment">// headers</span>
			<span class="token comment">// middlewareMode</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="构建配置" tabindex="-1"><a class="header-anchor" href="#构建配置" aria-hidden="true">#</a> 构建配置</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> Vite<span class="token punctuation">.</span><span class="token function">defineConfig</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
		<span class="token literal-property property">build</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token comment">// 指定输出路径(相对根目录)</span>
			<span class="token literal-property property">outDir</span><span class="token operator">:</span> <span class="token string">&#39;dist&#39;</span><span class="token punctuation">,</span>

			<span class="token comment">// 指定生成静态资源存放路径(相对build.outDir)</span>
			<span class="token literal-property property">assetsDir</span><span class="token operator">:</span> <span class="token string">&#39;assets&#39;</span><span class="token punctuation">,</span>

			<span class="token comment">// 若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录</span>
			<span class="token literal-property property">emptyOutDir</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

			<span class="token comment">// Vite 会在构建阶段将 publicDir 目录中的所有文件复制到 outDir 目录中</span>
			<span class="token literal-property property">copyPublicDir</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

			<span class="token comment">// 设置最终构建浏览器兼容目标</span>
			<span class="token comment">// modules(默认):支持原生ES模块、原生ESM动态导入、i<wbr>mport.meta的浏览器</span>
			<span class="token comment">// esnext: 仅在build.minify:terser时转译(es2019),其它情况完全忽视</span>
			<span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token punctuation">[</span>
				<span class="token string">&#39;es2020&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;chrome58&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;edge16&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;firefox57&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;node12&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;safari11&#39;</span><span class="token punctuation">,</span>
			<span class="token punctuation">]</span><span class="token punctuation">,</span>

			<span class="token comment">// 小于此阈值(KB)的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项</span>
			<span class="token literal-property property">assetsInlineLimit</span><span class="token operator">:</span> <span class="token number">4096</span><span class="token punctuation">,</span>

			<span class="token comment">// 启用(默认)，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时插入</span>
			<span class="token comment">// 禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中</span>
			<span class="token comment">// 如果指定了 build.lib，build.cssCodeSplit 会默认为 false</span>
			<span class="token literal-property property">cssCodeSplit</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

			<span class="token comment">// 默认 同 build.target</span>
			<span class="token comment">// 此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target，此处的 target 并非是用于 JavaScript 转写目标</span>
			<span class="token comment">// 应只在针对非主流浏览器时使用</span>
			<span class="token comment">// 如安卓微信中，build.cssTarget 设为 chrome61，防止 rgba() 颜色转化为 #RGBA 十六进制符号的形式</span>
			<span class="token literal-property property">cssTarget</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>

			<span class="token comment">// 指定使用的混淆器【混淆器是用作保护代码、精简编译后程序大小的编辑工具】</span>
			<span class="token comment">// esbuild | terser | false</span>
			<span class="token comment">// 设置terser时必须安装 npm add -D terser</span>
			<span class="token literal-property property">minify</span><span class="token operator">:</span> <span class="token string">&#39;esbuild&#39;</span><span class="token punctuation">,</span>

			<span class="token comment">// 默认true，polyfill自动注入到每个index.html入口代理模块中</span>
			<span class="token comment">// build.rollupOptions.input配置非HTML入口，需手动在自定义入口中引入 import &#39;vite/modulepreload-polyfill&#39;</span>
			<span class="token comment">// 此时polyfill不适用Library模式，若需支持那些无法动态导入的浏览器 { polyfill:false}</span>
			<span class="token literal-property property">modulePreload</span><span class="token operator">:</span> <span class="token punctuation">{</span>
				<span class="token literal-property property">polyfill</span><span class="token operator">:</span> <span class="token boolean">true</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>

			<span class="token comment">// 构建后是否生成 source map 文件，默认false</span>
			<span class="token comment">// true，创建一个独立的 source map 文件</span>
			<span class="token comment">// inline，source map 将作为一个 data URI 附加在输出文件中</span>
			<span class="token comment">// hidden，同true，但是会将文件中的注释删除</span>
			<span class="token literal-property property">sourcemap</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>

			<span class="token comment">// 规定触发警告的 chunk 大小（kbs）</span>
			<span class="token literal-property property">chunkSizeWarningLimit</span><span class="token operator">:</span> <span class="token number">500</span><span class="token punctuation">,</span>

			<span class="token comment">// 构建后将会生成 manifest.json 文件，默认false</span>
			<span class="token comment">// 文件内容：未被 hash 的资源文件名和 hash 后版本的映射，可以为一些服务器框架渲染时提供正确的资源引入链接</span>
			<span class="token comment">// 当该值为一个字符串时，它将作为 manifest 文件的名字</span>
			<span class="token literal-property property">manifest</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>

			<span class="token comment">// 构建也将生成 SSR 的 manifest 文件，默认false</span>
			<span class="token comment">// 以确定生产中的样式链接与资产预加载指令</span>
			<span class="token comment">// 该值为一个字符串时，它将作为 manifest 文件的名字</span>
			<span class="token literal-property property">ssrManifest</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>

			<span class="token comment">// 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能</span>
			<span class="token literal-property property">reportCompressedSize</span><span class="token operator">:</span> <span class="token boolean">true</span>

			<span class="token comment">// lib</span>
			<span class="token comment">// ssr</span>
			<span class="token comment">// write</span>
			<span class="token comment">// watch</span>
			<span class="token comment">// rollupOptions</span>
			<span class="token comment">// terserOptions</span>
			<span class="token comment">// commonjsOptions</span>
			<span class="token comment">// dynamicImportVarsOptions</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据环境构建不同产物</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> Vite <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span>
<span class="token keyword">import</span> viteBaseConfig <span class="token keyword">from</span> <span class="token string">&#39;./vite.base.config&#39;</span> <span class="token comment">// 通用基础配置内容</span>
<span class="token keyword">import</span> viteDevConfig <span class="token keyword">from</span> <span class="token string">&#39;./vite.dev.config&#39;</span> <span class="token comment">// 开发环境配置内容</span>
<span class="token keyword">import</span> viteProdConfig <span class="token keyword">from</span> <span class="token string">&#39;./vite.prod.config&#39;</span> <span class="token comment">// 生产环境配置内容</span>

<span class="token keyword">const</span> envResolver <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string-property property">&#39;build&#39;</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;生产环境&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token operator">...</span>viteBaseConfig<span class="token punctuation">,</span> <span class="token operator">...</span>viteProdConfig<span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
    
  <span class="token string-property property">&#39;serve&#39;</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;开发环境&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token operator">...</span>viteBaseConfig<span class="token punctuation">,</span> <span class="token operator">...</span>viteDevConfig<span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Vite<span class="token punctuation">.</span><span class="token function">defineConfig</span><span class="token punctuation">(</span>
    <span class="token comment">// command: build(生产环境),serve(开发环境)</span>
    <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>command<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> envResolver<span class="token punctuation">[</span>command<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="预览配置" tabindex="-1"><a class="header-anchor" href="#预览配置" aria-hidden="true">#</a> 预览配置</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">preview</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">&#39;localhost&#39;</span><span class="token punctuation">,</span>
			<span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">4147</span><span class="token punctuation">,</span>
			<span class="token literal-property property">strictPort</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
			<span class="token literal-property property">open</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
			<span class="token literal-property property">cors</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
			<span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span>
				<span class="token string-property property">&#39;/api&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
					<span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&#39;http://localhost:3000&#39;</span><span class="token punctuation">,</span>
					<span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
					<span class="token function-variable function">rewrite</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">path</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> path<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\/api</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>

			<span class="token comment">// https</span>
			<span class="token comment">// headers</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="依赖优化" tabindex="-1"><a class="header-anchor" href="#依赖优化" aria-hidden="true">#</a> 依赖优化</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> Vite<span class="token punctuation">.</span><span class="token function">defineConfig</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
      		<span class="token literal-property property">optimizeDeps</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token comment">// 默认抓取index.htlm检测需要构建的依赖，忽略node_modules|build.outDir|_test_|coverage</span>
			<span class="token comment">// 设置build.rollupOptions.input则抓取该入口点</span>
			<span class="token comment">// 设置该选项后，默认只忽略 node_modules|build.outDir</span>
			<span class="token literal-property property">entries</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;index.html&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

			<span class="token comment">// 被监听的包必须被排除在优化之外，以便它能出现在依赖关系图中并触发热更新。</span>
			<span class="token literal-property property">exclude</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;your-package-name&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

			<span class="token comment">// 默认node_module不会预构建</span>
			<span class="token literal-property property">include</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;esm-dep&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

			<span class="token comment">// 设置true可强制构建依赖，而忽略已缓存、已优化的依赖</span>
			<span class="token literal-property property">force</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

			<span class="token comment">// 在部署扫描和优化过程传递给esbuild的选项</span>
			<span class="token comment">// external 传递 optimizeDeps.exclude</span>
			<span class="token comment">// plugins  传递 dep插件</span>
			<span class="token literal-property property">esbuildOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

		<span class="token punctuation">}</span><span class="token punctuation">,</span>
 
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="js" tabindex="-1"><a class="header-anchor" href="#js" aria-hidden="true">#</a> JS</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> Vite<span class="token punctuation">.</span><span class="token function">defineConfig</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
    	<span class="token literal-property property">esbuild</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>    
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="css" tabindex="-1"><a class="header-anchor" href="#css" aria-hidden="true">#</a> CSS</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> Vite<span class="token punctuation">.</span><span class="token function">defineConfig</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
       <span class="token literal-property property">css</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="json" tabindex="-1"><a class="header-anchor" href="#json" aria-hidden="true">#</a> JSON</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> Vite<span class="token punctuation">.</span><span class="token function">defineConfig</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
       	<span class="token literal-property property">json</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token comment">// 是否支持按名导入，如 import {name,age} from &#39;person&#39;</span>
			<span class="token literal-property property">namedExports</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

			<span class="token comment">// true则不支持按名导入，导入的json自动转换为对象字面量，如 import person from &#39;person&#39;</span>
			<span class="token literal-property property">stringify</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="plugins" tabindex="-1"><a class="header-anchor" href="#plugins" aria-hidden="true">#</a> Plugins</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> vue <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-vue&#39;</span> <span class="token comment">//提供vue3单文件组件支持</span>
<span class="token keyword">import</span> Legacy <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-legacy&#39;</span>  <span class="token comment">// 提供打包后文件对传统浏览器的兼容 </span>

<span class="token keyword">import</span> image <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-image&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> Vite<span class="token punctuation">.</span><span class="token function">defineConfig</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
			<span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token function">Legacy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
            	<span class="token operator">...</span><span class="token function">image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
     			<span class="token comment">// pre : vite核心插件调用前</span>
			   	<span class="token comment">// 默认：vite核心插件调用后</span>
			   	<span class="token comment">// post：vite构建插件后</span>
      			<span class="token literal-property property">enforce</span><span class="token operator">:</span> <span class="token string">&#39;pre&#39;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                 <span class="token operator">...</span><span class="token function">typescript2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                 <span class="token comment">// zhi&#39;m</span>
      			<span class="token literal-property property">apply</span><span class="token operator">:</span> <span class="token string">&#39;build&#39;</span>
            <span class="token punctuation">}</span>
		<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="resolve" tabindex="-1"><a class="header-anchor" href="#resolve" aria-hidden="true">#</a> Resolve</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> Vite<span class="token punctuation">.</span><span class="token function">defineConfig</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token comment">// 配置别名，始终使用绝对路径</span>
			<span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
				<span class="token string-property property">&#39;@&#39;</span><span class="token operator">:</span> Path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>cwd<span class="token punctuation">,</span> <span class="token string">&#39;src&#39;</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>

			<span class="token comment">// 情景导出，如package.json中的exports选项</span>
			<span class="token literal-property property">conditions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;import&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;module&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;browser&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;default&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;develoment&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

			<span class="token comment">// 解析包的入口尝试字段，若从exports成功解析则该字段会忽略</span>
			<span class="token literal-property property">mainFields</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;browser&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;module&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;jsnext:main&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;jsnext&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

			<span class="token comment">// 导入时省略的扩展名,不建议忽略自定义导入类型扩展名(.vue)</span>
			<span class="token literal-property property">extensions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;.mjs&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.js&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.ts&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.jsx&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;.tsx&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;json&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

		<span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ssr" tabindex="-1"><a class="header-anchor" href="#ssr" aria-hidden="true">#</a> SSR</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> Vite<span class="token punctuation">.</span><span class="token function">defineConfig</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">ssr</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token comment">// 强制外部化的依赖</span>
			<span class="token literal-property property">external</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

			<span class="token comment">// 防止依赖被外部化</span>
			<span class="token literal-property property">noExternal</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

			<span class="token comment">// 服务器构建目标 node|webworker</span>
			<span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&#39;node&#39;</span><span class="token punctuation">,</span>

			<span class="token comment">// 服务器构建语法 esm|cjs</span>
			<span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token string">&#39;esm&#39;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="webworker" tabindex="-1"><a class="header-anchor" href="#webworker" aria-hidden="true">#</a> Webworker</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> Vite<span class="token punctuation">.</span><span class="token function">defineConfig</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">worker</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token comment">// 打包输出类型 es|iife</span>
			<span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token string">&#39;iife&#39;</span><span class="token punctuation">,</span>
			
			<span class="token comment">// 插件</span>
			<span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
			
			<span class="token comment">// rollupOptions</span>
		<span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26),o=[p];function i(l,c){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","Vite.html.vue"]]);export{d as default};
