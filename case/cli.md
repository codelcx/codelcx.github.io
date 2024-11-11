# 自定义脚手架



## 依赖安装

```bash
npm i commander inquirer ora download-git-repo
# commander：命令行构建工具
# inquirer：命令行交互工具
# ora：命令行界面显示加载动画
# download-git-repo：下载Git仓库 
```



## 自定义命令

```json
// package.json

"bin": {
  "cm-cli": "src/cli.js"
},
```



## 全局命令链接

```bash
npm link # 根目录下执行
npm ls -g # 查看是否全局链接成功
npm unlink <project-name> -g # 取消全局链接
```



## 示例代码

```js
#!/usr/bin/env node

import fs from 'node:fs'
import ora from 'ora'
import inquirer from 'inquirer'
import { program } from 'commander'
import download from 'download-git-repo'

// 文件检查
function checkFileExists(filePath) {
  const isExits = fs.existsSync(filePath)
  if (isExits) console.log(`project already exists`)
  return isExits
}

// 模板下载
async function downloadTemplate(branch, name) {
  const spinner = ora('downloading template...').start()
  await download(
    `direct:https://gitee.com/xxx/vue-template.git#${branch}`,
    name, { clone: true }
  )
  spinner.succeed('download template success')
}

const { version } = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

program.version(version)
program.command('create <project>')
  .description('create a new project')
  .option('-f,--force', 'overwrite target directory if it exists')
  .option('-t,--template <template>', 'specify a template')
  .action((project, options) => {
    const { force, template } = options

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'project name',
          default: project
        },
        {
          type: template ? 'input' : 'list',
          name: 'template',
          message: 'project template',
          choices: template ? [] : ['vue', 'react', 'angular'],
          default: template ? template : 'vue'
        },
        {
          type: 'confirm',
          name: 'isTs',
          message: 'Use TypeScript?',
          default: false
        }
      ])
      .then(async (answers) => {
        const { name, template, isTs } = answers
        const isExits = checkFileExists(name)
        if (isExits && !force) return

        await downloadTemplate(isTs ? 'ts' : 'js', name)
      })
  })

program.parse()
```

