import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const noteDocs = defineNoteConfig({
  dir: "docs",
  link: "/docs/",
  sidebar: "auto",
});

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [noteDocs],
})

      //text: '从这里开始',
      //collapsed: false,
      //prefix: '/guide',
      //icon: 'ep:guide',
      //items: [
      //  { text: '介绍', link: '介绍'},
      //  { text: '使用', link: '使用'},
      //  { text: '下载', link: '下载'}
