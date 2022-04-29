import Main from "@/layouts/main.vue";
const techExample = {
  path: "/techExample",
  name: "techExample",
  component: Main,
  children: [
    {
      path:"/techExample/ex_electron",
      component: () => import("@/view/techExample/ex_electron.vue")
    },
    {
      path:"/techExample/ex_elementPlus",
      component: () => import("@/view/techExample/ex_elementPlus.vue")
    }
  ],
};
export default techExample;
