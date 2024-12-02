# ESLint

https://eslint.org/docs/latest

1. **代码质量检查**：可以检查代码中的语法错误、潜在的问题和不符合编码规范的代码。例如，它可以检查未使用的变量、未关闭的括号、未定义的变量等。
2. **代码风格检查**：可以强制执行一致的代码风格。例如，它可以检查代码的缩进、空格、分号等。这有助于保持代码的一致性和可读性。
3. **代码重构**：帮助开发者进行代码重构。例如，它可以检查代码中的重复代码、冗余代码等，并给出建议的改进方法。
4. **代码审查**：帮助开发者进行代码审查。例如，它可以自动检测代码中的问题，并给出建议的改进方法。这有助于提高代码审查的效率和准确性。
5. **自动化测试**：与自动化测试工具集成，例如 Jest。这有助于自动化测试代码的质量和风格。
6. **持续集成**：与持续集成工具集成，例如 Jenkins。这有助于在代码提交和合并之前自动检查代码的质量和风格。 

## 基本配置

```shell
# 初始化配置 
npx eslint --init

# 官方推荐插件
devDependencies:
+ @eslint/js 9.16.0
+ eslint 9.16.0
+ eslint-plugin-vue 9.32.0
+ globals 15.12.0
+ typescript-eslint 8.16.0
```

```ts
// eslint.config.js
import globals from "globals"
import pluginJs from "@eslint/js"
import tsEslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },

  { languageOptions: { globals: globals.browser } },

  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],

  { 
    files: ["**/*.vue"], 
    languageOptions: { parserOptions: { parser: tsEslint.parser } } 
  },
]
```

::: tip 

eslint9采用扁平化配置，简化配置文件结构，规则冲突时后配置的优先级高

:::



## 插件推荐

[typescript-eslint](https://typescript-eslint.io/)：TS代码质量检查规则

[@stylistic/eslint-plugin](https://eslint.style/)：代码风格规则集合

[eslint-plugin-vue](https://eslint.vuejs.org/)：vue代码风格和代码质量规则

[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)：集成Prettier规则



## 基本命令

```shell
# 检测所有文件
npx eslint 	
npx eslint .
# 检测目录下所有文件
npx eslint src
npx eslint src scripts
# 检测指定文件类型
npx eslint src/**/*.ts
```

```shell
# 自动修复文件
npx eslint --fix
```

::: tip vscode：文件保存时自动修复

```json
// .vscode/settings.json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": "always"
}
```

:::



## 集Prettier

https://prettier.io/docs/en/

```js
// eslint.config.js
import prettierRecommended form 'eslint-plugin-prettier/recommended'

export default [
  // Any other config imports go at the top
  prettierRecommended,
]
```

```js
// prettier.config.js
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



## 配置示例

```js
import eslint from '@eslint/js'
import globals from 'globals'
import tsEslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default tsEslint.config(
  /** 忽略文件 */
  { ignores: ['node_modules', 'dist', 'public'] },

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

  /** 代码风格 */
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
    braceStyle: '1tbs',
    arrowParens: 'always',
  }),

  /** vue规则 */
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        /** TS项目需要 */
        parser: tsEslint.parser,
        /** 允许使用 JSX */
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // 修改默认规则 eslintPluginVue
      'vue/no-mutating-props': ['error', { shallowOnly: true },
      ],
    },
  },

  /** prettierg */
  prettierRecommended
)
```

