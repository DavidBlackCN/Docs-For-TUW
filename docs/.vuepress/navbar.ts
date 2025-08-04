import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/', icon: 'material-symbols-light:bookmark-star' },
  { text: '指南', link: '/notes/docs/1-1.介绍.md',icon: 'icon-park-outline:guide-board' },
  { text: '图书馆', link: '/notes/docs/2-1.前言.md', icon: 'material-symbols-light:book-2' },
  { text: '更新日志', link: '/notes/docs/更新日志.md', icon: 'material-symbols:logo-dev-outline-rounded'},
  { 
    text: '更多',
    icon: 'mdi-import',
    items:[
      { text: '发布页', link: '/notes/docs/发布页.md', icon: 'mdi:page-previous-outline'},
      { text: '鸣谢列表', link: '/notes/docs/鸣谢列表.md', icon: 'mdi:account-heart'},
      { text: '友情链接', link: '/notes/docs/友情链接.md', icon: 'carbon:friendship' },
      { text: 'README', link: '/notes/docs/GITHUB-README.md', icon: 'material-symbols:article-outline'},
      {
        text: 'Vuepress',
        items: [
          { text: '官方文档', link: 'https://v2.vuepress.vuejs.org' },
          { text: '生态系统', link: 'https://ecosystem.vuejs.press/' },
        ]
      },
      {
        text: 'Theme Plume',
        items: [
          { text: '项目仓库', link: 'https://github.com/pengzhanbo/vuepress-theme-plume'},
          { text: '主题文档', link: 'https://theme-plume.vuejs.press/'},
        ]
      }
    ]
  }

])
