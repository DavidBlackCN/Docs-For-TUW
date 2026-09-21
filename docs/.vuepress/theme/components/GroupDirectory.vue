<template>
  <section class="group-directory" :aria-labelledby="headingId">
    <header class="group-directory__header">
      <div class="group-directory__heading">
        <span class="group-directory__mark" aria-hidden="true">
          <Icon icon="octicon:multi-select-16" />
        </span>
        <div>
          <span class="group-directory__eyebrow">DIRECTORY / {{ pageItems.length.toString().padStart(2, '0') }}</span>
          <div :id="headingId" class="group-directory__title">{{ title }}</div>
        </div>
      </div>
      <p v-if="description">{{ description }}</p>
    </header>

    <div v-if="pageItems.length" class="group-directory__grid">
      <RouteLink
        v-for="(item, index) in pageItems"
        :key="item.sourcePath"
        class="group-directory__item"
        :to="item.path"
      >
        <span class="group-directory__number" aria-hidden="true">
          {{ String(index + 1).padStart(2, '0') }}
        </span>
        <span class="group-directory__icon" aria-hidden="true">
          <Icon :icon="item.icon" />
        </span>
        <span class="group-directory__content">
          <strong>{{ item.title }}</strong>
          <span v-if="showDescription" class="group-directory__summary">{{ item.description }}</span>
          <span class="group-directory__meta">
            <time v-if="item.date" :datetime="item.date">{{ formatDate(item.date) }}</time>
            <span>{{ item.wordCount }} 字</span>
          </span>
        </span>
      </RouteLink>
    </div>

    <div v-else class="group-directory__empty" role="status">
      <Icon icon="octicon:file-directory-16" aria-hidden="true" />
      <div>
        <strong>这个分组暂时没有其他页面</strong>
        <span>新增 Markdown 文件后，目录会在下次开发启动或构建时自动更新。</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, useId } from 'vue'
import { Icon } from '@iconify/vue'
import { RouteLink, usePageData } from 'vuepress/client'

const props = defineProps({
  directory: { type: String, default: '' },
  title: { type: String, default: '本组目录' },
  description: { type: String, default: '同一分组下的内容会在这里自动汇总。' },
  recursive: { type: Boolean, default: false },
  showDescription: { type: Boolean, default: true },
  sort: {
    type: String,
    default: 'name',
    validator: value => ['name', 'date'].includes(value),
  },
})

const pageData = usePageData()
const headingId = useId()

const markdownSources = import.meta.glob('../../../**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const normalizePath = value => String(value || '')
  .replace(/\\/g, '/')
  .replace(/^\.\.\/\.\.\/\.\.\//, '')
  .replace(/^docs\//, '')
  .replace(/^\/+|\/+$/g, '')

const normalizeRoute = (value) => {
  const route = String(value || '').trim()
  if (!route) return ''
  return `/${route.replace(/^\/+|\/+$/g, '')}/`
}

const parseScalar = (value) => {
  const text = value.trim()
  if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"))) {
    return text.slice(1, -1)
  }
  if (/^-?\d+(\.\d+)?$/.test(text)) return Number(text)
  if (text === 'true') return true
  if (text === 'false') return false
  return text
}

const parseDocument = (source, sourcePath) => {
  const normalizedSource = String(source || '').replace(/^\uFEFF/, '')
  const match = normalizedSource.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/)
  const frontmatter = {}

  if (match) {
    match[1].split(/\r?\n/).forEach((line) => {
      const field = line.match(/^([\w-]+):\s*(.*)$/)
      if (field) frontmatter[field[1]] = parseScalar(field[2])
    })
  }

  const body = match ? normalizedSource.slice(match[0].length) : normalizedSource
  const fileName = sourcePath.split('/').pop()?.replace(/\.md$/i, '') || 'Untitled'
  const heading = body.match(/^#\s+(.+)$/m)?.[1]
  const title = String(frontmatter.title || heading || fileName)
    .replace(/[*_`~[\]]/g, '')
    .trim()

  const plainBody = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^#{1,6}\s+.*$/gm, ' ')
    .replace(/^:::[\s\S]*?^:::/gm, ' ')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~=>|]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  const description = String(frontmatter.description || plainBody || '打开页面查看完整内容。')
    .slice(0, 92)
    .trim()

  const relativeWithoutExtension = sourcePath.replace(/\.md$/i, '')
  const fallbackRoute = /\/(README|index)$/i.test(`/${relativeWithoutExtension}`)
    ? `/${relativeWithoutExtension.replace(/\/(README|index)$/i, '')}/`
    : `/${relativeWithoutExtension}/`

  return {
    sourcePath,
    directory: sourcePath.replace(/\/[^/]+$/, ''),
    fileName,
    title,
    description: description.length >= 92 ? `${description}…` : description,
    path: normalizeRoute(frontmatter.permalink || fallbackRoute),
    date: String(frontmatter.createTime || frontmatter.date || ''),
    icon: String(frontmatter.icon || 'octicon:file-16'),
    order: Number.isFinite(frontmatter.order) ? frontmatter.order : Number.POSITIVE_INFINITY,
    wordCount: plainBody.replace(/\s/g, '').length,
  }
}

const allPages = Object.entries(markdownSources).map(([sourcePath, source]) => (
  parseDocument(source, normalizePath(sourcePath))
))

const currentSourcePath = computed(() => {
  const relativePath = normalizePath(pageData.value.filePathRelative)
  if (relativePath) return relativePath

  const currentRoute = normalizeRoute(pageData.value.path || pageData.value.frontmatter?.permalink)
  return allPages.find(item => item.path === currentRoute)?.sourcePath || ''
})

const activeDirectory = computed(() => {
  const override = normalizePath(props.directory)
  if (override) return override
  return currentSourcePath.value.replace(/\/[^/]+$/, '')
})

const pageItems = computed(() => {
  const directory = activeDirectory.value
  const currentPath = currentSourcePath.value

  if (!directory) return []

  return allPages
    .filter((item) => {
      if (item.sourcePath === currentPath) return false
      if (/^(README|index)$/i.test(item.fileName)) return false
      if (props.recursive) return item.directory === directory || item.directory.startsWith(`${directory}/`)
      return item.directory === directory
    })
    .sort((left, right) => {
      if (left.order !== right.order) return left.order - right.order
      if (props.sort === 'date') {
        const dateDifference = Date.parse(right.date) - Date.parse(left.date)
        if (Number.isFinite(dateDifference) && dateDifference !== 0) return dateDifference
      }
      return left.fileName.localeCompare(right.fileName, 'zh-CN', { numeric: true })
    })
})

const formatDate = value => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date(value))
</script>

<style scoped>
.group-directory {
  box-sizing: border-box;
  margin: 1.5rem 0;
  padding: 18px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  text-align: left;
}

.group-directory__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.group-directory__heading {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 12px;
}

.group-directory__mark,
.group-directory__icon {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-hard);
}

.group-directory__mark {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  font-size: 20px;
}

.group-directory__eyebrow {
  display: block;
  margin-bottom: 2px;
  color: var(--vp-c-text-3);
  font-family: var(--font-code);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.group-directory__title {
  margin: 0;
  color: var(--vp-c-text-1);
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.35;
}

.group-directory__header p {
  max-width: 22rem;
  margin: 0;
  color: var(--vp-c-text-3);
  font-size: 0.8125rem;
  line-height: 1.55;
  text-align: right;
}

.group-directory__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 10px;
}

.group-directory__item {
  position: relative;
  display: grid;
  min-width: 0;
  min-height: 108px;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: 12px;
  padding: 14px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: inherit;
  text-decoration: none;
  transition: border-color var(--motion-duration-fast) ease,
    background-color var(--motion-duration-fast) ease,
    transform var(--motion-duration-normal) var(--motion-ease-out);
}

.group-directory__number {
  position: absolute;
  top: 9px;
  right: 10px;
  color: var(--vp-c-text-3);
  font-family: var(--font-code);
  font-size: 0.625rem;
  line-height: 1;
}

.group-directory__icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  font-size: 17px;
  transition: color var(--motion-duration-fast) ease,
    background-color var(--motion-duration-fast) ease,
    transform var(--motion-duration-normal) var(--motion-ease-out);
}

.group-directory__content {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.group-directory__content strong {
  margin-right: 22px;
  overflow: hidden;
  color: var(--vp-c-text-1);
  font-family: var(--font-heading);
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.group-directory__summary {
  display: -webkit-box;
  min-height: 2.8em;
  margin-top: 5px;
  overflow: hidden;
  color: var(--vp-c-text-2);
  font-size: 0.8125rem;
  line-height: 1.45;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.group-directory__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 5px 12px;
  margin-top: auto;
  padding-top: 10px;
  color: var(--vp-c-text-3);
  font-family: var(--font-code);
  font-size: 0.6875rem;
  font-variant-numeric: tabular-nums;
}

.group-directory__empty {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 92px;
  padding: 16px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.group-directory__empty > svg {
  flex: 0 0 auto;
  color: var(--vp-c-brand-1);
  font-size: 24px;
}

.group-directory__empty strong,
.group-directory__empty span { display: block; }
.group-directory__empty strong { font-size: 0.9375rem; }
.group-directory__empty span { margin-top: 3px; color: var(--vp-c-text-3); font-size: 0.8125rem; }

@media (hover: hover) and (pointer: fine) {
  .group-directory__item:hover {
    border-color: var(--vp-c-brand-3);
    background: var(--vp-c-bg-safe);
    transform: translateY(-2px);
  }

  .group-directory__item:hover .group-directory__icon {
    background: var(--vp-c-brand-1);
    color: var(--vp-c-bg-safe);
    transform: translateY(-1px);
  }
}

.group-directory__item:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.group-directory__item:active { transform: scale(0.985); }

@media (max-width: 680px) {
  .group-directory { padding: 14px; }

  .group-directory__header {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }

  .group-directory__header p {
    max-width: none;
    padding-left: 50px;
    text-align: left;
  }

  .group-directory__item { min-height: 108px; }
}

@media (prefers-reduced-motion: reduce) {
  .group-directory__item,
  .group-directory__icon {
    transition: color var(--motion-duration-fast) ease,
      border-color var(--motion-duration-fast) ease,
      background-color var(--motion-duration-fast) ease;
  }
}
</style>
