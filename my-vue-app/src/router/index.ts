import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import UserDetails from "../views/UserDetails.vue"

const isAuthenticated = true;

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
        meta: {requiresAuth: true},
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated) {
        next({
            path: "/"
        });
    } else {
        next();
    }
})

export default router;