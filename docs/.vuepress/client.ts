import { defineClientConfig } from 'vuepress/client'
import { Layout } from 'vuepress-theme-plume/client'
import { h } from 'vue'
import AsideOutlineAfter from './theme/components/AsideOutlineAfter.vue'
import Hitokoto from './theme/components/Hitokoto.vue'
import NeteaseMusicCard from './theme/components/NeteaseMusicCard.vue'
import EmptyDiv from './theme/components/EmptyDiv.vue'
import HomePage from './theme/components/HomePage.vue'
import GitHubCard from './theme/components/GitHubCard.vue'
import ColorStylePicker from './theme/components/ColorStylePicker.vue'
import ThemeAppearanceSwitch from './theme/components/ThemeAppearanceSwitch.vue'
import './theme/styles/index.css'

export default defineClientConfig({
  enhance({ app }) {
    app.component('AsideOutlineAfter', AsideOutlineAfter)
    app.component('Hitokoto', Hitokoto)
    app.component('NeteaseMusicCard', NeteaseMusicCard)
    app.component('EmptyDiv', EmptyDiv)
    app.component('HomePage', HomePage)
    app.component('GitHubCard', GitHubCard)
    app.component('ColorStylePicker', ColorStylePicker)
    app.component('ThemeAppearanceSwitch', ThemeAppearanceSwitch)
  },
  layouts: {
    Layout: () => h(Layout, null, {
      'aside-outline-after': () => h(AsideOutlineAfter),
      'nav-bar-content-after': () => h('div', { class: 'custom-nav-controls' }, [
        h(ColorStylePicker),
        h(ThemeAppearanceSwitch),
      ]),
      'nav-screen-content-after': () => h('div', { class: 'custom-nav-screen-controls' }, [
        h(ColorStylePicker),
        h(ThemeAppearanceSwitch),
      ]),
    }),
  },
})
