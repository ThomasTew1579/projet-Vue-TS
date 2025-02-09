import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import UserDetails from "../views/UserDetails.vue";
import UseForm from "../views/UseForm.vue";
import EditUserForm from "../views/EditUserForm.vue";


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/user/:id", 
        name: "UserDetails", 
        component: UserDetails,
        meta: {requiresAuth: true},
    },
    {
        path: "/user/new", 
        name: "UserForm", 
        component: UseForm,
    },
    {
        path: "/user/:id/edit", 
        name: "EditUser", 
        component: EditUserForm,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem("token");

    if (to.meta.requiresAuth && !isAuthenticated) {
        alert("You must be logged in to access this page.");

        next({
            path: "/login"
        });
    } else {
        next();
    }
})

export default router;