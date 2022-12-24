import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,e as p}from"./app.f6447a9f.js";const t={},e=p(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>el<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>less<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.chart</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
    
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> Echarts <span class="token keyword">from</span> <span class="token string">&#39;echarts&#39;</span>

type Data <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">kind</span><span class="token operator">:</span> string
  <span class="token literal-property property">records</span><span class="token operator">:</span> number
  <span class="token literal-property property">files</span><span class="token operator">:</span> number
  <span class="token literal-property property">hangeds</span><span class="token operator">:</span> number
  <span class="token literal-property property">rpages</span><span class="token operator">:</span> number
  <span class="token literal-property property">fpages</span><span class="token operator">:</span> number
<span class="token punctuation">}</span>

type Props <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>Data<span class="token operator">&gt;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> props <span class="token operator">=</span> defineProps<span class="token operator">&lt;</span>Props<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">const</span> <span class="token literal-property property">option</span><span class="token operator">:</span> Echarts<span class="token punctuation">.</span>EChartsOption <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">dataset</span><span class="token operator">:</span> <span class="token punctuation">[</span>

    <span class="token punctuation">{</span>
      <span class="token literal-property property">dimensions</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;kind&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;records&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;files&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;hangeds&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;rpages&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;fpages&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">source</span><span class="token operator">:</span> props<span class="token punctuation">.</span>data
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token punctuation">{</span>
      <span class="token literal-property property">transform</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;sort&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">config</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">dimension</span><span class="token operator">:</span> <span class="token string">&#39;kind&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">order</span><span class="token operator">:</span> <span class="token string">&#39;desc&#39;</span> <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>

  <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;#37A2DA&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;#32C5E9&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;#67E0E3&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;#9FE6B8&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;#FFDB5C&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

  <span class="token literal-property property">legend</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;案卷数量&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;文件数量&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;已挂原文数&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;案卷原文页数&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;文件原文页数&#39;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token literal-property property">grid</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;2%&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">right</span><span class="token operator">:</span> <span class="token string">&#39;2%&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">bottom</span><span class="token operator">:</span> <span class="token string">&#39;15%&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;category&#39;</span><span class="token punctuation">,</span>

    <span class="token literal-property property">axisLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">interval</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token literal-property property">rotate</span><span class="token operator">:</span> <span class="token number">35</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">splitLine</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>

  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;案卷数量&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">barGap</span><span class="token operator">:</span> <span class="token string">&#39;0%&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">encode</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token string">&#39;kind&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token string">&#39;records&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;文件数量&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">encode</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token string">&#39;kind&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token string">&#39;files&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;已挂原文数&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">encode</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token string">&#39;kind&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token string">&#39;hangeds&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;案卷原文页数&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">encode</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token string">&#39;kind&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token string">&#39;rpages&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;文件原文页数&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">encode</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token string">&#39;kind&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token string">&#39;fpages&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>




<span class="token keyword">const</span> el <span class="token operator">=</span> Vue<span class="token punctuation">.</span>ref<span class="token operator">&lt;</span>HTMLElement <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>

Vue<span class="token punctuation">.</span><span class="token function">onMounted</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> echart <span class="token operator">=</span> Echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>el<span class="token punctuation">.</span>value<span class="token punctuation">)</span>

      echart<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span>option<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
      
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>

Vue<span class="token punctuation">.</span><span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	<span class="token comment">// const el = document.getElementById(&#39;main&#39;)!</span>
	<span class="token keyword">const</span> <span class="token literal-property property">myChart</span><span class="token operator">:</span> Echarts <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>el<span class="token punctuation">.</span>value <span class="token keyword">as</span> HTMLElement<span class="token punctuation">)</span>
	myChart<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span>option<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),o=[e];function l(c,i){return s(),a("div",null,o)}const k=n(t,[["render",l],["__file","Echart多维柱状图.html.vue"]]);export{k as default};
