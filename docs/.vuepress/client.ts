import { defineClientConfig } from 'vuepress/client'
import { Layout } from 'vuepress-theme-plume/client'
import { h } from 'vue'
import AsideOutlineAfter from './theme/components/AsideOutlineAfter.vue'
import Hitokoto from './theme/components/Hitokoto.vue'
import NeteaseMusicCard from './theme/components/NeteaseMusicCard.vue'
import EmptyDiv from './theme/components/EmptyDiv.vue'
import './theme/styles/index.css'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'

// import CustomComponent from './theme/components/Custom.vue'

// import './theme/styles/custom.css'

export default defineClientConfig({
  enhance({ app }) {
    app.component('AsideOutlineAfter', AsideOutlineAfter)
    app.component('Hitokoto', Hitokoto)
    app.component('NeteaseMusicCard', NeteaseMusicCard)
    app.component('EmptyDiv', EmptyDiv)
    // built-in components
    // app.component('RepoCard', RepoCard)
    // app.component('NpmBadge', NpmBadge)
    // app.component('NpmBadgeGroup', NpmBadgeGroup)
    // app.component('Swiper', Swiper) // you should install `swiper`

    // your custom components
    // app.component('CustomComponent', CustomComponent)
  },

  layouts: {
    Layout: () => h(Layout, null, {
      'aside-outline-after': () => h(AsideOutlineAfter),
    }
  ),
  },
})
