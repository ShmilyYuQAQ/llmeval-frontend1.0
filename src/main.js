import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createApp } from "vue";
import App from "./App.vue";
import './assets/fonts/inter.css';
import "./assets/main.css";
import { setup as setupPlugin } from './plugins';
import "./assets/iconfont/iconfont.css";
import mitt from 'mitt';

const app = createApp(App);
setupPlugin(app);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

const bodyScale = () => {
  const deviceWidth = document.documentElement.clientWidth; // 获取当前分辨率下的可视区域宽度
  const scale = deviceWidth / 1600; // 分母——设计稿的尺寸
  document.documentElement.style.zoom = scale; // 放大缩小相应倍数
};
  
app.mixin({
    mounted() {
      bodyScale();
      window.addEventListener('resize', bodyScale, false);
    },
    beforeUnmount() {
      window.removeEventListener('resize', bodyScale, false);
    }
});

// 创建事件总线
const eventBus = mitt();
app.config.globalProperties.$bus = eventBus;

app.use(ElementPlus);
app.mount("#app");
