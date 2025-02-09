<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name:"NavBar",
    setup() {
        const router = useRouter();
        const isAuthenticated = ref(false);

        const checkAuth = () => {
            isAuthenticated.value = !!localStorage.getItem("token");
        };

        const logout = () => {
            localStorage.removeItem("token");
            isAuthenticated.value = false;
            alert("You have been logged out.");
            router.push("/");
        };

        onMounted(checkAuth);

        return { isAuthenticated, logout};
    }
})
</script>


<template>
    <nav>
        <router-link to="/">Home</router-link>
        <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
        <button v-if="isAuthenticated" @click="logout">Logout</button>
    </nav>
</template>