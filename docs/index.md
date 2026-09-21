---
home: true
config:
  - type: HomePage
    full: true
    hero:
      name: '“The Undead War”'
      text: 'MCARPG 系列《亡灵战争》'
      actions:
        - theme: brand
          text: '快速开始'
          link: /docs/介绍/
        - theme: brand
          text: '网盘下载'
          link: /docs/下载/
        - theme: alt
          text: '文档库'
          link: /docs/文档库/
        - theme: alt
          text: '亡圈文学笑话'
          link: /post/3ud6f2z5/
  - type: features
    features:
      -
        title: '提醒界面'
        icon: 'icon-park-outline:remind'
        details: '侧躺使用手机会造成单侧眼压过高，昏暗环境下观看屏幕会加剧用眼疲劳。<br/>为了你的眼部健康，请在明亮的环境下阅读此文档并进行游戏。'
      -
        title: '许可协议'
        icon: 'material-symbols:copyright-outline-rounded'
        details: '本文档库采用署名（BY）- 非商业性使用（NC）- 相同方式分享（SA）国际许可协议 CC 4.0 协议进行许可。'
        link: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans'
        linkText: 'CC 4.0 协议说明'
      -
        title: '注意事项'
        icon: 'material-symbols:favorite-outline-rounded'
        details: '请确保掌握基本的语言阅读能力、电脑使用能力和 Minecraft 操作后，再进行相关操作。<br/>我们无法提供任何基础能力的售后服务。'
        link: 'https://www.mcnav.net/'
        linkText: 'MC 导航网'
  - type: custom
---

### 参考资料

* [VuePress](https://vuepress.vuejs.org/)
* [vuepress-theme-plume](https://theme-plume.vuejs.press/)
* [VuePress 快速上手](https://vuepress.yiov.top/)
* [oh-my-live2d](https://github.com/oh-my-live2d/oh-my-live2d)

---

### 本地部署

开发要求：

- [Node.js](https://nodejs.org/) version 20.6.0+
- [pnpm](https://pnpm.io/zh/) version 9+

克隆代码仓库：

```sh
git clone https://github.com/DavidBlackCN/Docs-For-TUW.git
```

安装依赖：

```sh
pnpm install
```

启动开发服务：

```sh
pnpm docs:dev
```

构建生产版本：

```sh
pnpm docs:build
```

预览生产构建：

```sh
pnpm docs:preview
```
