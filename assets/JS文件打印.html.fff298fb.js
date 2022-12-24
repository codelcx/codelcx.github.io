import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,e as t}from"./app.f6447a9f.js";const p={},e=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 下载</span>
<span class="token keyword">let</span> a <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span>
a<span class="token punctuation">.</span>download <span class="token operator">=</span> <span class="token string">&#39;download&#39;</span>
a<span class="token punctuation">.</span>href <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>base64
a<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
a<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 打印</span>
<span class="token keyword">let</span> iframe <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;IFRAME&#39;</span><span class="token punctuation">)</span>
iframe<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;id&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;iframe&#39;</span><span class="token punctuation">)</span>
iframe<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;style&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;position:absolute;width:0;height:0;&#39;</span><span class="token punctuation">)</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>iframe<span class="token punctuation">)</span>

<span class="token keyword">let</span> img <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
<span class="token keyword">let</span> html <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> v <span class="token keyword">of</span> imgSrc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    img <span class="token operator">=</span> <span class="token string">&#39;&lt;div style=&quot;height: 100%;width: 100%;&quot;&gt;&#39;</span> 
		<span class="token operator">+</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;img src=&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>v<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; style=&quot;max-height:100%;max-width: 100%;&quot; onload=&quot;onLoad()&quot; onerror=&quot;onError()&quot; /&gt;</span><span class="token template-punctuation string">\`</span></span> 
		<span class="token operator">+</span> <span class="token string">&#39;&lt;/div&gt;&#39;</span>

    html <span class="token operator">=</span> html <span class="token operator">+</span> img
<span class="token punctuation">}</span>

<span class="token keyword">let</span> number <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">let</span> doc <span class="token operator">=</span> iframe<span class="token punctuation">.</span>contentWindow<span class="token punctuation">.</span>document

doc<span class="token punctuation">.</span><span class="token function-variable function">onLoad</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    number<span class="token operator">++</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>imgSrc<span class="token punctuation">.</span>length <span class="token operator">===</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        loading<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        iframe<span class="token punctuation">.</span>contentWindow<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        iframe<span class="token punctuation">.</span>contentWindow<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>userAgent<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&#39;MSIE&#39;</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>iframe<span class="token punctuation">)</span>

        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

doc<span class="token punctuation">.</span><span class="token function-variable function">onError</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>iframe<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

doc<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span>
doc<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[e];function c(i,l){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","JS文件打印.html.vue"]]);export{d as default};
