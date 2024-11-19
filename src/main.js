import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createApp } from "vue";
import App from "./App.vue";
import './assets/fonts/inter.css';
import "./assets/main.css";
import { setup as setupPlugin } from './plugins';

const app = createApp(App);
setupPlugin(app);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}


app.use(ElementPlus);
app.mount("#app");
