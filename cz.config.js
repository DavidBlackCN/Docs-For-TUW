/** @type {import('cz-git').UserConfig} */
export default {
  // 类型
  types: [
    {
      value: "✨ feat",
      name: "✨ feat: 新增网站功能"
    },
    {
      value: "🐛 fix",
      name: "🐛 fix: 修复网站问题"
    },
    {
      value: "📝 docs",
      name: "📝 docs: 新增或更新文章、页面"
    },
    {
      value: "🎨 style",
      name: "🎨 style: 调整样式或排版"
    },
    {
      value: "♻️ refactor",
      name: "♻️ refactor: 重构主题或脚本"
    },
    {
      value: "⚡️ perf",
      name: "⚡️ perf: 优化加载或构建性能"
    },
    {
      value: "✅ test",
      name: "✅ test: 测试相关"
    },
    {
      value: "📦 build",
      name: "📦 build: 构建、依赖或部署"
    },
    {
      value: "👷 ci",
      name: "👷 ci: CI/CD 工作流"
    },
    {
      value: "🔧 chore",
      name: "🔧 chore: 工程维护"
    }
  ],


  // scope
  scopes: [
    {
      name: "content"
    },
    {
      name: "blog"
    },
    {
      name: "docs"
    },
    {
      name: "theme"
    },
    {
      name: "components"
    },
    {
      name: "scripts"
    },
    {
      name: "deps"
    },
    {
      name: "ci"
    },
    {
      name: "repo"
    }
  ],


  // 开启emoji前缀
  enableEmoji: true,


  // emoji格式
  emojiAlign: "center",


  // subject格式
  subjectLimit: 72,


  // 提交格式
  upperCaseSubject: false,


  // 允许自定义scope
  allowCustomScopes: true,


  // 允许破坏性更新
  allowBreakingChanges: [
    "feat",
    "fix"
  ]
}
