import { createApp } from "vue";
import App from "@/App.vue";
import Logger, { EnLogLevel } from "@/common/logger/logger";
import Router from "@/router";
import store from "@/store";
import "@/common/beforeRouter";
import ApiPub from '@/common/net/public/ApiPub';
import "@/styles/main.scss"; //重置样式
import 'default-passive-events'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

if (import.meta.env.MODE === "release") {
  Logger.setGlobalLevel(EnLogLevel.INFO);
} else {
  Logger.setGlobalLevel(EnLogLevel.DEBUG);
}
const app = createApp(App);
app.use(Router);
app.use(store);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 挂载API
app.config.globalProperties.$APIPUB = ApiPub;
app.mount("#app");
