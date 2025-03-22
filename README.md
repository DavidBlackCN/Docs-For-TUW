## Minecraft RPG系列《亡灵战争》社区图书馆&文档库

[TUW社区图书馆&文档库 (docs-for-tuw.vercel.app)](https://docs-for-tuw.vercel.app/)

本站点使用 [vuepress](https://vuepress.vuejs.org/) & [vuepress-theme-plume](https://github.com/pengzhanbo/vuepress-theme-plume) 进行搭建。

---


### 使用的技术栈

<p> 
    <img src="https://img.shields.io/badge/-Vue3-C0C0C0?logo=Vue.js&logoColor=4FC08D" alt="Vue3" style="display: inline-block;" /> 
    <img src="https://img.shields.io/badge/-TypeScript-C0C0C0?logo=TypeScript&logoColor=3178C6" alt="TypeScript" style="display: inline-block;" /> 
    <img src="https://img.shields.io/badge/-Node.js-D3D3D3?logo=Node.js&logoColor=339933" alt="Node.js" style="display: inline-block;" /> 
    <img src="https://img.shields.io/badge/-Vite-D3D3D3?logo=Vite&logoColor=646CFF" alt="Vite" style="display: inline-block;" /> 
    <img src="https://img.shields.io/badge/-NPM-C0C0C0?logo=npm&logoColor=CB3837" alt="NPM" style="display: inline-block;" /> 
    <img src="https://img.shields.io/badge/-CSS3-A9A9A9?logo=CSS3&logoColor=1572B6" alt="CSS3" style="display: inline-block;" /> 
    <img src="https://img.shields.io/badge/-Markdown-000?logo=Markdown&logoColor=FFF" alt="Markdown" style="display: inline-block;" /> 
</p>

---

### 参考资料

* [vuepress](https://vuepress.vuejs.org/)
* [vuepress-theme-plume](https://theme-plume.vuejs.press/)
* [VuePress快速上手 (yiov.top)](https://vuepress.yiov.top/)
* [Live2d | 看板娘](https://github.com/xinlei3166/vuepress-plugin-live2d-plus)


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


