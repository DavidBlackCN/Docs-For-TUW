<template>
    <nav class="aside-nav-wrapper" aria-label="站点相关链接">
        <a
            class="vp-link"
            href="https://github.com/DavidBlackCN/Docs-For-TUW"
            target="_blank"
            rel="noopener noreferrer"
        >
            <span class="link-content">
                <Icon class="icon" :icon="icons[0]" aria-hidden="true" />
                <span>在 GitHub 上 Star</span>
            </span>
            <Icon class="arrow" icon="mdi:arrow-top-right" aria-hidden="true" />
        </a>
        <a
            class="vp-link"
            href="https://github.com/DavidBlackCN/Docs-For-TUW/issues/new/choose"
            target="_blank"
            rel="noopener noreferrer"
        >
            <span class="link-content">
                <Icon class="icon" :icon="icons[1]" aria-hidden="true" />
                <span>网站遇到了问题？</span>
            </span>
            <Icon class="arrow" icon="mdi:arrow-top-right" aria-hidden="true" />
        </a>
        <a
            class="vp-link"
            href="https://afdian.com/a/davidblackcn"
            target="_blank"
            rel="noopener noreferrer"
        >
            <span class="link-content">
                <Icon class="icon" :icon="icons[2]" aria-hidden="true" />
                <span>请我喝杯咖啡</span>
            </span>
            <Icon class="arrow" icon="mdi:arrow-top-right" aria-hidden="true" />
        </a>
    </nav>
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
        gap: 4px;
        margin: 16px 16px 0;
        padding-top: 12px;
        border-top: 1px solid var(--vp-c-divider);
    }

    .vp-link {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        min-height: 36px;
        padding: 0 8px;
        border: 1px solid transparent;
        border-radius: 8px;
        text-decoration: none;
        color: var(--vp-c-text-2);
        font-size: 12px;
        line-height: 1.35;
        font-family: var(--font-ui);
        transition: color var(--motion-duration-fast) ease,
            background-color var(--motion-duration-fast) ease,
            border-color var(--motion-duration-fast) ease,
            transform var(--motion-duration-fast) var(--motion-ease-out);
    }

    .link-content {
        display: inline-flex;
        min-width: 0;
        align-items: center;
        gap: 8px;
    }

    .arrow {
        margin-left: 12px;
        flex-shrink: 0;
        font-size: 15px;
        opacity: 0.6;
        transition: transform var(--motion-duration-fast) var(--motion-ease-out),
            opacity var(--motion-duration-fast) ease;
    }

    /* 图标样式 */
    .icon {
        flex-shrink: 0;
        font-size: 15px;
        color: inherit;
    }

    @media (hover: hover) and (pointer: fine) {
        .vp-link:hover {
            color: var(--vp-c-brand-1);
            background: var(--vp-c-brand-soft);
            border-color: var(--vp-c-brand-3);
            transform: translateX(2px);
        }

        .vp-link:hover .arrow {
            opacity: 1;
            transform: translate(2px, -2px);
        }
    }

    .vp-link:active {
        transform: scale(0.985);
    }

    .vp-link:focus-visible {
        outline: 2px solid var(--vp-c-brand-1);
        outline-offset: 2px;
        color: var(--vp-c-brand-1);
    }

    @media (prefers-reduced-motion: reduce) {
        .vp-link,
        .arrow {
            transition: color var(--motion-duration-fast) ease,
                background-color var(--motion-duration-fast) ease,
                border-color var(--motion-duration-fast) ease,
                opacity var(--motion-duration-fast) ease;
        }
    }
</style>
