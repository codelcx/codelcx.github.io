# 开发规范



## 依赖安装

代码检查 `eslint.config.js`

```shell
npm i eslint -D
npx eslint --init
```

代码格式化 `prettier.config.js`

```shell
npm i prettier eslint-config-prettier eslint-plugin-prettier -D
```

 [husky](https://typicode.github.io/husky/get-started.html)   管理和执行 `Git Hooks` 

```shell
npm i husky -D
```

[lint-staged ](https://github.com/lint-staged/lint-staged)  本地暂存区代码检查和修复

```shell
npm i lint-staged -D
```

 [commitlint](https://commitlint.js.org/guides/getting-started.html)  提交信息校验

```shell
npm i  @commitlint/config-conventional @commitlint/cli -D

# @commitlint/cli 命令行界面
# @commitlint/config-conventional 遵循Angular提交规范
```

[commitizen](https://github.com/commitizen/cz-cli)：命令行界面交互

```shell
npm i commitizen @commitlint/cz-commitlint @commitlint/types -D
# @commitlint/cz-commitlint commitlint适配器
#  @commitlint/types commitlint类型文件
```



## 配置钩子

```shell
npx husky init
# creates a pre-commit script in .husky/ and 
# updates the prepare script in package.json 
```

pre-commit

```shell
npx lint-staged
```

commit-msg

```shell
npx --no-install commitlint --edit "$1"
# read last commit message from the specified file or
# fallbacks to ./.git/COMMIT_EDITMSG 
# $1:.git/COMMIT_EDITMSG 
```

::: tip

可自定义脚本，在钩子中执行，如 `node scripts/verify-commit.js`

:::



## 配置文件

**eslint.config.js**

```js
import eslint from '@eslint/js'
import globals from 'globals'
import tsEslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default tsEslint.config(
  /** 忽略文件 */
  { ignores: ['node_modules', 'dist', 'public'，'*.config.{js,ts,mjs,cjs}'] },

  /** 检查文件 */
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },

  // 全局变量
  { languageOptions: { globals: globals.browser } },

  /** js推荐配置 */
  eslint.configs.recommended,
  /** ts推荐配置 */
  ...tsEslint.configs.recommended,
  /** vue推荐配置 */
  ...pluginVue.configs['flat/recommended'],

  /** prettierg */
  prettierRecommended
)
```

**prettier.config.js**

```js
/** @type {import("prettier").Config} */
export default {
  trailingComma: 'all',
  singleQuote: true,
  semi: false,
  printWidth: 80,
  arrowParens: 'always',
  proseWrap: 'always',
  endOfLine: 'lf',
  experimentalTernaries: false,
  tabWidth: 2,
  useTabs: false,
  quoteProps: 'consistent',
  jsxSingleQuote: false,
  bracketSpacing: true,
  bracketSameLine: false,
  jsxBracketSameLine: false,
  vueIndentScriptAndStyle: false,
  singleAttributePerLine: false,
}
```

**commitlint.config.js**

```js
/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: { ... } // 自定义规则，会覆盖j的规则 
}
```

```json
// 规则格式
// name: 规则名
// p1: 规则错误级别 0禁用 1警告 2错误
// p2: 规则适用范围 alaway never only
// p3: 规则值，值必须是其中一个，可以说字符串，正则表达式、数组、函数
name: [p1, p2, p3]
```



.**lintstagedrc.json**

```json
{
  "*.{js,jsx,ts,tsx,vue}": "eslint --fix"
}
```



## 命令交互

```json
// package.json
"scripts": {
  "commit": "git-cz"
},
"config": {
  "commitizen": {
    "path": "@commitlint/cz-commitlint"
  }
},
```

```shell
npx git-cz
npm run commit
```

