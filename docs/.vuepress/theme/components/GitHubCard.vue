<template>
  <div class="github-card" :class="{ 'is-loading': loading, 'is-error': error }">
    <!-- 1. 加载状态：骨架屏 -->
    <div v-if="loading" class="gh-skeleton">
      <div class="gh-skeleton-header">
        <div class="gh-skeleton-avatar"></div>
        <div class="gh-skeleton-info">
          <div class="gh-skeleton-title"></div>
          <div class="gh-skeleton-text"></div>
        </div>
      </div>
      <div class="gh-skeleton-stats"></div>
    </div>

    <!-- 2. 错误状态 -->
    <div v-else-if="error" class="gh-error-message">
      <Icon name="octicon:alert-16" color="var(--vp-c-red-1)" />
      <span>{{ error }}</span>
    </div>

    <!-- 3. 正常内容 -->
    <div v-else-if="repoData" class="gh-card-content">
      <!-- 头部：头像与标题 -->
      <div class="gh-header">
        <img :src="repoData.owner.avatar_url" class="gh-avatar" alt="avatar" loading="lazy">
        <div class="gh-repo-info">
          <h3 class="gh-title">
            <a :href="repoData.html_url" target="_blank" rel="noopener">
              {{ repoData.full_name }}
            </a>
          </h3>
          <p class="gh-description">{{ repoData.description || 'No description provided.' }}</p>
        </div>
      </div>
      
      <!-- 中间：统计指标 -->
      <div class="gh-stats">
        <a :href="`${repoData.html_url}/stargazers`" target="_blank" class="gh-stat-item">
          <Icon name="octicon:star-fill-16" color="#e3b341" size="14" />
          <span class="gh-label">Stars</span>
          <span class="gh-value">{{ formatNumber(repoData.stargazers_count) }}</span>
        </a>
        
        <a :href="`${repoData.html_url}/issues`" target="_blank" class="gh-stat-item">
          <Icon name="octicon:issue-opened-16" color="#3fb950" size="14" />
          <span class="gh-label">Issues</span>
          <span class="gh-value">{{ formatNumber(repoData.open_issues_count) }}</span>
        </a>
        
        <a :href="`${repoData.html_url}/network/members`" target="_blank" class="gh-stat-item">
          <Icon name="octicon:repo-forked-16" color="#58a6ff" size="14" />
          <span class="gh-label">Forks</span>
          <span class="gh-value">{{ formatNumber(repoData.forks_count) }}</span>
        </a>

        <div v-if="repoData.license" class="gh-stat-item" @click="viewLicense">
          <Icon name="octicon:law-16" color="#bc8cff" size="14" />
          <span class="gh-value">{{ repoData.license.spdx_id }}</span>
        </div>
      </div>
      
      <!-- 底部：语言与更新时间 -->
      <div class="gh-footer">
        <div class="gh-footer-left">
          <span v-if="repoData.language" class="gh-language">
            <span class="gh-language-color" :style="{ backgroundColor: getLanguageColor(repoData.language) }"></span>
            {{ repoData.language }}
          </span>
        </div>
        <div class="gh-dates">
          <span>
            <Icon name="octicon:history-16" size="12" />
            Updated: {{ formatDate(repoData.updated_at) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  url: { type: String, required: true }
});

const repoData = ref(null);
const loading = ref(true);
const error = ref(null);

let cachedColors = null;

const parseRepoUrl = (url) => {
  if (!url) return null;
  const cleanUrl = url.replace(/\/$/, ""); 
  const match = cleanUrl.match(/github\.com\/([^/]+)\/([^/]+)/) || cleanUrl.match(/^([^/]+)\/([^/]+)$/);
  return match ? { owner: match[1], repo: match[2] } : null;
};

const fetchRepoData = async () => {
  const info = parseRepoUrl(props.url);
  if (!info) {
    error.value = "Invalid GitHub URL";
    loading.value = false;
    return;
  }
  loading.value = true;
  error.value = null;
  try {
    const [repoRes, colorRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${info.owner}/${info.repo}`),
      cachedColors 
        ? Promise.resolve(cachedColors) 
        : fetch('https://gh.llkk.cc/https://raw.githubusercontent.com/ozh/github-colors/master/colors.json').then(r => r.json())
    ]);
    if (!repoRes.ok) throw new Error(`Repo not found (${repoRes.status})`);
    cachedColors = colorRes;
    const data = await repoRes.json();
    data._colors = colorRes;
    repoData.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const getLanguageColor = (lang) => repoData.value?._colors?.[lang]?.color || '#ccc';
const formatNumber = (num) => num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num;
const formatDate = (date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

const viewLicense = () => {
  if (repoData.value) {
    window.open(`${repoData.value.html_url}/blob/${repoData.value.default_branch}/LICENSE`, '_blank');
  }
};

onMounted(fetchRepoData);
watch(() => props.url, fetchRepoData);
</script>

<style scoped>
.github-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px 16px 12px; 
  background-color: var(--vp-c-bg-soft);
  transition: all 0.25s ease;
  margin: 1rem 0;
  overflow: hidden;
  /* 强制左对齐，防止被主题居中样式影响 */
  text-align: left !important;
  box-sizing: border-box;
  font-family: "MapleMono-SemiBold";
}

.github-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.gh-header {
  display: flex !important; /* 强制使用 flex */
  align-items: center !important; 
  justify-content: flex-start !important; /* 强制靠左 */
  gap: 16px;
  margin-bottom: 8px; 
}

.gh-avatar {
  width: 56px !important; 
  height: 56px !important;
  border-radius: 10px !important;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
  /* 解决某些主题给 img 标签默认加 margin: 0 auto 的问题 */
  margin: 0 !important; 
  display: block;
}

.gh-repo-info {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left !important;
}

.gh-title {
  margin: 0 !important; /* 覆盖主题可能给 h3 加的 margin */
  font-size: 1.1rem !important;
  font-weight: 600;
  line-height: 1.3;
}

.gh-title a {
  color: var(--vp-c-brand-1) !important;
  text-decoration: none;
}

.gh-description {
  margin: 4px 0 0 !important;
  font-size: 0.92rem !important;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 统计区域 */
.gh-stats {
  display: flex !important;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0;
  justify-content: flex-start !important;
}

.gh-stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  font-size: 12px;
  text-decoration: none;
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.gh-stat-item:hover {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

/* 底部 */
.gh-footer {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 10px;
  margin-top: 4px;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.gh-language {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--vp-c-text-2);
}

.gh-language-color {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.gh-dates span {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 骨架屏 */
.gh-skeleton-header { display: flex; align-items: center; gap: 16px; }
.gh-skeleton-avatar { width: 64px; height: 64px; background: var(--vp-c-divider); border-radius: 10px; }
.gh-skeleton-title { width: 140px; height: 20px; background: var(--vp-c-divider); border-radius: 4px; margin-bottom: 8px; }
.gh-skeleton-text { width: 85%; height: 16px; background: var(--vp-c-divider); border-radius: 4px; }
</style>