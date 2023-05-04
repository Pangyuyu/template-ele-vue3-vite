import Main from '@/layouts/main.vue';
const webaudio={
    path:"/webaudio",
    name:"webaudio",
    component:Main,
    children:[
        {
            path:"/webaudio/basic",
            component: () => import("@/view/webaudio/basic.vue")
        }
    ]
}
export default webaudio