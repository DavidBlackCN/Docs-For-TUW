<template>
    <div class="aside-nav-wrapper">
        <a
            class="vp-link"
            href="https://github.com/DavidBlackCN/Docs-For-TUW"
            target="_blank"
            rel="noreferrer"
        >
            <Icon class="icon" :icon="icons[0]" />
            <span>在Github上Star:)</span>
            <span class="arrow">→</span>
        </a>
        <a
            class="vp-link"
            href="https://github.com/DavidBlackCN/Docs-For-TUW/issues/new/choose"
            target="_blank"
            rel="noreferrer"
        >
            <Icon class="icon" :icon="icons[1]" />
            <span>网站遇到了问题？</span>
            <span class="arrow">→</span>
        </a>
        <a
            class="vp-link"
            href="https://afdian.com/a/DBdev"
            target="_blank"
            rel="noreferrer"
        >
            <Icon class="icon" :icon="icons[2]" />
            <span>请我喝杯咖啡w！</span>
            <span class="arrow">→</span>
        </a>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue'

//此处添加图标
export default {
    components: { Icon },
    props: {
        icons: {
            type: Array,
            default: () => [
                'mdi:github',         
                'mdi:git-issue',    
                'ph:coffee-bold'         
            ]
        }
    }
}
</script>

<style scoped>
    .aside-nav-wrapper {
        display: flex;
        flex-direction: column;
        gap:6px;
        margin: 16px 16px 0;
        padding-top: 8px;
        border-top: 1px solid var(--vp-c-divider);
    }

    .vp-link {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-decoration: none;
        color: var(--c-text);
        font-size: 12px;
        transition: color 0.2s ease;
    }

    .vp-link:hover {
        color: var(--vp-c-brand-1);
    }

    .arrow{
        margin-left: 12px;
        flex-shrink: 0;
    }

    /* 新增图标样式 */
    .icon {
        margin-right: 8px;
        font-size: 14px;
        color: inherit;
        transition: color 0.2s ease;
    }
</style>