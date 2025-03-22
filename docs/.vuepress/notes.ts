import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const demoNote = defineNoteConfig({
  dir: 'docs',
  link: '/docs/',
  sidebar: [
    {
      text: 'Ⅰ- 从这里开始',
      icon: 'mdi-compass-outline',
      collapsed: false,
      items: ['1-1.介绍','1-2.下载','1-3.使用指南','1-4.答疑','1-5.交流群'],

    },
    {
      text: 'Ⅱ- 社区图书馆&文档库',
      icon: 'material-symbols-light:book-2',
      items: ['2-1.前言','2-2.常见问题解答','2-3.常用坐标收集','2-4.解决游戏崩溃','2-5.新人游玩攻略','2-6.背景设定','2-7.弥赛亚全隐藏收集','2-8.弥赛亚V1.5.0剧情文案','2-9.更多背景资料','2-10.BGM收集'],
      collapsed: false,
    },
    {
      text: 'Ⅲ- (旧版)文档库留档',
      icon: 'material-symbols:folder-zip-outline',
      items: ['3-1.目录','3-2.备份库','3-3.常见问题解答','3-4.常用坐标收集','3-5.游戏崩溃','3-6.BGM收集','3-7.新人游玩攻略'],
      collapsed: false
    },
    {
      text: 'Ⅳ- 更多',
      icon: 'mdi-import',
      items: ['鸣谢列表','友情链接','GITHUB-README','更新日志'],
      collapsed: false
    }
  ]
    
  
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [demoNote],
})

      //text: '从这里开始',
      //collapsed: false,
      //prefix: '/guide',
      //icon: 'ep:guide',
      //items: [
      //  { text: '介绍', link: '介绍'},
      //  { text: '使用', link: '使用'},
      //  { text: '下载', link: '下载'}
