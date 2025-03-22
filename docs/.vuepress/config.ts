import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import { notes } from './notes'
import { navbar } from './navbar'
//import { live2dPlugin } from 'vuepress-plugin-live2d-plus'

export default defineUserConfig({
  base: '/TUW-Docs/',
  lang: 'zh-CN',
  title: 'TUW社区图书馆',
  description: '📑这是一个图书馆',
  
  head: [
    // 配置站点图标
    ['link', { rel: 'icon', type: 'image/png', href: '/image/TUW-logo.png' }],
  ],



  bundler: viteBundler(),
  shouldPrefetch: false, // 站点较大，页面数量较多时，不建议启用

  theme: plumeTheme({
    bulletin: {
      layout: 'top-right',
      title: '欢迎来到TUW社区图书馆！',
      contentType: 'markdown', 
      content: `\
- 文档库已全面更新
- 欢迎来官方交流群做客喵w

![qrcode](/image/qrcode.jpg)
`,
    },
    notes,
    navbar,
    encrypt: {
      rules: {
        '/docs/2-7.弥赛亚全隐藏收集.md': '血色黎明',
      }
    },
  locales: {
      '/': {
        encryptButtonText: '确认',
        encryptPlaceholder: '输入密码',
        encryptPageText: '密码提示：《亡灵战争-弥赛亚》6.5章剧情的最后一句红色加粗台词。本攻略面向一周目通关玩家，如果您尚未通关至少一遍地图请不要查看。',
      }
    },

    //社交信息
    social:[
          { icon: 'github', link: 'https://github.com/DavidBlackCN/Docs-For-TUW'},
          { icon: 'qq', link: 'https://jq.qq.com/?_wv=1027&k=nA6kszKf'},
          { icon: 'bilibili', link: 'https://space.bilibili.com/40074868'},
          { icon: { svg: '<svg t="1712369779794" class="icon" viewBox="0 0 1322 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4370" width="200" height="200"><path d="M495.899049 634.906371c-17.304811 0-31.251971 13.947161-31.251971 31.251971S478.594238 697.410314 495.899049 697.410314c17.304811 0 31.251971-13.947161 31.251971-31.251972 0-17.304811-13.947161-31.251971-31.251971-31.251971zM790.855671 728.662285c-17.304811 0-31.251971 13.947161-31.251972 31.251971s13.947161 31.251971 31.251972 31.251972 31.251971-13.947161 31.251971-31.251972c0-17.04653-13.947161-30.993691-31.251971-31.251971z" fill="#98989F" p-id="4371"></path><path d="M1262.99289 719.622459c-13.430599-8.264984-28.927445-13.430599-44.68257-14.980284 34.867902-84.974368 57.080047-196.293374-18.596215-306.837537-115.193217-168.657333-280.75118-256.73107-491.766556-260.863562-60.179416-1.291404-130.948343 1.549685-205.849762 4.649054-87.040614 3.35765-203.008673 8.006703-281.526023 1.549684 15.755126-8.523265 32.543375-16.788249 47.007098-23.761829 55.530362-27.119479 98.921529-48.04022 84.457807-85.232649-7.748423-21.695583-30.218848-33.059937-67.411277-34.09306C206.624604-1.755689 37.967271 43.443443 7.748423 119.636265c-17.04653 42.874605-19.887618 125.524447 152.902206 198.876182 71.027208 30.218848 271.969635 66.894715 349.453861 74.643138 17.563091 1.549685 34.867902 5.165615 51.397871 11.364353-17.821372 11.622634-35.901025 24.02011-54.238959 36.417586-31.768533-18.079653-83.941245-39.516955-122.683358-13.172318-14.463722 9.298107-23.503549 25.053233-24.02011 42.358044-0.516562 21.179022 12.397476 42.099763 26.861198 58.629731-57.080047 45.715694-103.312302 89.881703-119.84227 123.974762-18.337934 41.841482-25.828075 110.544163 8.523265 177.438879 43.391167 84.974368 138.955046 144.120661 284.625391 176.147474 190.352916 41.583202 354.619476 4.132492 463.355674-53.205835 60.437697-32.026814 103.570583-69.994085 124.233043-103.828864 6.457019 2.066246 12.914038 4.132492 19.629338 6.198738 9.298107 2.841088 18.596214 5.682177 27.37776 8.781546 28.669164 10.072949 60.695977 8.523265 85.232649-3.61593l1.291403-0.774843c17.821372-9.039826 31.510252-25.053233 37.708991-44.166009 15.238565-51.139589-29.444006-79.033911-56.563486-96.08044z m-811.776412-239.684541l-17.30481 12.655757c-5.165615-5.165615-9.814669-11.106072-13.430599-17.563091 6.7153-2.066246 18.337934 0.258281 30.735409 4.907334zM1262.99289 798.139808c-1.291404 3.874211-4.132492 6.97358-9.298107 9.814669-10.33123 5.165615-25.569795 5.423896-39.258675 0.774842-9.298107-3.35765-19.371057-6.457019-29.444006-9.556388-18.596214-5.682177-49.848186-15.238565-55.788643-22.470426-9.814669-12.914038-28.152602-15.755126-41.32492-5.940457s-15.755126 28.152602-5.940458 41.324921c3.615931 4.390773 7.490142 8.264984 12.139196 11.622634-44.940851 62.245662-242.267348 186.220424-521.468844 125.007885-125.782728-27.636041-210.498815-77.742507-244.850155-145.412065-24.794952-48.815063-19.112776-98.921529-7.231861-126.299289 34.09306-71.027208 280.75118-234.518925 438.30244-327.241716 13.947161-8.264984 18.596214-26.344637 10.33123-40.291798s-27.119479-19.629337-40.291797-10.33123c-12.655757 7.490142-55.788643 33.059937-111.060725 68.186119-18.596214-12.655757-50.881309-27.894322-102.537459-33.059936-81.874999-8.264984-270.936512-44.42429-332.149051-70.252366C139.471608 245.418993 40.033517 196.34565 61.987381 141.073568c5.165615-12.914038 29.185725-33.576498 81.100157-53.464116 35.384463-13.430599 72.318611-22.470426 109.769321-27.119479l-11.622634 5.682176c-35.384463 17.304811-73.868296 36.417586-99.954652 59.146293-1.807965-1.033123-3.615931-2.324527-5.165615-3.874211-10.847792-11.622634-29.185725-12.397476-41.06664-1.291404l-0.516562 0.516561c-11.880915 11.106072-12.139195 29.702287-1.033123 41.583202 10.589511 11.106072 26.086356 19.371057 45.715694 25.569795 0.774842 0.258281 1.291404 0.516562 2.066246 0.774842 68.702681 21.179022 190.611197 18.596214 362.367899 11.622634 74.126577-2.841088 144.120661-5.682177 202.492111-4.649054 193.710566 3.874211 339.122631 80.841876 444.75946 235.552049 64.828469 95.047318 41.583202 188.544951 4.390773 269.903388-4.649054-3.615931-9.039826-7.748423-12.655757-12.139195-10.33123-12.397476-28.669164-14.463722-41.324921-4.649054-12.655757 10.072949-14.722003 28.669164-4.649054 41.324921 5.940457 7.490142 36.675867 42.874605 74.643138 39.775236h2.066246c1.291404-0.258281 2.324527 0 3.615931-0.258281 25.828075-4.649054 42.358044-3.615931 57.596608 6.198738 20.40418 12.914038 30.218848 20.40418 28.410883 26.861199z" fill="#98989F" p-id="4372"></path></svg>'}, link: 'https://afdian.net/a/prunus_rubrum'},
        ],
    navbarSocialInclude: ['github','qq','bilibili'],

       //注脚
       footer: { 
        copyright: 'Released under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans">CC BY-NC-SA 4.0 License</a>.',
        message: "UEL Creators | TUW Group | Site Designed by D.B.dev",
      },




    //autoFrontmatter: false,
    /* 添加您的部署域名, 有助于 SEO, 生成 sitemap */
    // hostname: 'https://your_site_url',

    /* 文档仓库配置，用于 editLink */
    // docsRepo: '',
    // docsDir: 'docs',
    // docsBranch: '',

    /* 页内信息 */
     contributors: true,
     changelog: true,

    /**
     * 博客
     * @see https://theme-plume.vuejs.press/config/basic/#blog
     */
     blog: false, // 禁用博客
    // blog: {
    //   postList: true, // 是否启用文章列表页
    //   tags: true, // 是否启用标签页
    //   archives: true, // 是否启用归档页
    //   categories: true, // 是否启用分类页
    //   postCover: 'right', // 文章封面位置
    //   pagination: 15, // 每页显示文章数量
    // },

    /* 博客文章页面链接前缀 */
    article: '/article/',

    /**
     * 编译缓存，加快编译速度
     * @see https://theme-plume.vuejs.press/config/basic/#cache
     */
    cache: 'filesystem',

    /**
     * 为 markdown 文件自动添加 frontmatter 配置
     * @see https://theme-plume.vuejs.press/config/basic/#autofrontmatter
     */
     autoFrontmatter: {
       permalink: true,  // 是否生成永久链接
       createTime: true, // 是否生成创建时间
       title: true,      // 是否生成标题
     },

    plugins: {
      git: process.env.NODE_ENV === 'production',
      /**
       * Shiki 代码高亮
       * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
       */
      // shiki: {
      //   // 强烈建议预设代码块高亮语言，插件默认加载所有语言会产生不必要的时间开销
      //   languages: ['shell', 'bash', 'typescript', 'javascript'],
      //   twoslash: true, // 启用 twoslash
      //   whitespace: true, // 启用 空格/Tab 高亮
      //   lineNumbers: true, // 启用行号
      // },

      /* 本地搜索, 默认启用 */
      // search: true,

      /**
       * Algolia DocSearch
       * 启用此搜索需要将 本地搜索 search 设置为 false
       * @see https://theme-plume.vuejs.press/config/plugins/search/#algolia-docsearch
       */
      // docsearch: {
      //   appId: '',
      //   apiKey: '',
      //   indexName: '',
      // },

      /* 文章字数统计、阅读时间，设置为 false 则禁用 */
      // readingTime: true,

      /**
       * markdown enhance
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
       */
      // markdownEnhance: {
      //   chartjs: true,
      //   echarts: true,
      //   mermaid: true,
      //   flowchart: true,
      // },

      /**
       *  markdown power
       * @see https://theme-plume.vuejs.press/config/plugin/markdown-power/
       */
       markdownPower: {
         pdf: true,         // 启用 PDF 嵌入 @[pdf](/xxx.pdf)
      //   caniuse: true,      // 启用 caniuse 语法  @[caniuse](feature_name)
      //   plot: true,         // 启用隐秘文本语法 !!xxxx!!
      //   bilibili: true,     // 启用嵌入 bilibili视频 语法 @[bilibili](bid)
      //   youtube: true,      // 启用嵌入 youtube视频 语法 @[youtube](video_id)
      //   artPlayer: true,    // 启用嵌入 artPlayer 本地视频 语法 @[artPlayer](url)
      //   audioReader: true,  // 启用嵌入音频朗读功能 语法 @[audioReader](url)
      //   icons: true,        // 启用内置图标语法  :[icon-name]:
      //   codepen: true,      // 启用嵌入 codepen 语法 @[codepen](user/slash)
      //   replit: true,       // 启用嵌入 replit 语法 @[replit](user/repl-name)
      //   codeSandbox: true,  // 启用嵌入 codeSandbox 语法 @[codeSandbox](id)
      //   jsfiddle: true,     // 启用嵌入 jsfiddle 语法 @[jsfiddle](user/id)
      //   npmTo: true,        // 启用 npm-to 容器  ::: npm-to
      //   demo: true,         // 启用 demo 容器  ::: demo
      //   repl: {             // 启用 代码演示容器
      //     go: true,         // ::: go-repl
      //     rust: true,       // ::: rust-repl
      //     kotlin: true,     // ::: kotlin-repl
         },
      //   imageSize: 'local', // 启用 自动填充 图片宽高属性，避免页面抖动
      // },

      /**
       * 在 Markdown 文件中导入其他 markdown 文件内容。
       * @see https://theme-plume.vuejs.press/guide/markdown/include/
       */
      // markdownInclude: true,

      /**
       * Markdown 数学公式
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-math/
       */
      // markdownMath: {
      //   type: 'katex',
      // },

      /**
       * 水印
       * @see https://theme-plume.vuejs.press/guide/features/watermark/
       */
      // watermark: true,

      /**
       * 评论 comments
       * @see https://theme-plume.vuejs.press/guide/features/comments/
       */
      // comment: {
      //   provider: '', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
      //   comment: true,
      //   repo: '',
      //   repoId: '',
      //   category: '',
      //   categoryId: '',
      //   mapping: 'pathname',
      //   reactionsEnabled: true,
      //   inputPosition: 'top',
      // },
    },

    /**
     * 加密功能
     * @see https://theme-plume.vuejs.press/guide/features/encryption/
     */
    // encrypt: {},
  }),
})
