## 本地配置

项目配置文件：`root/.gitconfig`

全局配置文件：`C:\Users\[userName]\.gitconfig`

```sh
# --global(全局) --local(本地)

# 查看全局配置列表
 config --global -l

# 查看已设置的全局用户名/邮箱
 config --global --get user.name
 config --global --get user.email

# 设置全局用户名/邮箱
 config --global user.name "输入你的用户名"
 config --global user.email "输入你的邮箱"

# 删除配置
 config --unset --global user.name
 config --unset --global user.email

# 文件权限的变动也会视为改动，可通过以下配置忽略文件权限变动
 config core.fileMode false

# 文件大小写设为敏感， 默认是忽略大小写
 config --global core.ignorecase false

# 代理
 config --global http.proxy  url
 config --global https.proxy  url

# 取消代理
 config --global --unset http.proxy
 config --global --unset https.proxy

# 克隆失败添加以下配置
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
```



## 增删文件

```sh
# 添加指定文件到暂存区
 add [file1] [file2] ...

# 添加指定目录到暂存区，包括子目录
 add [dir]

# 添加当前目录的所有文件到暂存区
 add .

# 删除工作区文件，并且将这次删除放入暂存区
 rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
 rm --cached [file]

# 改名文件，并且将这个改名放入暂存区
# 实际上是新建一个相同的文件，删除旧文件，然后将新旧文件都放入暂存区
 mv [file-original] [file-renamed]
```



## 代码提交

```sh
# 提交暂存区到仓库区
 commit -m [message]

# 提交暂存区的指定文件到仓库区
 commit [file1] [file2] ... -m [message]

# 提交工作区自上次 commit 之后的变化，直接到仓库区
 commit -a

# 提交时显示所有 diff 信息
 commit -v

# 使用一次新的 commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次 commit 的提交信息
 commit --amend -m [message]

# 重做上一次 commit，并包括指定文件的新变化
 commit --amend [file1] [file2] ...
```



## 标签操作

`tag` 指向一次 `commit ID`，通常用于给分支做一个标志，如标记版本号

```sh
# 列出所有 tag
 tag

# 新建一个 tag 在当前 commit
 tag [tag-name]

# 新建一个 tag 在指定 commit
 tag [tag-name] [commit-id]

# 删除本地 tag
 tag -d [tag-name]

# 删除远程 tag
 push origin :refs/tags/[tag-name]

# 查看 tag 信息
 show [tag-name]

# 提交指定 tag
 push [remote-repo-name, 默认是 origin] [tag-name]

# 提交所有 tag
 push [remote-repo-name, 默认是 origin] --tags

# 基于某个 tag 新建一个分支，并切换到这个分支
 checkout -b [branch-name] [tag-name]
```



## 日志查看

```sh
# 显示有变更的文件
 status

# 显示当前分支的版本历史
 log

# 查看指定作者历史记录
 log --author=[author-name]

# 只显示合并日志
 log --merges

# 以图形查看日志记录，--oneline 可选，表示输出概要日志
 log --graph --oneline

# 显示 commit 历史，以及每次 commit 发生变更的文件
 log --stat

# 搜索提交历史，根据关键词
 log -S [keyword]

# 显示某个 commit 之后的所有变动，每个 commit 占据一行
 log [tag] HEAD --pretty=format:%s

# 显示某个 commit 之后的所有变动，其"提交说明"必须符合搜索条件
 log [tag] HEAD --grep feature

# 显示某个文件的版本历史，包括文件改名
 log --follow [file]
 whatchanged [file]

# 显示指定文件相关的每一次 diff
 log -p [file]

# 显示过去 5 次提交
 log -5 --pretty --oneline

# 显示所有提交过的用户，按提交次数排序
 shortlog -sn

# 显示指定文件是什么人在什么时间修改过
 blame [file]

# 显示暂存区和工作区的差异
 diff

# 显示暂存区和上一个 commit 的差异
 diff --cached [file]

# 显示工作区与当前分支最新 commit 之间的差异
 diff HEAD

# 显示两次提交之间的差异
 diff [first-branch]...[second-branch]

# 显示今天你写了多少行代码
 diff --shortstat "@{0 day ago}"

# 显示某次提交的元数据和内容变化
 show [commit]

# 显示某次提交发生变化的文件
 show --name-only [commit]

# 显示某次提交时，某个文件的内容
 show [commit]:[filename]

# 显示当前分支的最近几次提交
 reflog
```



## 文件暂存

切换分支的前提时工作区内容需要为空，假如需要切换分支做其它工作时，对于当前分支工作内容并不想直接提交，此时可以将当前分支的工作内容暂存

```sh
# 暂存当前工作区内容
 stash

# 暂存时添加描述信息，推荐使用此命令
 stash push -m "更改了 xx"

# 暂存包含没有被  追踪的文件
 stash -u

# 查看当前暂存列表
 stash list

# 恢复修改工作区内容，会从  stash list 移除掉
 stash pop           # 恢复最近一次保存内容到工作区，默认会把暂存区的改动恢复到工作区
 stash pop stash@{1} # 恢复指定 id，通过  stash list 可查到

# 与 pop 命令一致，唯一不同的是不会从  stash list 移除掉
 stash apply

# 清空所有保存(慎用)
 stash clear

# 清空指定 stash id，如果 drop 后面不指定 id 则清除最近的一次
 stash drop stash@{0}
 stash drop  # 清除最近一次

# 想看 stash 做了什么改动，类似简化版的  diff
 stash show stash@{0}
```

> info  stash 存储位置
> 项目路径下的 `.` 文件中存储着版本管理的所有信息，在文件 `./log/refs/stash` 中可以看到全部的 stash 记录信息



## 暂存误删

```bash
 log --graph --oneline --decorate $(  fsck --no-reflog | awk '/dangling 
 stash apply hash-  #(stash对应的哈希值)
```





## 命令查看

```sh
 <verb> help(-h) # 例如  add -h
```



## 历史记录

```yml
 log #显示当前分支提交版本信息,不包括已删除的commit和reset

 reflog # 查看所有分支的所有操作记录信息,包括已删除的commit和reset

# 添加--prerry=oneline参数只显示版本号和提交备注信息
```



## 版本回滚

```yml
# 1.回滚到历史最新版本
# 工作区修改文件不合适,需要回滚到提交历史中的最新版本
 reset --hard HEAD

# 2.回滚到提交历史中的上n个版本
 reset --hard HEAD^ # 上一个版本
 reset --hard HEAD^^ # 上上个版本
 reset --hard HEAD^n # n代表回退几个版本

# 3.回滚到提交历史中的制定版本
 reset --hard commitID

# --hard 只是改变HEAD的指向,本地代码不变化
# --soft 不仅改变HEAD的指向,并改变本地代码

# 修改的为本地版本,需要更新远程仓库版本
 push origin -f branchName
```



## 记录合并

```yml
#工作区 版本3 版本2 版本1
 rebase -i HEAD~n  # 将最近的n条提交记录合并
 rebase -i HEAD~2  # 将版本3和版2提交记录合并


 rebase -i HEAD^n # 将版本n之前的提交记录合并
 rebase -i HEAD^^ # 版本1之前的记录合并
```


VI模式命令

| 命令 |           描述           |
| :--: | :----------------------: |
|  i   |         编辑模式         |
|  q!  |        不保存退出        |
| wq:  |         保存退出         |
| esc  |       回到命令模式       |
|  p   | 以同样提交信息保存并提交 |
|  r   |   需要重新编辑提交信息   |
|  e   |     会因amending中止     |
|  s   |       与前提交合并       |
|  f   |       丢掉提交日志       |
|  x   |  将在shell中运行该命令   |



```yml
# 回车进入vi模式
# i:编辑模式, :q!不保存退出,:wq保存退出

pick:版本3
pick:版本2

==>
pick:版本3
s:版本2

# 最上面记录为pick,其余修改为s,:wq保存退出
#  commit --amend 编辑最新提交
#  push origin -f branchName
```



## 分支操作

```sh
# 列出所有本地分支
 branch

# 列出所有远程分支
 branch -r

# 列出所有本地分支和远程分支
 branch -a

# 新建一个分支，但依然停留在当前分支
 branch [branch-name]

# 新建一个分支，并切换到该分支
 checkout -b [branch-name]

# 新建一个分支，指向指定 commit
 branch [branch-name] [commit-id]

# 新建一个分支，与指定的远程分支建立追踪关系
 branch --track [branch-name] [remote-branch-name]

# 切换到指定分支，并更新工作区
 checkout [branch-name]

# 切换到上一个分支
 checkout -

# 建立追踪关系，在现有分支与指定的远程分支之间
 branch --set-upstream [branch-name] [remote-branch-name]

# 合并指定分支到当前分支
 merge [branch-name]

# 从其它分支上挑选一个指定 commit，合并进当前分支
 cherry-pick [commit-id]

# 保留原有作者信息进行合并
 cherry-pick -x [commit-id]

# 删除分支
 branch -d [branch-name]

# 删除远程分支
 push origin --delete [branch-name]
 branch -dr [remote/branch]
```



## 远程同步

```sh
# remote：远程存储库名称，默认origin
# branch：远程分支名称，默认master|main

# 下载远程仓库的所有变动
 fetch [remote]

# 显示所有远程仓库
 remote -v

# 显示某个远程仓库的信息
 remote show [remote]

# 取回远程仓库的变化，并与本地分支合并
 pull [remote] [branch]

# 上传本地指定分支到远程仓库
 push [remote] [branch]

# 强行推送当前分支到远程仓库，即使有冲突
 push [remote] --force

# 推送所有分支到远程仓库
 push [remote] --all
```

```bash
# 本地仓库关联远程仓库
remote add origin url 
# 本地仓库取消关联远程仓库
remote remove origin
```



## 查询分支

```yml
 branch # 本地所有分支,*表示当前分支

 branch -a # 包括远程分支

 branch -v # 包含分支的最后一次提交

 branch --merged # 已合并到当前分支

 branch --no-merged # 未合并的分支

 branch -vv # 查看所有跟踪分支,包含远程分支与本地分支版本落后,领先等信息
```



## 创建分支

```yml
 branch branchName # 创建分支
 checkout branchName # 切换分支

 checkout -b branchName # 创建分支并切换
```



## 删除分支

```yml
 branch -d branchName # 删除分支,可能失败

 branch -D branchName # 强制删除

 push origin --delete branchName # 删除远程分支
```



## 跟踪分支

```yml
 checkout -b branchName origin/branchName # 本地分支建立了在远程跟踪分支之上

 checkout --track origin/branchName # 上个方式的快捷写法

 checkout -b branch_name origin/branchName # 本地分支与远程分支设置不同名

 branch -u origin/branchName # 设置已有本地分支跟踪刚拉取的远程分支
```



## 合并分支

```yml
 merge branchName # 将分支合并到当前分支,可能需要手动解决冲突

 branch -d branchName # 删除已合并的分支
```

假设master存在dev1，dev2，有共同祖先

```yml
 merage dev1 # 合并dev1，指针向前推进更新到最新版本

 merge dev2 # 合并dev2，与之前指针推进不同，将最新版本与dev2三方合并，合并结果为一次快照(最新提交)，并快进至最新版
			  # 特点：不至一个父提交
```



## 推送分支

```yml
 push # 远程自动将对应分支合并，意味在可能出现冲突，导致合并失败

 pull # 因此推送分支前首先拉取远程数据到本地，若出席冲突则手动解决，再推送
```



```yml
 fetch origin # origin指定服务器,抓取本地没有的数据,更新本地数据库,移动orgin/master指针到更新后的位置

 pull (origin) # 抓取本地没有的数据


# 区别
# 1. fetch
## 首先检查本地仓库与远程仓库差异,将变动的提交拉取本地仓库而不是本地工作目录,它不会自动将新数据合并到当前目录中,需要执行 merage 才能够将变动合并到工作目录

# 2.  pull
## 直接拉取最新数据并直接合并到当前目录中,并不会经过审查
```



## 变基分支

对分支上的所有修改都移至另一个分支上

```yml
 checkout branchName # 切换到需要变基的分支

 rebase master # 将其变基到master分支上

 checkout master # 切换为master分支

 merge branchName # 快进合并
```

主题分支中再分出一个主题分支

```yml
 rebase --onto master server client # 取出client分支,找出它从server分支分歧后的补丁,移至maser分支,相当于client分支是基于master修改

 checkout master # 切换为master分支

 merge client # 快进合并

 rebase master server # 将server分支直接变基至master分支,省去切换server再变基操作

 checkout master # 切换为master分支

 merge server # 快进合并
```

## gitignore

**配置作用**

忽略文件，只能用于未被`git`追踪过的文件，即未被 `git add, git commit`

撤销已追踪的文件，将文件从版本控制中移除

```bash
git rm -r --cached . # .表示所有文件，也可以是文件或目录路径
```

> 配置优先级：配置规则由上至下，一旦匹配则结束

**常用通配符**

```bash
* 	# 匹配零个或多个字符
? 	# 匹配人员一个字符
**	# 匹配零个或多个目录
/		# 指定路径
!		# 不忽略某些文件、文件夹
```

**配置示例**

```bash
*.txt 				 # 匹配所有.txt文件
test?.text 		 # 匹配所有以test开头的五位字符的文件名文件
logs/**/*.log  # 匹配所有logs目录下的所有.log文件
/logs/ 				# 匹配根目录下的logs目录
logs/ 				# 匹配所有logs目录下的文件
test.log 			# 匹配根目录下test.log文件
!logs/				  # 不忽略logs目录下的文件
```

**空目录追踪**

正常情况下`git`无法追踪空目录，如果需要将空目录添加到版本控制中，则需要在该目录下创建 `.gitkeep` 文件，该文件仅起到一个占位作用，无需添加任何内容

**配置模板**

```bash
# build
dist/

# dependencies
node_modules/

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*


# environment variables
.env
.env.production


# 若在devcontainer中开发，pnpm文件会直接储存在workspace根目录
.pnpm-store

# ID
.idea
.vscode
.history
```

