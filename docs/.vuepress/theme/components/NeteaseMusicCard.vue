<template>
  <div class="nm-card" :class="{ 'is-loading': loading, 'is-error': error }">
    <!-- 1. 加载状态 -->
    <div v-if="loading" class="nm-skeleton">
      <div class="nm-skeleton-content">
        <div class="nm-skeleton-cover"></div>
        <div class="nm-skeleton-info">
          <div class="nm-skeleton-title"></div>
          <div class="nm-skeleton-text"></div>
        </div>
      </div>
    </div>

    <!-- 2. 错误状态 -->
    <div v-else-if="error" class="nm-error-message">
      <Icon name="octicon:alert-16" />
      <span>{{ error }}</span>
    </div>

    <!-- 3. 正常内容 -->
    <div v-else-if="playlistData" class="nm-card-content">
      <!-- 右上角网易云 Logo -->
      <div class="nm-brand-logo" @click="openNetease">
        <Icon name="simple-icons:neteasecloudmusic" size="18" color="#e03f3c" />
      </div>

      <div class="nm-main">
        <!-- 左侧：封面 -->
        <div class="nm-cover-wrapper" @click="openNetease">
          <img :src="playlistData.coverImgUrl + '?param=200y200'" class="nm-cover" loading="lazy">
          <div class="nm-play-count">
            <Icon name="ic:baseline-play-arrow" size="12" />
            <span>{{ formatNumber(playlistData.playCount) }}</span>
          </div>
          <div class="nm-play-btn">
            <Icon name="ic:baseline-play-circle-filled" size="30" color="#e03f3c" />
          </div>
        </div>

        <!-- 右侧：详情 -->
        <div class="nm-info">
          <div class="nm-title-row">
            <h3 class="nm-title" @click="openNetease">{{ playlistData.name }}</h3>
          </div>

          <div class="nm-meta">
            <img :src="playlistData.creator?.avatarUrl + '?param=30y30'" class="nm-creator-avatar">
            <span class="nm-artist">{{ playlistData.creator?.nickname }}</span>
            <span class="nm-dot">·</span>
            <span class="nm-album">{{ playlistData.trackCount }} 首歌曲</span>
          </div>

          <div v-if="playlistData.description" class="nm-desc-box">
            <p class="nm-desc-text">{{ playlistData.description }}</p>
          </div>
        </div>
      </div>

      <!-- 底部统计与评论 -->
      <div class="nm-footer">
        <div class="nm-stats">
          <div class="nm-stat-item highlight">
             <Icon name="ic:outline-mode-comment" size="14" />
             <span>{{ formatNumber(playlistData.commentCount) }} 评论</span>
          </div>
          <div class="nm-stat-item">
             <Icon name="ic:outline-share" size="14" />
             <span>{{ formatNumber(playlistData.shareCount) }} 分享</span>
          </div>
          <div v-if="createTime" class="nm-stat-item">
             <Icon name="ic:outline-calendar-month" size="14" />
             <span>{{ createTime }} 创建</span>
          </div>
        </div>
        
        <div v-if="hotComment" class="nm-hot-comment">
          <img :src="hotComment.user.avatarUrl + '?param=60y60'" class="comment-avatar">
          <div class="comment-text-group">
            <div class="comment-user">{{ hotComment.user.nickname }}</div>
            <div class="comment-content">{{ hotComment.content }}</div>
          </div>
        </div>
      </div>

      <!-- 新增：歌曲列表折叠部分 -->
      <div class="nm-list-container">
        <button class="nm-list-trigger" @click="showList = !showList">
          <span>{{ showList ? '收起歌单列表' : '展开歌曲列表' }}</span>
          <Icon :name="showList ? 'ic:baseline-keyboard-arrow-up' : 'ic:baseline-keyboard-arrow-down'" size="20" />
        </button>

        <Transition name="slide-fade">
          <div v-if="showList" class="nm-track-list">
            <div 
              v-for="(track, index) in playlistData.tracks.slice(0, 100)" 
              :key="track.id" 
              class="nm-track-item"
              @click="openTrack(track.id)"
            >
              <span class="track-index">{{ index + 1 }}</span>
              <div class="track-info">
                <span class="track-name">{{ track.name }}</span>
                <span class="track-artist">- {{ formatArtists(track.ar) }}</span>
              </div>
              <Icon name="ic:outline-play-arrow" size="16" class="track-play-icon" />
            </div>
            <div v-if="playlistData.tracks.length > 30" class="track-more-tip">
              更多内容请前往网易云音乐查看...
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
  id: { type: String, required: true },
  baseUrl: { type: String, default: 'https://api.neteasemusic.davidblackcn.online/' } 
});

const playlistData = ref(null);
const hotComment = ref(null);
const loading = ref(true);
const error = ref(null);
const showList = ref(false); // 控制列表显示

const fetchAllData = async () => {
  const playlistId = props.id.toString().match(/\d+/)?.[0];
  if (!playlistId) {
    error.value = "歌单 ID 格式错误";
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const apiBase = props.baseUrl.replace(/\/$/, '');
    const [detailRes, commentRes] = await Promise.all([
      fetch(`${apiBase}/playlist/detail?id=${playlistId}`),
      fetch(`${apiBase}/comment/playlist?id=${playlistId}&limit=1`)
    ]);

    const detailRaw = await detailRes.json();
    const commentData = await commentRes.json();

    if (!detailRaw.playlist) throw new Error("未找到歌单");

    playlistData.value = detailRaw.playlist;

    if (commentData.hotComments?.length > 0) {
      hotComment.value = commentData.hotComments[0];
    } else if (commentData.comments?.length > 0) {
       hotComment.value = commentData.comments[0];
    }
  } catch (err) {
    error.value = `加载失败: ${err.message}`;
  } finally {
    loading.value = false;
  }
};

const formatArtists = (ar) => ar ? ar.map(a => a.name).join('/') : '未知歌手';
const formatNumber = (num) => {
  if (!num || num <= 0) return 0;
  if (num >= 100000000) return (num / 100000000).toFixed(1) + '亿';
  if (num >= 10000) return (num / 10000).toFixed(1) + '万';
  return num;
};

const createTime = computed(() => {
  if (!playlistData.value?.createTime) return null;
  return new Date(playlistData.value.createTime).getFullYear();
});

const openNetease = () => {
  if (playlistData.value) window.open(`https://music.163.com/#/playlist?id=${playlistData.value.id}`, '_blank');
};

const openTrack = (id) => {
  window.open(`https://music.163.com/#/song?id=${id}`, '_blank');
};

onMounted(fetchAllData);
watch(() => props.id, fetchAllData);
</script>

<style scoped>
/* 原有样式保持不变... */
.nm-card {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 16px;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.3s;
  margin: 1.5rem 0;
  text-align: left !important;
}
.nm-card:hover { border-color: #e03f3c; box-shadow: 0 8px 24px rgba(224,63,60,0.12); }
.nm-brand-logo { position: absolute; top: 14px; right: 14px; opacity: 0.6; cursor: pointer; transition: opacity 0.3s; z-index: 10; }
.nm-brand-logo:hover { opacity: 1; }
.nm-main { display: flex !important; align-items: flex-start !important; gap: 16px; margin-right: 20px; }
.nm-cover-wrapper { position: relative; width: 100px; height: 100px; flex-shrink: 0; border-radius: 10px; overflow: hidden; cursor: pointer; line-height: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.nm-cover { width: 100px !important; height: 100px !important; object-fit: cover; display: block !important; margin: 0 !important; }
.nm-play-count { position: absolute; top: 4px; right: 6px; color: #fff; font-size: 10px; display: flex; align-items: center; gap: 2px; text-shadow: 0 1px 2px rgba(0,0,0,0.8); z-index: 2; }
.nm-play-btn { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.15); opacity: 0; transition: opacity 0.3s; }
.nm-card:hover .nm-play-btn { opacity: 1; }
.nm-info { flex: 1; min-width: 0; }
.nm-title { margin: 0 !important; font-size: 1.1rem !important; font-weight: 700; color: var(--vp-c-text-1); line-height: 1.4; }
.nm-meta { display: flex; align-items: center; font-size: 0.85rem; color: var(--vp-c-text-2); margin-top: 4px; margin-bottom: 8px; gap: 6px; }
.nm-creator-avatar { width: 18px !important; height: 18px !important; border-radius: 50% !important; margin: 0 !important; }
.nm-desc-box { background: var(--vp-c-default-soft); padding: 6px 10px; border-radius: 6px; border-left: 3px solid #e03f3c; }
.nm-desc-text { margin: 0 !important; font-size: 0.8rem; color: var(--vp-c-text-2); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.5; }
.nm-footer { margin-top: 14px; border-top: 1px solid var(--vp-c-divider); padding-top: 12px; }
.nm-stats { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 12px; }
.nm-stat-item { display: flex; align-items: center; gap: 4px; font-size: 11px; color: var(--vp-c-text-3); }
.nm-stat-item.highlight { color: #e03f3c; }
.nm-hot-comment { display: flex !important; align-items: center !important; gap: 12px; background: var(--vp-c-bg-alt); padding: 8px 12px; border-radius: 10px; }
.comment-avatar { width: 32px !important; height: 32px !important; border-radius: 50% !important; margin: 0 !important; }
.comment-text-group { flex: 1; min-width: 0; }
.comment-user { font-size: 11px; font-weight: 600; color: var(--vp-c-text-2); }
.comment-content { font-size: 12px; color: var(--vp-c-text-1); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* --- 新增：列表部分样式 --- */
.nm-list-container {
  margin-top: 12px;
}

.nm-list-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px;
  background: var(--vp-c-default-soft);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.nm-list-trigger:hover {
  background: var(--vp-c-divider);
  color: #e03f3c;
}

.nm-track-list {
  margin-top: 8px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-alt);
  max-height: 300px;
  overflow-y: auto;
}

/* 自定义滚动条风格 */
.nm-track-list::-webkit-scrollbar { width: 4px; }
.nm-track-list::-webkit-scrollbar-thumb { background: var(--vp-c-divider); border-radius: 10px; }

.nm-track-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid var(--vp-c-divider);
}

.nm-track-item:last-child { border-bottom: none; }
.nm-track-item:hover { background: var(--vp-c-default-soft); }

.track-index {
  width: 24px;
  font-size: 11px;
  color: var(--vp-c-text-3);
  font-family: monospace;
}

.track-info {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.track-name {
  font-size: 13px;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.track-artist {
  font-size: 11px;
  color: var(--vp-c-text-3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.track-play-icon {
  margin-left: 8px;
  opacity: 0;
  color: #e03f3c;
  transition: opacity 0.2s;
}
.nm-track-item:hover .track-play-icon { opacity: 1; }

.track-more-tip {
  padding: 10px;
  text-align: center;
  font-size: 11px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
}

/* 动效 */
.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.3s ease; }
.slide-fade-enter-from, .slide-fade-leave-to { opacity: 0; transform: translateY(-10px); }
</style>