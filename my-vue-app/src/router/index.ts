import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import UserDetails from "../views/UserDetails.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/user/:id", 
        name: "UserDetails", 
        component: UserDetails,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;