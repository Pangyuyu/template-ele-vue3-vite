import Main from "@/layouts/main.vue";
const webfeatures = {
    path: "/webfeatures",
    name: "webfeatures",
    component: Main,
    children: [
        {
            path: "/webfeatures/jsts",
            component: () => import("@/view/webfeatures/jsts.vue")
        },
    ],
};
export default webfeatures;