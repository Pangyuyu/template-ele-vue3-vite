import Main from "@/layouts/main.vue";
const home = {
  path: "/home",
  name: "home",
  component:Main,
  redirect: '/home/index',
  children: [
    {
      path: "/home/index",
      name: "menuHome",
      component: () => import("@/view/home/index.vue")
    },
    {
      path: "/files",
      name: "menuFiles",
      component: () => import("@/view/files/index.vue")
    },
  ],
};
export default home;
