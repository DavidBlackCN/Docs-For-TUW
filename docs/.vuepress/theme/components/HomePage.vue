<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";

type HeroAction = {
  text: string;
  link?: string;
  theme?: "brand" | "alt" | "ghost" | "outline" | string;
};

type HeroConfig = {
  name?: string;
  text?: string;
  tagline?: string;
  actions?: HeroAction[];
  background?: string;
};

const props = defineProps<{
  hero?: HeroConfig;
}>();

const hero = computed(() => props.hero ?? null);
const bgImage = computed(
  () =>
    hero.value?.background ||
    "https://cdn.jsdelivr.net/gh/DavidBlackCN/Docs-For-TUW@main/docs/.vuepress/public/image/Blake.png"
);

const isExternalLink = (link?: string) =>
  typeof link === "string" && /^(https?:)?\/\//.test(link);

const bgRef = ref<HTMLElement | null>(null);
const showScrollIndicator = ref(true);

// --- 打字机效果相关 ---
const line1Text = "[世界]Blake·Wilson";
const line2Text = "加入了游戏";
const line3Text = "欢迎来到TUW社区图书馆！";

const displayLine1 = ref("");
const displayLine2 = ref("");
const showLine3 = ref(false);
const showSocialLinks = ref(false);
const line2Completed = ref(false);

// 社交链接数据（使用 Iconify 图标名）
const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/DavidBlackCN/Docs-For-TUW",
    icon: "simple-icons:github",
    hoverColor: "#ffffff",
    hoverBg: "rgba(255,255,255,0.15)",
  },
  {
    name: "QQ",
    url: "https://qm.qq.com/q/LIgHWqCH6K",
    icon: "simple-icons:qq",
    hoverColor: "#ffffff",
    hoverBg: "rgba(255,255,255,0.15)",
  },
  {
    name: "Bilibili",
    url: "https://space.bilibili.com/40074868",
    icon: "simple-icons:bilibili",
    hoverColor: "#ffffff",
    hoverBg: "rgba(255,255,255,0.15)",
  },
  {
    name: "爱发电",
    url: "https://afdian.com/a/davidblackcn",
    icon: "simple-icons:afdian",
    hoverColor: "#ffffff",
    hoverBg: "rgba(255,255,255,0.15)",
  },
  {
    name: "Email",
    url: "mailto:davidblackcn@outlook.com",
    icon: "material-symbols:mail",
    hoverColor: "#ffffff",
    hoverBg: "rgba(255,255,255,0.15)",
  },
];

const socialVisible = ref<boolean[]>(socialLinks.map(() => false));

let typingTimer: ReturnType<typeof setTimeout> | null = null;

const typeText = (
  text: string,
  target: typeof displayLine1,
  speed: number,
  onComplete?: () => void
) => {
  let index = 0;
  target.value = "";

  const tick = () => {
    if (index < text.length) {
      target.value += text[index];
      index++;
      typingTimer = setTimeout(tick, speed);
    } else {
      onComplete?.();
    }
  };
  tick();
};

const startSocialReveal = () => {
  socialLinks.forEach((_, i) => {
    setTimeout(() => {
      socialVisible.value[i] = true;
    }, i * 150);
  });
};
const line2Started = ref(false); // 新增：第二行开始打字的状态
const startTypingSequence = () => {
  typeText(line1Text, displayLine1, 80, () => {
    typingTimer = setTimeout(() => {
      line2Started.value = true; // 标记第二行开始打字
      typeText(line2Text, displayLine2, 100, () => {
        line2Completed.value = true;
        typingTimer = setTimeout(() => {
          showLine3.value = true;
          typingTimer = setTimeout(() => {
            showSocialLinks.value = true;
            startSocialReveal();
          }, 1000);
        }, 400);
      });
    }, 300);
  });
};

// --- 视差滚动 ---
const handleScroll = () => {
  const scrollTop = window.pageYOffset || 0;
  showScrollIndicator.value = scrollTop < 80;

  if (bgRef.value) {
    const movement = scrollTop * 0.45;
    bgRef.value.style.transform = `translate3d(0, ${movement}px, 0)`;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  typingTimer = setTimeout(startTypingSequence, 600);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  if (typingTimer) clearTimeout(typingTimer);
});
</script>

<template>
  <div class="homepage-container">
    <!-- 第一部分：纯背景视觉区 -->
    <section class="hero-visual">
      <div class="parallax-wrapper">
        <div
          ref="bgRef"
          class="parallax-bg"
          :style="{ backgroundImage: `url(${bgImage})` }"
        ></div>
        <div class="bottom-gradient"></div>
      </div>

      <!-- 左侧文字区域：固定高度布局，防止跳动 -->
      <div class="hero-overlay-text" aria-live="polite">

        <!-- 
          关键：使用固定高度的占位容器
          无论内容是否显示，容器尺寸始终不变，
          从而避免新行出现时把已有内容顶走
        -->
        <div class="text-block">
          <!-- 第一行占位 + 内容 -->
          <div class="line-slot line-slot--lg">
            <p class="typewriter-line">
              <span class="bracket">{{
                displayLine1.includes("]")
                  ? displayLine1.substring(0, displayLine1.indexOf("]") + 1)
                  : displayLine1.startsWith("[")
                  ? displayLine1
                  : ""
              }}</span>
              <span class="name">{{
                displayLine1.includes("]")
                  ? displayLine1.substring(displayLine1.indexOf("]") + 1)
                  : displayLine1.startsWith("[")
                  ? ""
                  : displayLine1
              }}</span>
              <span class="cursor" :class="{ hidden: displayLine2.length > 0 }">|</span>
            </p>
          </div>

          <!-- 第二行占位 + 内容 -->
          <div class="line-slot line-slot--lg">
            <p class="typewriter-line">
              {{ displayLine2
              }}<span
                class="underscore-blink"
                :class="{ active: line2Completed }"
                >_</span
              ><span
                class="cursor"
                :class="{ hidden: line2Completed || displayLine2.length === 0 }"
                >|</span
              >
            </p>
          </div>

          <!-- 第三行占位 + 内容 -->
          <div class="line-slot line-slot--sm">
            <transition name="line3-fade">
              <p v-if="showLine3" class="hero-overlay-text__sub">
                {{ line3Text }}
              </p>
            </transition>
          </div>

          <!-- 社交图标占位 + 内容 -->
          <div class="line-slot line-slot--social">
            <transition name="line3-fade">
              <div v-if="showSocialLinks" class="social-links">
                <a
                  v-for="(link, index) in socialLinks"
                  :key="link.name"
                  :href="link.url"
                  :title="link.name"
                  class="social-link"
                  :class="{ visible: socialVisible[index] }"
                  :style="{
                    '--hover-color': link.hoverColor,
                    '--hover-bg': link.hoverBg,
                  }"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon :icon="link.icon" class="social-icon" />
                </a>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- 滚动提示器 -->
      <transition name="fade">
        <div v-if="showScrollIndicator" class="scroll-down-hint">
          <span class="hint-text">向下滑动</span>
          <div class="mouse-icon">
            <div class="wheel"></div>
          </div>
        </div>
      </transition>
    </section>

    <!-- 第二部分：内容介绍区 -->
    <section id="content" class="hero-content-section">
      <div class="content-wrapper">
        <div v-if="hero" class="hero-card">
          <div class="hero-card__info">
            <p v-if="hero.name" class="hero-card__name">{{ hero.name }}</p>
            <h1 v-if="hero.text" class="hero-card__title">{{ hero.text }}</h1>
            <div class="hero-card__tagline">
              <slot name="tagline">{{ hero.tagline }}</slot>
            </div>

            <div v-if="hero.actions?.length" class="hero-card__actions">
              <template v-for="(action, index) in hero.actions" :key="index">
                <a
                  v-if="isExternalLink(action.link)"
                  :href="action.link"
                  class="vp-button"
                  :class="action.theme || 'alt'"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ action.text }}
                </a>
                <RouterLink
                  v-else-if="action.link"
                  :to="action.link"
                  class="vp-button"
                  :class="action.theme || 'alt'"
                >
                  {{ action.text }}
                </RouterLink>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.homepage-container {
  background-color: var(--vp-c-bg);
}

/* --- 第一部分：首屏视觉 --- */
.hero-visual {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.parallax-wrapper {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.parallax-bg {
  position: absolute;
  top: -15%;
  left: 0;
  width: 100%;
  height: 130%;
  background-size: cover;
  background-position: center;
  will-change: transform;
}

.bottom-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  background: linear-gradient(to bottom, transparent 0%, var(--vp-c-bg) 100%);
}

/* =====================================================
   核心修复：固定位置布局
   整个文字区域使用绝对定位锚定在左侧固定位置，
   内部每一行都有固定高度的 line-slot 占位，
   内容出现时不会影响其他行的位置。
   ===================================================== */
.hero-overlay-text {
  position: absolute;
  left: clamp(24px, 6vw, 96px);
  /* 
    使用 top 而非 transform 居中，
    配合 text-block 的固定总高度，
    确保整体视觉重心稳定
  */
  top: 50%;
  transform: translateY(-55%);
  z-index: 5;
  filter: drop-shadow(0 4px 24px rgba(0, 0, 0, 0.55));
}

/* 
  text-block：所有行的容器
  总高度 = 两个大行 + 小行 + 社交图标行
  高度固定，内容从顶部开始排列，不会因内容出现而跳动
*/
.text-block {
  display: flex;
  flex-direction: column;
  /* 不设 gap，由各 line-slot 自身高度控制间距 */
}

/* 每行的固定高度占位槽 */
.line-slot {
  position: relative;
  display: flex;
  align-items: flex-start;
  overflow: visible;
}

/* 大字行（第一、二行） */
.line-slot--lg {
  height: clamp(44px, 7vw, 88px);
  margin-bottom: 12px;
}

/* 小字行（第三行） */
.line-slot--sm {
  height: clamp(26px, 2.8vw, 34px);
  margin-top: 20px;
  margin-bottom: 0;
}

/* 社交图标行 */
.line-slot--social {
  height: 64px;
  margin-top: 28px;
}

/* --- 打字机文字样式 --- */
.typewriter-line {
  margin: 0;
  font-size: clamp(36px, 6vw, 72px);
  font-weight: 800;
  line-height: 1.2;
  color: #ffffff;
  letter-spacing: 0.02em;
  white-space: nowrap;
  /* 绝对定位在槽内，不占文档流高度 */
  position: absolute;
  top: 0;
  left: 0;
}

.bracket {
  color: var(--vp-c-brand-1);
}

.name {
  color: #ffffff;
  margin-left: 2px;
}

/* 打字光标 */
.cursor {
  display: inline-block;
  color: var(--vp-c-brand-1);
  font-weight: 300;
  margin-left: 2px;
  animation: blink 1s step-end infinite;
}

.cursor.hidden {
  opacity: 0;
  animation: none;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* 第二行末尾下划线 */
.underscore-blink {
  display: inline-block;
  color: #ffffff;
  font-weight: 800;
  opacity: 0;
}

/* 第二行开始打字后显示，静止 */
.underscore-blink--visible {
  opacity: 1;
}

.underscore-blink.active {
  animation: terminal-blink 1s step-end infinite;
}

@keyframes terminal-blink {
  0%, 60%   { opacity: 1; }
  61%, 100% { opacity: 0; }
}

/* 第三行小字 */
.hero-overlay-text__sub {
  margin: 0;
  font-size: clamp(22px, 2vw, 44px);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.08em;
  white-space: nowrap;
  position: absolute;
  top: 0;
  left: 0;
}

/* 第三行 & 社交图标渐入过渡 */
.line3-fade-enter-active {
  transition: opacity 0.9s ease, transform 0.9s ease;
}
.line3-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

/* =====================================================
   社交链接图标
   ===================================================== */
.social-links {
  display: flex;
  gap: 24px;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  color: rgba(255, 255, 255, 0.55);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(8px);
  text-decoration: none;
  /* 初始：透明 + 下移 */
  opacity: 0;
  transform: translateY(10px);
  /* 过渡：颜色、背景、边框、位移、阴影 */
  transition:
    color 0.3s ease,
    background 0.3s ease,
    border-color 0.3s ease,
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s ease,
    opacity 0.3s ease;
}

/* 渐入动画 */
.social-link.visible {
  animation: social-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes social-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 
  Hover 动效：
  - 使用 CSS 变量 --hover-color / --hover-bg 实现每个图标独立颜色
  - cubic-bezier(0.34, 1.56, 0.64, 1) 产生轻微弹跳感
  - box-shadow 增加发光效果
*/
.social-link:hover {
  color: var(--hover-color, #ffffff);
  background: var(--hover-bg, rgba(255, 255, 255, 0.15));
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-4px) scale(1.12);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

/* 点击时的按压反馈 */
.social-link:active {
  transform: translateY(-1px) scale(1.04);
  transition-duration: 0.1s;
}

.social-icon {
  width: 36px;
  height: 36px;
  /* 图标本身也跟随颜色过渡 */
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* hover 时图标轻微旋转增加活泼感 */
.social-link:hover .social-icon {
  transform: rotate(-8deg) scale(1.1);
}

/* --- 滚动提示器 --- */
.scroll-down-hint {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  color: var(--vp-c-text-2);
  pointer-events: none;
}

.hint-text {
  font-size: 11px;
  letter-spacing: 5px;
  margin-bottom: 14px;
  font-weight: 600;
  opacity: 0.8;
}

.mouse-icon {
  width: 26px;
  height: 42px;
  border: 2px solid var(--vp-c-text-3);
  border-radius: 14px;
  position: relative;
  backdrop-filter: blur(2px);
}

.wheel {
  width: 2px;
  height: 8px;
  background: var(--vp-c-brand-1);
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll-anim 1.8s infinite;
}

@keyframes scroll-anim {
  0%   { opacity: 0; transform: translate(-50%, 0); }
  30%  { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%, 18px); }
}

/* --- 第二部分：内容介绍区 --- */
.hero-content-section {
  position: relative;
  z-index: 2;
  padding: 0 24px 140px;
  margin-top: 10vh;
}

.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

.hero-card {
  padding: 64px 48px;
  border-radius: 32px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-gutter);
  box-shadow: var(--vp-shadow-4);
  text-align: center;
  backdrop-filter: blur(10px);
}

.hero-card__info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-card__name {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  letter-spacing: 0.2em;
  margin-bottom: 24px;
  font-size: 54px;
  text-transform: uppercase;
}

.hero-card__title {
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 800;
  color: var(--vp-c-text-1);
  line-height: 1.2;
  max-width: 20ch;
}

.hero-card__tagline {
  font-size: clamp(16px, 2vw, 19px);
  color: var(--vp-c-text-2);
  margin-bottom: 48px;
  line-height: 1.8;
  max-width: 600px;
}

.hero-card__actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

/* --- 按钮样式 --- */
.vp-button {
  display: inline-block;
  padding: 0 32px;
  line-height: 48px;
  border-radius: 24px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  font-size: 15px;
}

.vp-button.brand {
  background-color: var(--vp-c-brand-1);
  color: #ffffff;
}

.vp-button.brand:hover {
  background-color: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.vp-button.alt {
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-gutter);
}

.vp-button.alt:hover {
  background-color: var(--vp-c-default-2);
  transform: translateY(-2px);
}

/* --- 过渡动画 --- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px);
}

/* --- 响应式 --- */
@media (max-width: 640px) {
  .hero-overlay-text {
    left: 20px;
    top: 45%;
    transform: translateY(-50%);
  }

  .line-slot--lg {
    height: clamp(36px, 10vw, 52px);
  }

  .typewriter-line {
    font-size: clamp(28px, 8.5vw, 40px);
    white-space: normal;
  }

  .hero-overlay-text__sub {
    white-space: normal;
    font-size: 13px;
  }

  .hero-card {
    padding: 48px 24px;
  }

  .scroll-down-hint {
    bottom: 100px;
  }

  .social-links {
    gap: 10px;
  }

  .social-link {
    width: 40px;
    height: 40px;
  }

  .social-icon {
    width: 20px;
    height: 20px;
  }
}
</style>