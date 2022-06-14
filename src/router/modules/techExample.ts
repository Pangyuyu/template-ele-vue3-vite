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
      path:"/techExample/ex_files",
      component: () => import("@/view/techExample/ex_files.vue")
    },
    {
      path:"/techExample/ex_local_api",
      component: () => import("@/view/techExample/ex_local_api.vue")
    }
  ],
};
export default techExample;
