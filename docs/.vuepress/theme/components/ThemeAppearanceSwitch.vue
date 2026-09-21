<template>
  <button class="theme-appearance-switch" :class="{ 'is-dark': switchIsDark }" type="button" role="switch" :aria-checked="switchIsDark" :aria-label="switchTitle" @click="toggleAppearance">
    <span class="theme-switch__decor theme-switch__stars" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="theme-switch__decor theme-switch__clouds" aria-hidden="true"><i></i><i></i><i></i></span>
    <svg class="theme-switch__icon theme-switch__sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
    <svg class="theme-switch__icon theme-switch__moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 15.4A8.5 8.5 0 0 1 8.6 3.6A8.5 8.5 0 1 0 20.4 15.4Z" /></svg>
    <span class="theme-switch__thumb" aria-hidden="true"></span>
  </button>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { enableTransitions, resolveTransitionKeyframes, useData } from 'vuepress-theme-plume/client'

const { theme, isDark, frontmatter } = useData()
const switchIsDark = ref(false)
const switchTitle = computed(() => switchIsDark.value ? theme.value.lightModeSwitchTitle || '切换为浅色主题' : theme.value.darkModeSwitchTitle || '切换为深色主题')

onMounted(() => { switchIsDark.value = isDark.value || document.documentElement.dataset.theme === 'dark' })
watch(isDark, value => { switchIsDark.value = value })

function applyAppearance(nextIsDark) {
  switchIsDark.value = nextIsDark
  isDark.value = nextIsDark
  return nextTick()
}

async function toggleAppearance(event) {
  const nextIsDark = !switchIsDark.value
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isHome = frontmatter.value.home || frontmatter.value.pageLayout === 'home'

  // The home page contains fixed overlays and a live canvas. Keep them in the
  // live document instead of replacing them with a root transition snapshot.
  if (reduceMotion || !enableTransitions() || isHome) {
    document.documentElement.classList.add('theme-transitioning')
    await new Promise(resolve => requestAnimationFrame(resolve))
    await applyAppearance(nextIsDark)
    window.setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 240)
    return
  }

  const transition = document.startViewTransition(() => applyAppearance(nextIsDark))
  await transition.ready
  const { keyframes, duration } = resolveTransitionKeyframes(event.clientX, event.clientY, 'circle-clip', nextIsDark)
  document.documentElement.animate(
    keyframes,
    {
      duration: Math.min(duration, 500),
      easing: 'cubic-bezier(.4,0,.2,1)',
      fill: 'forwards',
      pseudoElement: `::view-transition-${nextIsDark ? 'old' : 'new'}(root)`,
    },
  )
}
</script>

<style scoped>
.theme-appearance-switch { position: relative; display: block; width: 74px; height: 32px; padding: 2px; overflow: hidden; border: 1px solid var(--vp-c-border); border-radius: 99px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); cursor: pointer; transition: border-color 180ms ease, background-color 220ms ease, transform 120ms ease; }
.theme-appearance-switch:hover { border-color: var(--vp-c-brand-1); }
.theme-appearance-switch:active { transform: scale(.96); }
.theme-appearance-switch:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 1px; }
.theme-switch__icon { position: absolute; top: 7px; z-index: 4; width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2; transition: transform 260ms cubic-bezier(.23,1,.32,1), opacity 180ms ease, color 180ms ease; }
.theme-switch__sun { left: 7px; color: var(--vp-c-warning-1); }
.theme-switch__moon { right: 9px; color: var(--vp-c-text-3); opacity: .18; transform: rotate(-12deg) scale(.84); }
.theme-switch__thumb { position: absolute; top: 2px; left: 2px; z-index: 3; width: 26px; height: 26px; border-radius: 50%; background: var(--vp-c-bg-elv); box-shadow: 0 1px 3px rgba(20,25,28,.16); transform: translateX(0); transition: transform 280ms cubic-bezier(.34,1.56,.64,1), background-color 220ms ease; }
.theme-appearance-switch.is-dark .theme-switch__thumb { transform: translateX(42px); }
.theme-appearance-switch.is-dark .theme-switch__sun { opacity: .18; transform: rotate(-36deg) scale(.82); }
.theme-appearance-switch.is-dark .theme-switch__moon { color: var(--vp-c-brand-hard); opacity: 1; transform: rotate(12deg) scale(1.05); }
.theme-switch__decor { position: absolute; inset: 2px; z-index: 2; pointer-events: none; opacity: 0; transition: opacity 220ms ease; }
.theme-appearance-switch.is-dark .theme-switch__stars, .theme-appearance-switch:not(.is-dark) .theme-switch__clouds { opacity: 1; }
.theme-switch__stars i { position: absolute; width: 6px; height: 6px; background: var(--vp-c-brand-hard); clip-path: polygon(50% 0,62% 37%,100% 50%,62% 63%,50% 100%,38% 63%,0 50%,38% 37%); }
.theme-switch__stars i:nth-child(1) { top: 5px; left: 10px; }.theme-switch__stars i:nth-child(2) { top: 20px; left: 25px; }.theme-switch__stars i:nth-child(3) { top: 7px; left: 38px; width: 4px; height: 4px; }
.theme-switch__clouds i { position: absolute; width: 17px; height: 6px; border-radius: 99px; background: color-mix(in srgb, var(--vp-c-brand-1) 45%, var(--vp-c-text-3)); opacity: .58; }
.theme-switch__clouds i::before, .theme-switch__clouds i::after { position: absolute; bottom: 0; border-radius: 50%; background: inherit; content: ''; }.theme-switch__clouds i::before { left: 3px; width: 8px; height: 8px; }.theme-switch__clouds i::after { right: 2px; width: 10px; height: 10px; }.theme-switch__clouds i:nth-child(1) { top: 18px; left: 38px; }.theme-switch__clouds i:nth-child(2) { top: 6px; left: 54px; transform: scale(.75); }.theme-switch__clouds i:nth-child(3) { top: 21px; left: 64px; transform: scale(.62); }
@keyframes star-pop { 0% { opacity: 0; scale: .35; rotate: -25deg; } 70% { opacity: 1; scale: 1.18; } 100% { opacity: 1; scale: 1; rotate: 0deg; } }
@keyframes cloud-pop { 0% { opacity: 0; translate: 8px 4px; } 100% { opacity: .58; translate: 0 0; } }
.theme-appearance-switch.is-dark .theme-switch__stars i { animation: star-pop 360ms cubic-bezier(.23,1,.32,1) both; }
.theme-appearance-switch.is-dark .theme-switch__stars i:nth-child(2) { animation-delay: 55ms; }
.theme-appearance-switch.is-dark .theme-switch__stars i:nth-child(3) { animation-delay: 110ms; }
.theme-appearance-switch:not(.is-dark) .theme-switch__clouds i { animation: cloud-pop 320ms cubic-bezier(.23,1,.32,1) both; }
.theme-appearance-switch:not(.is-dark) .theme-switch__clouds i:nth-child(2) { animation-delay: 45ms; }
.theme-appearance-switch:not(.is-dark) .theme-switch__clouds i:nth-child(3) { animation-delay: 90ms; }
@media (prefers-reduced-motion: reduce) { .theme-appearance-switch, .theme-switch__icon, .theme-switch__thumb { transition: none; } }
</style>
