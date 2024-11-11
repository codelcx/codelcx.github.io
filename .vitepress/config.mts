import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Front Docs",
  description: "this is a front docs",
  outDir: "./docs",
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    search: {
      provider: 'local',
    },
    outline: {
      label: '文章目录',
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '基础', link: '/basic/' },
      { text: '框架', link: '/framework/' },
      { text: '工程', link: '/project/' },
      { text: '服务', link: '/service/node' },
      { text: '部署', link: '/deploy/' },
      { text: '网络', link: '/network/' },
      { text: '案例', link: '/case/' },
      { text: '试题', link: '/faq/' },
      { text: '其他', link: '/other/' },
    ],

    sidebar: {
      '/basic/': [
        { text: '数组', link: '/' },
        { text: '对象', link: '/' },
        { text: '函数', link: '/' },
        { text: '代理', link: '/' },
        { text: '异步', link: '/' },
        { text: '数据结构', link: '/' },
      ],

      '/framework': [
        {
          text: 'Vue',
          items: []
        },
        {
          text: 'React',
          items: []
        },
      ],

      '/project/': [
        {
          text: '包管理',
          items: [
            { text: 'npm', link: '/project/pkg/npm' },
          ]
        },
        {
          text: '版本管理',
          items: [
            { text: 'Git', link: '/project/ver/git' },
          ]
        },
        {
          text: '代码规范',
          items: [
            { text: 'ESLint', link: '/project/eslint/' },
            { text: 'Prettier', link: '/project/prettier/' },
          ]
        },
        {
          text: '构建工具',
          items: [
            { text: 'Babel', link: '/project/babel/' },
            { text: 'Vite', link: '/project/vite/' },
            { text: 'Webpack', link: '/project/webpack/' },
          ]
        },
        {
          text: '预处理',
          items: [
            { text: 'Sass', link: '/project/sass/' },
            { text: 'Typescript', link: '/project/typescript/' },
          ]
        }
      ],

      '/case/': [
        { text: '手写', link: '/case/handwrite/' },
        { text: '布局', link: '/case/layout/' },
        { text: '瀑布流', link: '/case/waterfall/' },
        { text: '轮播图', 'link': '/case/carousel/' },
        { text: '虚拟列表', 'link': '/case/virtualList/' },
        { text: '文件上传', 'link': '/case/fileUpload/' },
        { text: '自定义布局', 'link': '/case/customLayout/' },
        { text: '组件源码展示', 'link': '/case/component/' },
        { text: '自定义脚手架', 'link': '/case/cli/' },
      ],

      '/faq/': [
        { text: 'Vue', link: '/faq/vue' },
        { text: 'Javascript', link: '/faq/js' },
      ],

      '/service': [
        {
          text: 'Node',
          items: [
            { text: '架构设计', link: '/service/node/index' },
            { text: '模块规范', link: '/service/node/standard' },
            { text: '全局变量', link: '/service/node/global' },
            { text: '内置模块', link: '/service/node/module' },
            { text: '外置工具', link: '/service/node/util' },
          ]
        },
      ],

      '/deploy': [
        { text: 'Nginx', link: '/deploy/nginx' },
        { text: 'Docker', link: '/deploy/docker' },
      ],

      '/network':[
        { text: '子网划分', link: '/network/subnet' },
        { text: '浏览器缓存', link: '/network/cache' },
      ],

      '/other':[
        { text: '设计模式', link: '/other/design' },
        { text: '软硬连接', link: '/other/link' },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/codelcx' }
    ]
  },

  markdown: {
    lineNumbers: true
  }
})
