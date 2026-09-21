<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

type HeroAction = { text: string; link?: string; theme?: string }
type HeroConfig = { name?: string; text?: string; tagline?: string; actions?: HeroAction[]; background?: string }

const props = defineProps<{ hero?: HeroConfig }>()
const hero = computed(() => props.hero ?? {})
const bgImage = computed(() => hero.value.background || '/image/Blake.png')
const line1Text = '[世界]Blake·Wilson'
const line2Text = '加入了游戏'
const line3Text = '欢迎来到 TUW 社区图书馆！'
const displayLine1 = ref('')
const displayLine2 = ref('')
const showLine3 = ref(false)
const showActions = ref(false)
const showSocialLinks = ref(false)
const showScrollIndicator = ref(true)
const line2Completed = ref(false)
const bgRef = ref<HTMLElement | null>(null)
const socialVisible = ref<boolean[]>([])
let timers: ReturnType<typeof setTimeout>[] = []

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/DavidBlackCN/Docs-For-TUW', icon: 'simple-icons:github' },
  { name: 'QQ', url: 'https://qm.qq.com/q/LIgHWqCH6K', icon: 'simple-icons:qq' },
  { name: 'Bilibili', url: 'https://space.bilibili.com/40074868', icon: 'simple-icons:bilibili' },
  { name: '爱发电', url: 'https://afdian.com/a/davidblackcn', icon: 'simple-icons:afdian' },
  { name: 'Email', url: 'mailto:davidblackcn@outlook.com', icon: 'material-symbols:mail-outline' },
]
const isExternalLink = (link?: string) => Boolean(link && /^(https?:)?\/\//.test(link))

function schedule(callback: () => void, delay: number) {
  const timer = setTimeout(callback, delay)
  timers.push(timer)
}

function typeText(text: string, target: typeof displayLine1, speed: number, done?: () => void) {
  let index = 0
  target.value = ''
  const tick = () => {
    if (index < text.length) {
      target.value += text[index++]
      schedule(tick, speed)
    } else done?.()
  }
  tick()
}

function startSocialReveal() {
  socialVisible.value = socialLinks.map(() => false)
  socialLinks.forEach((_, index) => schedule(() => { socialVisible.value[index] = true }, index * 55))
}

function startTypingSequence() {
  typeText(line1Text, displayLine1, 42, () => schedule(() => typeText(line2Text, displayLine2, 48, () => {
    line2Completed.value = true
    schedule(() => {
      showLine3.value = true
      schedule(() => {
        showActions.value = true
        schedule(() => { showSocialLinks.value = true; startSocialReveal() }, 620)
      }, 520)
    }, 260)
  }), 110))
}

function handleScroll() {
  const scrollTop = window.scrollY || 0
  showScrollIndicator.value = scrollTop < 80
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  schedule(startTypingSequence, 180)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  timers.forEach(clearTimeout)
  timers = []
})
</script>

<template>
  <div class="homepage-container">
    <section class="hero-visual" aria-label="TUW 社区图书馆首页">
      <div class="parallax-wrapper" aria-hidden="true">
        <div ref="bgRef" class="parallax-bg" :style="{ backgroundImage: `url(${bgImage})` }"></div>
        <div class="hero-shade"></div>
      </div>
      <div class="hero-overlay-text" aria-live="polite">
        <div class="hero-copy">
          <div v-if="hero.name || hero.text" class="hero-identity" aria-label="作品信息">
            <p v-if="hero.name" class="hero-identity__name">{{ hero.name }}</p>
            <p v-if="hero.text" class="hero-identity__text">{{ hero.text }}</p>
          </div>
          <p class="typewriter-line typewriter-line--primary"><span class="bracket">{{ displayLine1.includes(']') ? displayLine1.slice(0, displayLine1.indexOf(']') + 1) : (displayLine1.startsWith('[') ? displayLine1 : '') }}</span><span class="name">{{ displayLine1.includes(']') ? displayLine1.slice(displayLine1.indexOf(']') + 1) : (displayLine1.startsWith('[') ? '' : displayLine1) }}</span><span class="cursor" :class="{ hidden: displayLine2.length > 0 }">|</span></p>
          <p class="typewriter-line typewriter-line--secondary">{{ displayLine2 }}<span class="underscore-blink" :class="{ active: line2Completed }">_</span><span class="cursor" :class="{ hidden: line2Completed || !displayLine2 }">|</span></p>
          <transition name="quick-fade"><p v-if="showLine3" class="hero-subtitle">{{ line3Text }}</p></transition>
          <div v-if="hero.actions?.length && showActions" class="hero-actions">
            <template v-for="(action, index) in hero.actions" :key="index">
              <a v-if="isExternalLink(action.link)" :href="action.link" class="vp-button" :class="action.theme || 'alt'" :style="{ '--button-delay': `${index * 120}ms` }" target="_blank" rel="noopener noreferrer">{{ action.text }}</a>
              <RouterLink v-else-if="action.link" :to="action.link" class="vp-button" :class="action.theme || 'alt'" :style="{ '--button-delay': `${index * 120}ms` }">{{ action.text }}</RouterLink>
            </template>
          </div>
          <transition name="quick-fade"><div v-if="showSocialLinks" class="social-links" aria-label="社交链接">
            <a v-for="(link, index) in socialLinks" :key="link.name" :href="link.url" :title="link.name" class="social-link" :class="{ visible: socialVisible[index] }" target="_blank" rel="noopener noreferrer"><Icon :icon="link.icon" class="social-icon" /><span class="sr-only">{{ link.name }}</span></a>
          </div></transition>
        </div>
      </div>
      <transition name="quick-fade"><div v-if="showScrollIndicator" class="scroll-down-hint" aria-hidden="true"><span class="hint-text">向下滚动</span><span class="mouse-icon"><span class="wheel"></span></span></div></transition>
    </section>
  </div>
</template>

<style scoped>
.homepage-container { background: var(--vp-c-bg); }
.hero-visual { position: relative; min-height: min(900px, 100svh); height: 100svh; overflow: hidden; isolation: isolate; view-transition-name: home-hero-media; }
.parallax-wrapper, .parallax-bg, .hero-shade { position: absolute; inset: 0; }
.parallax-wrapper { z-index: -1; overflow: hidden; background: #1b1c1f; }
.parallax-bg { inset: -8%; background-position: center 38%; background-repeat: no-repeat; background-size: cover; will-change: transform; }
.hero-shade { background: linear-gradient(90deg, rgba(11, 15, 18, .76), rgba(11, 15, 18, .42) 46%, rgba(11, 15, 18, .18)), linear-gradient(0deg, rgba(11, 15, 18, .72), transparent 28%); }
.hero-overlay-text { position: relative; z-index: 1; display: flex; align-items: center; min-height: 100%; box-sizing: border-box; width: 100%; padding: calc(var(--vp-nav-height) + 40px) clamp(36px, 5vw, 96px) 120px; color: #fff; }
.hero-copy { width: min(1050px, 70vw); text-shadow: 0 4px 28px rgba(0, 0, 0, .42); }
.hero-identity { margin-bottom: clamp(1.2rem, 2.6vw, 2.2rem); text-shadow: 0 3px 18px rgba(0, 0, 0, .34); }
.hero-identity__name { margin: 0; color: rgba(255, 255, 255, .88); font-size: clamp(1rem, 1.7vw, 1.45rem); font-weight: 700; line-height: 1.35; letter-spacing: .12em; }
.hero-identity__text { max-width: 34em; margin: .35rem 0 0; color: rgba(255, 255, 255, .62); font-size: clamp(.8rem, 1.15vw, 1rem); line-height: 1.5; letter-spacing: .08em; }
.typewriter-line { margin: 0; font-weight: 800; line-height: 1.1; overflow-wrap: anywhere; }
.typewriter-line--primary { font-size: clamp(2.4rem, 4.2vw, 4.8rem); white-space: nowrap; }
.typewriter-line--secondary { min-height: 1.1em; margin-top: .24em; font-size: clamp(2rem, 4.8vw, 4.3rem); }
.bracket, .cursor, .hero-card__name { color: var(--vp-c-brand-1); }
.name { color: #fff; }
.cursor { display: inline-block; margin-left: .08em; font-weight: 400; animation: blink 720ms step-end infinite; }
.cursor.hidden { opacity: 0; animation: none; }
.underscore-blink { opacity: 0; }
.underscore-blink.active { opacity: 1; animation: terminal-blink 720ms step-end infinite; }
.hero-subtitle { max-width: 34em; margin: 1.35rem 0 0; color: rgba(255, 255, 255, .78); font-size: clamp(1rem, 1.8vw, 1.4rem); line-height: 1.65; letter-spacing: .04em; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 2rem; }
.vp-button { position: relative; display: inline-flex; align-items: center; justify-content: center; min-height: 44px; box-sizing: border-box; padding: 8px 20px; overflow: hidden; border: 1.5px solid transparent; border-radius: 8px; font-size: .95rem; font-weight: 700; line-height: 1.3; text-decoration: none; opacity: 0; transform: translateY(18px) scale(.96); animation: button-rise 720ms cubic-bezier(.2,.78,.22,1) forwards; animation-delay: var(--button-delay, 0ms); transition: transform 220ms cubic-bezier(.2,.78,.22,1), background-color 220ms ease, border-color 220ms ease, box-shadow 220ms ease; }
.vp-button::after { position: absolute; inset: 0 auto 0 -45%; width: 28%; background: linear-gradient(100deg, transparent, rgba(255,255,255,.3), transparent); content: ''; transform: skewX(-18deg); animation: button-sheen 900ms ease-out 760ms both; pointer-events: none; }
.vp-button:hover { transform: translateY(-2px); }
.vp-button.brand { background: var(--vp-c-brand-1); color: #fff; }
.vp-button.brand:hover { background: var(--vp-c-brand-2); }
.vp-button.alt, .vp-button.outline, .vp-button.ghost { border-color: rgba(255,255,255,.36); background: rgba(255,255,255,.1); color: #fff; backdrop-filter: blur(8px); }
.vp-button.alt:hover, .vp-button.outline:hover, .vp-button.ghost:hover { background: rgba(255,255,255,.2); border-color: rgba(255,255,255,.7); }
.social-links { display: flex; flex-wrap: wrap; gap: 15px; margin-top: 1.7rem; }
.social-link { display: grid; place-items: center; width: 52px; height: 52px; border: 1.5px solid rgba(255,255,255,.28); border-radius: 8px; background: rgba(255,255,255,.09); color: rgba(255,255,255,.78); opacity: 0; transform: translateY(14px) scale(.9); transition: opacity 420ms ease, transform 520ms cubic-bezier(.2,.78,.22,1), background-color 220ms ease, color 220ms ease; }
.social-link.visible { opacity: 1; transform: translateY(0) scale(1); }
.social-link:hover { background: rgba(255,255,255,.2); color: #fff; transform: translateY(-2px); }
.social-icon { width: 24px; height: 24px; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
.scroll-down-hint { position: absolute; left: 50%; bottom: max(28px, env(safe-area-inset-bottom)); z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 10px; color: rgba(255,255,255,.72); transform: translateX(-50%); }
.hint-text { font-size: .7rem; letter-spacing: .18em; }
.mouse-icon { display: block; width: 26px; height: 40px; border: 1.5px solid rgba(255,255,255,.62); border-radius: 12px; }
.wheel { display: block; width: 2px; height: 7px; margin: 7px auto 0; background: var(--vp-c-brand-1); animation: scroll-wheel 1.2s ease-in-out infinite; }
.hero-content-section { padding: 72px 24px 96px; }
.content-wrapper { max-width: 900px; margin: 0 auto; text-align: center; }
.hero-card__name { margin: 0 0 16px; font-size: clamp(1.6rem, 4vw, 3rem); font-weight: 700; letter-spacing: .12em; }
.hero-card__title { margin: 0; color: var(--vp-c-text-1); font-size: clamp(1.8rem, 4vw, 3.2rem); line-height: 1.25; }
.hero-card__tagline { margin-top: 20px; color: var(--vp-c-text-2); line-height: 1.8; }
.quick-fade-enter-active, .quick-fade-leave-active { transition: opacity 180ms ease, transform 180ms ease; }
.quick-fade-enter-from, .quick-fade-leave-to { opacity: 0; transform: translateY(6px); }
.scroll-down-hint.quick-fade-enter-from, .scroll-down-hint.quick-fade-leave-to { transform: translate(-50%, 6px); }
@keyframes blink { 50% { opacity: 0; } }
@keyframes terminal-blink { 0%, 60% { opacity: 1; } 61%, 100% { opacity: 0; } }
@keyframes scroll-wheel { 0% { opacity: 0; transform: translateY(0); } 30% { opacity: 1; } 100% { opacity: 0; transform: translateY(12px); } }
@keyframes button-rise { 0% { opacity: 0; transform: translateY(18px) scale(.96); } 65% { opacity: 1; transform: translateY(-3px) scale(1.01); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes button-sheen { 0% { transform: translateX(0) skewX(-18deg); opacity: 0; } 18% { opacity: 1; } 100% { transform: translateX(520%) skewX(-18deg); opacity: 0; } }
@media (max-width: 640px) {
  .hero-visual { min-height: 680px; height: 100svh; }
  .parallax-bg { inset: -12%; background-position: 62% center; }
  .hero-shade { background: linear-gradient(180deg, rgba(11,15,18,.6), rgba(11,15,18,.3) 42%, rgba(11,15,18,.88)), linear-gradient(0deg, rgba(11,15,18,.72), transparent 24%); }
  .hero-overlay-text { align-items: flex-end; padding: calc(var(--vp-nav-height) + 28px) 20px max(88px, env(safe-area-inset-bottom) + 64px); }
  .hero-copy { width: 100%; }
  .hero-identity { margin-bottom: 1.25rem; }
  .hero-identity__name { font-size: 1rem; }
  .hero-identity__text { font-size: .78rem; letter-spacing: .04em; }
  .typewriter-line--primary { font-size: clamp(2rem, 10vw, 3.2rem); }
  .typewriter-line--primary { white-space: normal; }
  .typewriter-line--secondary { font-size: clamp(1.7rem, 8vw, 2.6rem); }
  .hero-subtitle { margin-top: 1rem; font-size: .95rem; }
  .hero-actions { gap: 8px; margin-top: 1.35rem; }
  .vp-button { flex: 1 1 140px; min-height: 42px; padding: 8px 12px; font-size: .85rem; }
  .scroll-down-hint { bottom: max(22px, env(safe-area-inset-bottom)); }
  .hint-text { display: none; }
  .hero-content-section { padding: 52px 20px 72px; }
}
@media (min-width: 960px) { .homepage-container { margin-top: calc(0px - var(--vp-nav-height)); } }
@media (prefers-reduced-motion: reduce) { .parallax-bg, .cursor, .underscore-blink.active, .wheel, .vp-button, .vp-button::after, .social-link, .quick-fade-enter-active, .quick-fade-leave-active { animation: none; transition: none; } .vp-button, .social-link { opacity: 1; transform: none; } }
</style>
