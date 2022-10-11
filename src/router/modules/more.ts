import Main from "@/layouts/main.vue";
const techExample = {
    path: "/more",
    name: "more",
    component: Main,
    children: [
        {
            path: "/more/ex_local_api",
            component: () => import("@/view/more/ex_local_api.vue")
        },
        {
            path: "/more/ex_safe_cache",
            component: () => import("@/view/more/ex_safe_cache.vue")
        },
        {
            path: "/more/ex_js_binary",
            component: () => import("@/view/more/ex_js_binary.vue")
        }
    ],
};
export default techExample;