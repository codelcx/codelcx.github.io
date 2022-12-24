import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as s,e}from"./app.f6447a9f.js";const i={},t=e(`<h2 id="配置信息" tabindex="-1"><a class="header-anchor" href="#配置信息" aria-hidden="true">#</a> 配置信息</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>git config <span class="token punctuation">-</span><span class="token punctuation">-</span>list <span class="token comment"># 查看所有配置信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="历史记录" tabindex="-1"><a class="header-anchor" href="#历史记录" aria-hidden="true">#</a> 历史记录</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>git log <span class="token comment">#显示当前分支提交版本信息,不包括已删除的commit和reset</span>

git reflog <span class="token comment"># 查看所有分支的所有操作记录信息,包括已删除的commit和reset</span>

<span class="token comment"># 添加--prerry=oneline参数只显示版本号和提交备注信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="版本回滚" tabindex="-1"><a class="header-anchor" href="#版本回滚" aria-hidden="true">#</a> 版本回滚</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 1.回滚到历史最新版本</span>
<span class="token comment"># 工作区修改文件不合适,需要回滚到提交历史中的最新版本</span>
git reset <span class="token punctuation">-</span><span class="token punctuation">-</span>hard HEAD

<span class="token comment"># 2.回滚到提交历史中的上n个版本</span>
git reset <span class="token punctuation">-</span><span class="token punctuation">-</span>hard HEAD^ <span class="token comment"># 上一个版本</span>
git reset <span class="token punctuation">-</span><span class="token punctuation">-</span>hard HEAD^^ <span class="token comment"># 上上个版本</span>
git reset <span class="token punctuation">-</span><span class="token punctuation">-</span>hard HEAD^n <span class="token comment"># n代表回退几个版本</span>

<span class="token comment"># 3.回滚到提交历史中的制定版本</span>
git reset <span class="token punctuation">-</span><span class="token punctuation">-</span>hard commitID

<span class="token comment"># --hard 只是改变HEAD的指向,本地代码不变化</span>
<span class="token comment"># --soft 不仅改变HEAD的指向,并改变本地代码</span>

<span class="token comment"># 修改的为本地版本,需要更新远程仓库版本</span>
git push origin <span class="token punctuation">-</span>f branchName
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="记录合并" tabindex="-1"><a class="header-anchor" href="#记录合并" aria-hidden="true">#</a> 记录合并</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#工作区 版本3 版本2 版本1</span>
git rebase <span class="token punctuation">-</span>i HEAD~n  <span class="token comment"># 将最近的n条提交记录合并</span>
git rebase <span class="token punctuation">-</span>i HEAD~2  <span class="token comment"># 将版本3和版2提交记录合并</span>


git rebase <span class="token punctuation">-</span>i HEAD^n <span class="token comment"># 将版本n之前的提交记录合并</span>
git rebase <span class="token punctuation">-</span>i HEAD^^ <span class="token comment"># 版本1之前的记录合并</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>VI模式命令</p><table><thead><tr><th>命令</th><th>描述</th></tr></thead><tbody><tr><td>i</td><td>编辑模式</td></tr><tr><td>q!</td><td>不保存退出</td></tr><tr><td>wq:</td><td>保存退出</td></tr><tr><td>esc</td><td>回到命令模式</td></tr><tr><td>p</td><td>以同样提交信息保存并提交</td></tr><tr><td>r</td><td>需要重新编辑提交信息</td></tr><tr><td>e</td><td>会因amending中止</td></tr><tr><td>s</td><td>与前提交合并</td></tr><tr><td>f</td><td>丢掉提交日志</td></tr><tr><td>x</td><td>git将在shell中运行该命令</td></tr></tbody></table><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 回车进入vi模式</span>
<span class="token comment"># i:编辑模式, :q!不保存退出,:wq保存退出</span>

pick<span class="token punctuation">:</span>版本3
pick<span class="token punctuation">:</span>版本2

==<span class="token punctuation">&gt;</span>
pick<span class="token punctuation">:</span>版本3
s<span class="token punctuation">:</span>版本2

<span class="token comment"># 最上面记录为pick,其余修改为s,:wq保存退出</span>
<span class="token comment"># git commit --amend 编辑最新提交</span>
<span class="token comment"># git push origin -f branchName</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查询分支" tabindex="-1"><a class="header-anchor" href="#查询分支" aria-hidden="true">#</a> 查询分支</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>git branch <span class="token comment"># 本地所有分支,*表示当前分支</span>

git branch <span class="token punctuation">-</span>a <span class="token comment"># 包括远程分支</span>

git branch <span class="token punctuation">-</span>v <span class="token comment"># 包含分支的最后一次提交</span>

git branch <span class="token punctuation">-</span><span class="token punctuation">-</span>merged <span class="token comment"># 已合并到当前分支</span>

git branch <span class="token punctuation">-</span><span class="token punctuation">-</span>no<span class="token punctuation">-</span>merged <span class="token comment"># 未合并的分支</span>

git branch <span class="token punctuation">-</span>vv <span class="token comment"># 查看所有跟踪分支,包含远程分支与本地分支版本落后,领先等信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建分支" tabindex="-1"><a class="header-anchor" href="#创建分支" aria-hidden="true">#</a> 创建分支</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>git branch branchName <span class="token comment"># 创建分支</span>
git checkout branchName <span class="token comment"># 切换分支</span>

git checkout <span class="token punctuation">-</span>b branchName <span class="token comment"># 创建分支并切换</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除分支" tabindex="-1"><a class="header-anchor" href="#删除分支" aria-hidden="true">#</a> 删除分支</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>git branch <span class="token punctuation">-</span>d branchName <span class="token comment"># 删除分支,可能失败</span>

git branch <span class="token punctuation">-</span>D branchName <span class="token comment"># 强制删除</span>

git push origin <span class="token punctuation">-</span><span class="token punctuation">-</span>delete branchName <span class="token comment"># 删除远程分支</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="跟踪分支" tabindex="-1"><a class="header-anchor" href="#跟踪分支" aria-hidden="true">#</a> 跟踪分支</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>git checkout <span class="token punctuation">-</span>b branchName origin/branchName <span class="token comment"># 本地分支建立了在远程跟踪分支之上</span>

git checkout <span class="token punctuation">-</span><span class="token punctuation">-</span>track origin/branchName <span class="token comment"># 上个方式的快捷写法</span>

git checkout <span class="token punctuation">-</span>b branch_name origin/branchName <span class="token comment"># 本地分支与远程分支设置不同名</span>

git branch <span class="token punctuation">-</span>u origin/branchName <span class="token comment"># 设置已有本地分支跟踪刚拉取的远程分支</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="合并分支" tabindex="-1"><a class="header-anchor" href="#合并分支" aria-hidden="true">#</a> 合并分支</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>git merge branchName <span class="token comment"># 将分支合并到当前分支,可能需要手动解决冲突</span>

git branch <span class="token punctuation">-</span>d branchName <span class="token comment"># 删除已合并的分支</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设master存在dev1，dev2，有共同祖先</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>git merage dev1 <span class="token comment"># 合并dev1，指针向前推进更新到最新版本</span>

git merge dev2 <span class="token comment"># 合并dev2，与之前指针推进不同，将最新版本与dev2三方合并，合并结果为一次快照(最新提交)，并快进至最新版</span>
			  <span class="token comment"># 特点：不至一个父提交</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="推送分支" tabindex="-1"><a class="header-anchor" href="#推送分支" aria-hidden="true">#</a> 推送分支</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>git push <span class="token comment"># 远程自动将对应分支合并，意味在可能出现冲突，导致合并失败</span>

git pull <span class="token comment"># 因此推送分支前首先拉取远程数据到本地，若出席冲突则手动解决，再推送</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>git fetch origin <span class="token comment"># origin指定服务器,抓取本地没有的数据,更新本地数据库,移动orgin/master指针到更新后的位置</span>

git pull (origin) <span class="token comment"># 抓取本地没有的数据</span>


<span class="token comment"># 区别</span>
<span class="token comment"># 1.git fetch</span>
<span class="token comment">## 首先检查本地仓库与远程仓库差异,将变动的提交拉取本地仓库而不是本地工作目录,它不会自动将新数据合并到当前目录中,需要执行git merage 才能够将变动合并到工作目录</span>

<span class="token comment"># 2. git pull</span>
<span class="token comment">## 直接拉取最新数据并直接合并到当前目录中,并不会经过审查</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="变基分支" tabindex="-1"><a class="header-anchor" href="#变基分支" aria-hidden="true">#</a> 变基分支</h2><p>对分支上的所有修改都移至另一个分支上</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>git checkout branchName <span class="token comment"># 切换到需要变基的分支</span>

git rebase master <span class="token comment"># 将其变基到master分支上</span>

git checkout master <span class="token comment"># 切换为master分支</span>

git merge branchName <span class="token comment"># 快进合并</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主题分支中再分出一个主题分支</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>git rebase <span class="token punctuation">-</span><span class="token punctuation">-</span>onto master server client <span class="token comment"># 取出client分支,找出它从server分支分歧后的补丁,移至maser分支,相当于client分支是基于master修改</span>

git checkout master <span class="token comment"># 切换为master分支</span>

git merge client <span class="token comment"># 快进合并</span>

git rebase master server <span class="token comment"># 将server分支直接变基至master分支,省去切换server再变基操作</span>

git checkout master <span class="token comment"># 切换为master分支</span>

git merge server <span class="token comment"># 快进合并</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,31),l=[t];function c(d,r){return a(),s("div",null,l)}const p=n(i,[["render",c],["__file","Git.html.vue"]]);export{p as default};
