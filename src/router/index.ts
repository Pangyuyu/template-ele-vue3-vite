import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import home from "./modules/home";
import techExample from "./modules/techExample";
import childWin from "./modules/ex_win_child"
import more from "./modules/more"
// import Logger from '@/common/logger/logger';
const routes: Array<RouteRecordRaw> = [
  // **********登录**********
  {
    path: "/login",
    name: "login",
    component: () => import("@/view/login/login.vue").catch(() => {}),
  },
  {
    path: "/",
    redirect: "/home",
    component: () => import("@/view/login/login.vue").catch(() => {}),
  },
  home,
  techExample,
  more,
  childWin,
  // **********404**********
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("@/layouts/error.vue").catch(() => {}),
  },
];

const Router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default Router;
