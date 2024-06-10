import Theme from 'vitepress-theme-open17'
import { useLive2d } from 'vitepress-theme-website'
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

    //看板娘
    useLive2d({
      enable: true,
      model: {
        url: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/girls-frontline/HK416-2/normal/model.json'
      },
      display: {
        position: 'right',
        width: '270px',
        height: '600px',
        xOffset: '-20px',
        yOffset: '-150px'
      },
      mobile: {
        show: true
      },
      react: {
        opacity: 0.8
      }
    })

  }
}
