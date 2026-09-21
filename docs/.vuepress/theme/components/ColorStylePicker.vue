<template>
  <div ref="picker" class="color-style-picker">
    <button class="toggle-button" type="button" :aria-expanded="showPanel" aria-controls="color-style-panel" aria-label="选择配色" @click="showPanel = !showPanel">
      <span class="palette-icon" aria-hidden="true"></span><span class="toggle-label">配色</span>
    </button>
    <Transition name="panel">
      <section v-if="showPanel" id="color-style-panel" class="control-panel" aria-label="选择配色风格">
        <p class="panel-title">配色风格</p>
        <div class="style-list" role="group" aria-label="主题配色方案">
          <button v-for="style in styles" :key="style.id" class="style-option" :class="{ 'is-selected': selectedStyle === style.id }" :aria-pressed="selectedStyle === style.id" type="button" @click="selectStyle(style.id)">
            <span class="style-swatches" aria-hidden="true"><i v-for="color in style.swatches" :key="color" :style="{ backgroundColor: color }"></i></span><span class="style-name">{{ style.name }}</span><span v-if="selectedStyle === style.id" class="checkmark" aria-hidden="true">✓</span>
          </button>
        </div>
      </section>
    </Transition>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const STORAGE_KEY = 'northstar-color-style'
const picker = ref(null)
const showPanel = ref(false)
const selectedStyle = ref('jiqing')
const styles = [
  { id: 'jiqing', name: '霁青', swatches: ['#5086a1', '#d9eaee', '#fffcf5'] },
  { id: 'taozhu', name: '陶朱', swatches: ['#ad4506', '#f8e3d4', '#fffcf5'] },
  { id: 'ouhe', name: '藕荷', swatches: ['#b06d88', '#f3e2e8', '#fffcf5'] },
  { id: 'maijin', name: '麦金', swatches: ['#b59a2a', '#f3edcf', '#fffcf5'] },
]

function applyStyle(style) {
  if (style === 'jiqing') delete document.documentElement.dataset.colorStyle
  else document.documentElement.dataset.colorStyle = style
}
function selectStyle(style) {
  selectedStyle.value = style
  applyStyle(style)
  localStorage.setItem(STORAGE_KEY, style)
  showPanel.value = false
}
function handleClickOutside(event) {
  if (showPanel.value && picker.value && !picker.value.contains(event.target)) showPanel.value = false
}
function handleKeydown(event) { if (event.key === 'Escape') showPanel.value = false }
onMounted(() => {
  const savedStyle = localStorage.getItem(STORAGE_KEY)
  if (styles.some(style => style.id === savedStyle)) selectedStyle.value = savedStyle
  applyStyle(selectedStyle.value)
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.color-style-picker { position: relative; display: inline-flex; }
.toggle-button { display: inline-flex; align-items: center; gap: 7px; min-height: 36px; padding: 6px 8px; border: 1px solid transparent; border-radius: 8px; background: transparent; color: var(--vp-c-text-2); cursor: pointer; font: 500 14px/1 var(--vp-font-family-base); transition: color 160ms ease, background-color 160ms ease; }
.toggle-button:hover { background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); }
.toggle-button:focus-visible, .style-option:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 1px; }
.palette-icon { width: 14px; height: 14px; border-radius: 50%; background: conic-gradient(from 135deg, #5086a1, #b06d88, #b59a2a, #ad4506, #5086a1); }
.control-panel { position: absolute; top: calc(100% + 8px); right: 0; z-index: 100; width: 164px; padding: 12px; border: 1px solid var(--vp-c-border); border-radius: 8px; background: var(--vp-c-bg-elv); box-shadow: 0 10px 28px rgba(20,24,28,.14); }
.panel-title { margin: 2px 4px 10px; color: var(--vp-c-text-1); font: 600 13px/1.3 var(--vp-font-family-base); }
.style-list { display: grid; gap: 4px; }
.style-option { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 10px; width: 100%; min-height: 42px; padding: 7px 8px; border: 1px solid transparent; border-radius: 8px; background: transparent; color: var(--vp-c-text-1); cursor: pointer; text-align: left; }
.style-option:hover { background: var(--vp-c-bg-soft); }
.style-option.is-selected { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.style-swatches { display: flex; overflow: hidden; border: 1px solid var(--vp-c-border); border-radius: 5px; }
.style-swatches i { width: 12px; height: 22px; }
.style-name { font-size: 13px; font-weight: 600; }
.checkmark { color: var(--vp-c-brand-1); font-weight: 700; }
.panel-enter-active, .panel-leave-active { transition: opacity 160ms ease, transform 160ms ease; }
.panel-enter-from, .panel-leave-to { opacity: 0; transform: translateY(-4px); }
@media (max-width: 767px) { .toggle-label { display: none; } .control-panel { right: -8px; } }
@media (prefers-reduced-motion: reduce) { .panel-enter-active, .panel-leave-active { transition: none; } }
</style>
