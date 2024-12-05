# 版本检测

检测是否有版本更新，提示用户，通过刷新界面使用最新功能

## 类型定义

```ts
// window Type extension
declare interface Window {
  buildInfo: BuildInfo
}

// git commit
declare interface CommitInfo {
  version: string
  buildUserName: string
  buildUserEmail: string
  commitBranch: string
  commitUserName: string
  commitUserEmail: string
  commitMessage: string
  commitDate: string
}

// build info 
declare interface BuildInfo {
  version: string
  buildDate: string
  versionInfo: CommitInfo
}

// vite
declare const __APP_VERSION__: BuildInfo
```



## 构建脚本

每一次打包，都将`Git`相关信息保存，以此作为版本比较的依据

```js
// buildInfo.js
import cp from 'child_process'

function execSearch(searchCommand) {
  try {
    return cp.execSync(searchCommand)
  } catch {
    return 'unknown'
  }
}
const { CI_COMMIT_BRANCH, CI_COMMIT_REF_NAME } = process.env || {}
const branchNameFromCIEnv = CI_COMMIT_BRANCH || CI_COMMIT_REF_NAME

/**
 * GIT信息
 * @returns CommitInfo
 */
export function getVersionInfo() {
  // 本地用户名
  const localUserName = 
        execSearch('git config user.name').toString().trim()
  // 本地邮箱
  const localUserEmail = 
        execSearch('git config user.email').toString().trim()
  // 用户名
  const commitUserName = 
        execSearch('git show -s --format=%cn').toString().trim()
  // 邮箱
  const commitUserEmail = 
        execSearch('git show -s --format=%ce').toString().trim()
  // 日期
  const commitDate = 
        new Date(execSearch('git show -s --format=%cd').toString())
  // 说明
  const commitMessage = 
        execSearch('git show -s --format=%s').toString().trim()
  // 版本
  const commitHash = 
        execSearch('git show --pretty=format:%H -s').toString().trim()
  // 分支
  const commitBranch = 
        execSearch('git symbolic-ref --short -q HEAD').toString().trim()

  return {
    buildUserName: localUserName,
    version: commitHash,
    buildUserEmail: localUserEmail,
    commitUserName,
    commitUserEmail,
    commitMessage,
    commitDate: commitDate.toLocaleString(),
    commitBranch: branchNameFromCIEnv || commitBranch,
  }
}

export const versionInfo = getVersionInfo()

export const buildInfo = {
  versionInfo,
  version: versionInfo.version,
  buildDate: new Date().toLocaleString(),
}
```



## 打包构建

创建vite插件，vite打包时，将构建好的版本相关信息写入到打包结果中的 `version.json` 文件

```ts
// build-version.ts
import { resolve } from 'path'
import { type Plugin } from 'vite'
import { writeFileSync } from 'fs'

export default function buildVersion(options: CommitInfo): Plugin {
  const data = {
    outputPath: '',
    buildInfo: options || {},
  }

  return {
    name: 'build-version',
    apply: 'build',
    configResolved(config) {
      data.outputPath = resolve(
        process.cwd(), config.build.outDir, 'version.json'
      )
    },
    generateBundle() {
      const versionInfo = data.buildInfo
      writeFileSync(data.outputPath, JSON.stringify(versionInfo, null, 2))
      console.log('Version info has been written to version.json')
    },
  }
}
```

使用插件并将版本信息应用到全局变量 `__APP_VERSION__`，并将其挂载到 `window`

```ts
// vite.config.ts
import buildVersion from './vite/plugins/build-version'
import { versionInfo, buildInfo } from './scripts/buildInfo'

export default defineConfig(({ command, mode }) => {
	// ...
  return {
    define: {
      __APP_VERSION__: JSON.stringify(buildInfo),
    },
    plugins: [buildVersion(versionInfo)]
  }
```

```ts
// main.ts
window.buildInfo = __APP_VERSION__
```



## 版本检测

比较服务器的版本与当前版本是否一致，不一致时触发自定义事件提示用户版本有更新

```ts
// versionCheck.ts
/**
 * 版本检测
 * @param version 当前版本信息
 * @param interval 轮询间隔(ms) 默认30s
 */
export const useVersionChecker = (version?: BuildInfo, interval?: number) => {
  const data = {
    interval: interval || 1000 * 30,
    buildDate: version?.buildDate || window.buildInfo?.buildDate || '',
  }

  // use xhr to fetch /version.json
  const checkHasUpdate = async () => {
    if (!data.buildDate) return false
    try {
      const response = await fetch('/version.json')
      const version = (await response.json()) as BuildInfo
      if (!version.buildDate) return false
      return version.buildDate !== data.buildDate
    } catch (err) {
      console.log(err)
      return false
    }
  }

  // use window event 'AppHasUpdate' to notify other components
  const notifyHasUpdate = () => {
    window.dispatchEvent(new CustomEvent('AppHasUpdate'))
  }

  // do check
  const doOneCheck = async () => {
    const hasUpdate = await checkHasUpdate()
    if (hasUpdate) notifyHasUpdate()
  }

  // setup interval to check update
  let timer: any = 0
  const setupChecking = () => {
    clearInterval(timer)
    doOneCheck()
    timer = setInterval(async () => await doOneCheck(), data.interval)
  }

  // stop checking
  const stopChecking = () => clearInterval(timer)

  return { setupChecking, stopChecking }
}
```



## 用户提示

检测到版本更新时，可通过弹窗形式提示用户，由用户决定是否更新，保证不影响用户的当前操作

```ts
import { ElMessageBox } from 'element-plus'
import { useVersionChecker } from '@/utils/versionCheck'

// version check
let wait = 0
const versionChecker = useVersionChecker()
window.addEventListener('AppHasUpdate', async () => {
  versionChecker.stopChecking()
  const res = await ElMessageBox.confirm(
    '检测到新版本，为了您能正常使用页面功能，请刷新页面完成更新！', '提示', {
    cancelButtonText: '稍后再提醒',
    confirmButtonText: '刷新页面',
    closeOnClickModal: false,
    closeOnPressEscape: false,
    showClose: false,
  }).catch(() => {})
  if (res === 'confirm') {
    location.reload()
    return
  }
  // Check again after 5 minutes
  wait = 1000 * 60 * 5
  setTimeout(() => {
    wait = 0
    versionChecker.setupChecking()
  }, wait)
})
```

