<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';``
import apiClient from '../api/axios';
import { errorMessages } from '@vue/compiler-sfc';

export default defineComponent({
    setup() {
        const router = useRouter();
        const form = ref({username:"", password:""});
        const errorMessages = ref("");

        const handleLogin = async () => {
            try {
                const response = await apiClient.post("/login", form.value);
                const token = response.data;

                localStorage.setItem("token", token);
                alert("Login successful!");
                router.push("/");
            } catch (error) {
                errorMessages.value = "Invalid credentials";
            }
        };

        return { form, handleLogin, errorMessages};
    },
})
</script>

<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleLogin">
            <div>
                <label for="username">Username :</label>
                <input v-model="form.username" id="username" type="text" required>
            </div>
            <div>
                <label for="password">Password :</label>
                <input v-model="form.password" id="password" type="password" required>
            </div>
            <button type="submit">Login</button>
        </form>
        <p v-if="errorMessages">{{ errorMessages }}</p>
    </div>
</template>


<style scoped>
    form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    }

    button {
    padding: 0.5rem;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    }
</style>