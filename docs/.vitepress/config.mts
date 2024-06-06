import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/Docs-For-TUW-RE/",
  //extends: baseConfig,
  head: [ 
  ['script', { src: '/live2d.js' }],//l2d模型bug修复
  ["link", { rel: "icon", href: "https://cdn.jsdelivr.net/gh/DavidBlackCN/Docs-For-TUW@master/logo.svg" }]
],
  title: "TUW社区图书馆",
  description: "📑这是一个文档库",
  themeConfig: {
    
    blog:{
      ornateStyle:true,
      bgImg:'https://cdn.jsdelivr.net/gh/open17/Pic/img/202404020238396.png',
      bgImgDark:'https://cdn.jsdelivr.net/gh/open17/Pic/img/202405071545259.jpg'
    },

    //侧边栏文字更改(移动端)
    sidebarMenuLabel:'目录', 
    //返回顶部文字修改
    returnToTopLabel:'返回顶部', 
    //自定义上下页名
    docFooter: { 
        prev: '上一页', 
        next: '下一页', 
           }, 
    //上次更新时间
    lastUpdated: {
    text: '上次更新于',
    formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
             },
           },
    //编辑本页
    editLink: { 
    pattern: 'https://github.com/DavidBlackCN/Docs-For-TUW', 
    text: '在GitHub编辑本页'
    },
    outlineTitle: "文档目录",
    outline: [2, 6],
    label: '当前页大纲',
     // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },

    //导航栏
    nav: [
      { text: '🏠首页', link: '/' },
      { text: '🧭指南', link: '/doc/guide' },
      { text: '⬇️下载', link: '/doc/download1'},
      { text: '🗂️文档库', link: '/doc/page'},
      { text: '🏛️博客', link: '/posts'},
      { text: '🚩更多', items: [
        { text: '🥰鸣谢列表', link: '/etc/thanks'},
        { text: '🔗参考链接', link: '/etc/link'},
        { text: '📄README', link: '/README'}
      ]}
    ],

    //侧边栏
    sidebar: [
      {
        text: '引导',
        collapsed: false,
        items: [
          { text: '🧭指南', link: '/doc/guide' },
          { text: '⬇️下载处', link: '/doc/download1' },
        ]
      },
      {
        text: '文档库',
        collapsed: false,
        items: [
          { text: '📇目录', link: '/doc/page'},
          { text: '💿️备份库', link: '/doc/download2'},
          { text: '❓️常见问题解答', link: '/doc/faq' },
          { text: '🏷️常用坐标收集', link: '/doc/locations'},
          { text: '💥游戏崩溃', link: '/doc/crash'},
          { text: '🎵BGM收集', link: '/doc/bgmlist'},
          { text: '📄新人游玩攻略', link: '/doc/play'}
        ]
      },
      {
        text: '更多',
        collapsed: false,
        items: [
          { text: '🔗参考链接', link: '/etc/link'},
          { text: '🥰鸣谢列表', link: '/etc/thanks'},
          { text: '📄README', link: '/README'}
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer: 
    { 
      copyright: "UEL Creators | TUW Group | Based on VitePress",
      message: 'Released under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans">CC BY-NC-SA 4.0 License</a>.',
    },
  image: {
      // 开启图片懒加载
      lazyLoading: true
  }
},

})
