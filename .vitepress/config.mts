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
      label: '页面导航',
      level: [2, 3],
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '基础', link: '/basic/array' },
      { text: '框架', link: '/framework/vue/component' },
      { text: '工程', link: '/project/npm' },
      { text: '服务', link: '/service/node' },
      { text: '部署', link: '/deploy/nginx/env' },
      { text: '网络', link: '/network/subnet' },
      { text: '案例', link: '/case/tool' },
      // { text: '试题', link: '/faq/' },
      { text: '其他', link: '/other/designMode' },
    ],

    sidebar: {
      '/basic/': [
        { text: '数组', link: '/basic/array' },
        { text: '对象', link: '/basic/object' },
        { text: '集合', link: '/basic/set' },
        { text: '函数', link: '/basic/function' },
        { text: '异步', link: '/basic/async' },
      ],

      '/framework': [
        {
          text: 'Vue',
          items: [
            { text: '认识组件', link: '/framework/vue/component' },
            { text: '语法入门', link: '/framework/vue/grammar' },
            { text: '组件通信', link: '/framework/vue/componentSignal.md' },
          ]
        },
      ],

      '/project/': [
        {
          text: '包管理',
          items: [
            { text: 'npm', link: '/project/npm' },
          ]
        },
        {
          text: '版本管理',
          items: [
            { text: 'Git', link: '/project/git' },
          ]
        },
        {
          text: '代码规范',
          items: [
            { text: 'ESLint', link: '/project/eslint' },
          ]
        },
        {
          text: '构建工具',
          items: [
            { text: 'Vite', link: '/project/vite' },
          ]
        },
        {
          text: '预处理',
          items: [
            { text: 'Typescript', link: '/project/ts' },
          ]
        }
      ],

      '/case/': [
        { text: '工具函数', link: '/case/tool' },
        // { text: '瀑布流', link: '/case/waterfall/' },
        { text: '无缝轮播', 'link': '/case/swiper' },
        // { text: '虚拟列表', 'link': '/case/virtualList/' },
        { text: '防删水印', 'link': '/case/watermark' },
        { text: '文件上传', 'link': '/case/upload' },
        { text: '开发规范', link: '/case/standard' },
        { text: '版本检测', link: '/case/version' },
        { text: '自定义脚手架', 'link': '/case/cli' },
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
        {
          text: 'Nginx',
          items: [
            { text: '环境准备', link: '/deploy/nginx/env' },
            { text: '配置指令', link: '/deploy/nginx/config' },
            { text: '静态资源', link: '/deploy/nginx/static' },
            { text: '代理服务', link: '/deploy/nginx/proxy' },
            { text: '负载均衡', link: '/deploy/nginx/loadBalance' },
            { text: '安全控制', link: '/deploy/nginx/ssl' },
            { text: '缓存服务', link: '/deploy/nginx/cache' },
            { text: '日志管理', link: '/deploy/nginx/log' },
            { text: '性能优化', link: '/deploy/nginx/optimization' },
          ]
        },
        // { text: 'Docker', link: '/deploy/docker' },
      ],

      '/network': [
        { text: '子网划分', link: '/network/subnet' },
        { text: '浏览器缓存', link: '/network/cache' },
      ],

      '/other': [
        { text: '设计模式', link: '/other/designMode' },
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
