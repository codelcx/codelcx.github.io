

# 配置项

https://docs.github.com/zh/actions

https://docs.gitlab.com/ee/ci/yaml/



## 环境变量

::: code-group

```yaml [.gitlab-ci.yml]
CI_PROJECT_DIR：项目的根目录路径。

CI_PROJECT_NAME：项目的名称。

CI_PROJECT_PATH：项目的路径，例如 namespace/project。

CI_PROJECT_PATH_SLUG：项目的路径，例如 namespace-project。

CI_COMMIT_REF_NAME：当前提交的分支或标签名称。

CI_COMMIT_SHA：当前提交的 SHA。

CI_COMMIT_TAG：如果当前提交是一个标签，则此变量包含标签名称。

CI_COMMIT_BEFORE_SHA：合并请求的源分支的最后一个提交的 SHA.

CI_COMMIT_REF_SLUG：当前提交的分支或标签名称，转换为 URL 友好的格式。

CI_REGISTRY_IMAGE：用于构建和推送 Docker 镜像的默认注册表地址。

CI_REGISTRY_USER：用于登录到 Docker 注册表的默认用户名。

CI_REGISTRY_PASSWORD：用于登录到 Docker 注册表的默认密码
```

```yaml [.github/workflows/*.yml]
GITHUB_WORKFLOW：触发工作流的名称。

GITHUB_RUN_ID：工作流的唯一 ID。

GITHUB_RUN_NUMBER：工作流的运行编号。

GITHUB_ACTION：操作的唯一 ID。

GITHUB_ACTIONS：如果工作流在 GitHub Actions 中运行，则此变量为 true。

GITHUB_ACTOR：触发工作流的用户或服务帐户的名称。

GITHUB_REPOSITORY：仓库的所有者和仓库名称，格式为 owner/repo。

GITHUB_EVENT_NAME：触发工作流的事件名称。

GITHUB_SHA：触发工作流的提交的 SHA。

GITHUB_REF：触发工作流的分支或标签的完全引用。

GITHUB_HEAD_REF：如果工作流是由拉取请求触发的，则此变量为拉取请求的目标分支。

GITHUB_BASE_REF：如果工作流是由拉取请求触发的，则此变量为拉取请求的源分支。

GITHUB_SERVER_URL：GitHub 实例的 URL。

GITHUB_API_URL：GitHub API 的 URL。

GITHUB_GRAPHQL_URL：GitHub GraphQL API 的 URL。
```

:::

## 触发时机

::: code-group

```yaml [.gitlab-ci.yml]
# 仅仅当 master 代码发生变更时
rules:
  - if: $CI_COMMIT_REF_NAME = "master"
 
# 仅当 feature/** 分支发生变更时
rules:
  - if: $CI_COMMIT_REF_NAME =~ /feature/

# 仅当流水线触发合并请求事件时
rules:
  - if: $CI_PIPELINE_SOURCE == "merge_request_event"

# 仅当设置Tag且Tag为pilot-v开头
rules:
  - if: $CI_COMMIT_TAG && $CI_COMMIT_TAG =~ /^pilot-v.*/ 
```

```yaml [.github/workflows/*.yml]
# 仅仅当 master 代码发生变更时
on:
  push:
    branches:    
      - master
 
# 仅当 feature/** 分支发生变更时
on:
  push:
    branches:    
      - 'feature/**'
 
# 仅当提交 PR 及提交后 feature/** 分支发生变更时
on:
  pull_request:
    types:
      # 当新建了一个 PR 时
      - opened
      # 当提交 PR 的分支，未合并前并拥有新的 Commit 时
      - synchronize
    branches:    
      - 'feature/**'
 
# 每天 5:30 处理一些事情，比如清理多余的 OSS 资源
on:
  schedule:
    - cron:  '30 5 * * *'
```

:::

## 活动类型

::: code-group

```yaml [.gitlab-ci.yml]
# MR 创建和更新时触发
build:
  stage: build
  only:
    - merge_requests
```

```yaml [.github/workflows/*.yml]
# PR 创建和关闭时触发 
on:
  pull_request:
  	types: [opened, closed]
```

:::





## 定义作业

默认情况下作业是并行的，若要按顺序运行则需要定义作业之间的依赖关系

::: code-group

```yaml [.gitlab-ci.yml]
# 可复用
stages:
  - build
  - deploy 
  
build-job1:
	state: build

build-job2:
	state: build
```

```yaml [.github/workflows/*.yml]
# 唯一标识
jobs:
  build:

  deploy:
```

:::



## 作业依赖

::: code-group

```yaml [.gitlab-ci.yml]
stages:
  - build
  - deploy 
  
build-job:
	state: build

	
deploy-job:
	state: deploy
	# 依赖 build-job 需要等待其运行完成
	needs: 
		- build-job
	# 仅当依赖的作业成功时（默认）
	when: on_success
```

```yaml [.github/workflows/*.yml]
jobs:
  job1:
  job2:
  	# 依赖 job1 需要等待其运行完成并且是成功运行的（默认）
    needs: job1
    
	job3:
		# 无论job1，job2运行成功都运行job3
    if: ${{ always() }}
    needs: [job1, job2]
```

:::



## 作业变量

::: code-group

```yaml [.gitlab-ci.yml]
# 整个工作流变量
variables:
  DEPLOY_VARIABLE: "default-deploy"

workflow:
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
      variables:
       # Override globally-defined DEPLOY_VARIABLE
        DEPLOY_VARIABLE: "deploy-production"

deploy-job:
  stage: deploy
  # 仅在作业中的变量
  variables:
    DEPLOY_SITE: "https://dev.example.com/"
    REVIEW_PATH: "/review"
  environment:
  	# 可以是任何名称
    name: production
    # 部署的页面URL
    url: $DEPLOY_SITE
```

```yaml [.github/workflows/*.yml]
# 整个工作流变量
env:
	SERVER: production

on:
  workflow_dispatch:
  	inputs:
      tags:
        description: 'Test scenario tags'
        required: true
        type: string
	
jobs:
  deploy:
  	# 仅在作业中的变量
  	env:
			COMMIT_REF_NAME: ${{ github.ref_name }}
  	steps:
  		# 仅在步骤中的变量
  		env:
  			Name: STEP
  	- name: 'test'
      run: echo  The tags are ${{ inputs.tags }} 
    environment:
      # 可以是任何名称
      name: production
      # 部署的页面URL
      url: https://example.com
```

:::



## Script

::: code-group

```yaml [.gitlab-ci.yml]
build_job:
  stage: build
  # script 运行前（可放在所有工作外），用于测试代码、版本检查..
  before_script:
    - echo "Execute this command before any 'script:' commands."
  script:
    - npm install
    - npm run docs:build
  # script 运行后（可放在所有工作外），用于清理缓存、临时文件..
  after_script:
	 - echo "Execute this command after the `script` section completes."
  artifacts:
    paths:
      - docs/
     
 deploy:
 	script:
 		# 自定义脚本
    - node ./scripts/publish.mjs
```

```yaml [.github/workflows/*.yml]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    	# 切换分支，拉取最新代码
      - name: Checkout
        uses: actions/checkout@v4
			
		  # 无内置Node环境，需要指定Node版本
      - name: Setup Node
        uses: actions/setup-node@v4
        # 输入的参数
        with:
          node-version: 18

      - name: Install Dependencies
        run: npm install

      - name: Build VitPress
        run: npm run docs:build

      - name: Upload Artifacts
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs
	
	deploy:
		runs-on: ubuntu-latest
		steps:
		- name: Deploy
			run: node ./scripts/publish.mjs
		
```

:::



## Cache

::: code-group

```yaml [.gitlab-ci.yml]
# 可放至全局或作业内
cache:
	key:
		# files文件更改时更新缓存
		files:
			- package-lock.json
		# 将前缀与 files 计算的哈希值组合在一起
		prefix: $CI_COMMIT_REF_NAME
	paths:
	
```

```yaml [.github/workflows/*.yml]
build-with-cache:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node
        uses: actions/setup-node@v1
        with:
          node-version: 14.x
      - name: Cache Node Modules
        # 为 step 设置 id，可通过 steps.[id].outputs 获取到该步骤的值
        # 在往下两步，安装依赖时，将有用到
        id: cache-node-modules
        # 使用 cache action 进行目录资源缓存
        uses: actions/cache@v2
        with:
          # 对 node_modules 目录进行缓存
          path: node_modules
          # 根据字段 node-modules- 与 yarn.lock 的 hash 值作为 key
          # 当 yarn.lock 内容未发生更改时，key 将不会更改，则命中缓存
          # 如果使用 npm 作为包管理工具，则是 package-lock.json
          key: node-modules-${{ hashFiles('yarn.lock') }}
          restore-keys: node-modules-
      
      # 查看缓存是否设置成功，输出 node_modules 目录
      - name: Check Install/Build Cache
        run: ls -lah node_modules | head -5

      - name: Install Dependencies
        # 如果命中 key，则直接跳过依赖安装
        if: steps.cache-node-modules.outputs.cache-hit != 'true'
        run: yarn
      - name: Build Dependencies
        run: npm run build
```

:::





## Runner

::: code-group

```yaml [.gitlab-ci.yml]
deploy:
  stage: build
  # runner可以指定任意标签，只有满足指定标签的runner才能运行作业
  tags:
    - shell
    - rsync
```

```yaml [.github/workflows/*.yml]
jobs:
	build:
		# 默认 Runner
		runs-on: unbuntu-latest
  deploy:
    # 自建 Runner
    runs-on: self-hosted
  test:
  	# 多个 Runner 同时运行
  	runs-on: [self-hosted, unbuntu-latest]
```

:::



