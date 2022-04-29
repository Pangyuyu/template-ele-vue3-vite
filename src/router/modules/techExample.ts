import Main from "@/layouts/main.vue";
const techExample = {
  path: "/techExample",
  name: "techExample",
  component: Main,
  meta: {
    title: "技术示例",
  },
  children: [
    {
      path:"/techExample/ex_electron",
      name: "techExampleExElectron",
      meta: {
        title: "Electron",
      },
      component: () => import("@/view/techExample/ex_electron.vue")
    },
    {
      path:"/techExample/ex_elementPlus",
      name: "techExampleExElementPlus",
      meta: {
        title: "Electron",
      },
      component: () => import("@/view/techExample/ex_elementPlus.vue")
    }
  ],
};
export default techExample;
