---
home: true
config:
  -
    type: hero
    background: tint-plate
    full: ture
    hero:
      name: The Undead War
      tagline: MCARPG系列《亡灵战争》
      text: 📑欢迎来到TUW社区图书馆！
      actions:
        -
          theme: brand
          text: → 快速开始 ←
          link: /docs/1.从这里开始/1.介绍.md
        -
          theme: alt
          text: → 网盘下载 ←
          link: /docs/1.从这里开始/2.下载.md
        -
          theme: alt
          text: → TUW文档库 ←
          link: /docs/2.社区图书馆&文档库/1.前言.md
  -
    type: Hitokoto
  -
    type: features
    features:
      -
        title: 提醒界面：
        icon: 💡
        details: 侧卧使用手机会造成单侧眼压过高，昏暗环境下观看荧幕会加剧用眼疲劳。<br/>为了你的眼部健康，请在明亮的环境下阅读此文档并进行游戏w~
      -
        title: 许可协议：
        icon: 🚫
        details: 本文档库采用署名标示(BY) - 非商业性使用(NC) - 相同方式分享(SA) 国际许可协议CC 4.0 协议，进行许可。
        link: https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans
        linkText: CC4.0协议说明
      -
        title: 注意事项：
        icon: ❗
        details: 请确保掌握基本的语言阅读能力，电脑使用能力和MC操作后，再进行相关操作~<br/>我们无法提供任何基础能力的售后服务w~
        link: https://www.mcnav.net/
        linkText: MC导航网
  -
    type: custom
---

### 参考资料

* [vuepress](https://vuepress.vuejs.org/)
* [vuepress-theme-plume](https://theme-plume.vuejs.press/)
* [VuePress快速上手 (yiov.top)](https://vuepress.yiov.top/)
* [Live2d | 看板娘](https://github.com/oh-my-live2d/oh-my-live2d)


---

### 本地部署
开发要求：
- [Node.js](http://nodejs.org/) version 20.6.0+
- [pnpm](https://pnpm.io/zh/) version 9+

克隆代码仓库：
```sh
git clone https://github.com/DavidBlackCN/Docs-For-TUW.git
```

安装依赖：
```sh
pnpm install
```

首次启动开发服务前，先构建源代码：
```sh
pnpm build
```

启动开发服务：
```sh
pnpm docs:dev
```

### 使用

```sh
# start dev server
pnpm docs:dev
# build for production
pnpm docs:build
# preview production build in local
pnpm docs:preview
# update vuepress and theme
pnpm vp-update
```
