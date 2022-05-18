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
    }
  ],
};
export default techExample;
