import Theme from 'vitepress-theme-open17'
//import { useLive2d } from 'vitepress-theme-website'
import Layout from "./components/Layout.vue"
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
import './style/index.css'
//export default Theme
export default {
  extends: Theme,

  enhanceApp({app}) {
    // 注册全局组件
    app.component('Layout' , Layout)
  },
  
  setup() {

    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );//图片缩放

  }
}
