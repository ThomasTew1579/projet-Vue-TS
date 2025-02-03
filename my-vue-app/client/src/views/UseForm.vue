<script lang="ts">
import { defineComponent, ref } from 'vue';
import apiClient from '../api/axios';
import { useRouter } from 'vue-router';

export default defineComponent ({
    name: "UserForm",
    setup() {
        const router = useRouter();
        const form = ref({
            name: "",
            username: "",
            email: "",
            password:"",
            role:"",
        });

        const handleSubmit = async () => {
            try {
                const response = await apiClient.post("/signup", form.value);
                console.log("User created;", response.data);
                alert("User created successfully!");
                router.push("/");
            } catch (error) {
                console.log("User created;", error);
            }
        };
        return {
            form,
            handleSubmit,
        };
    },
});

</script>

<template>
    <div>
        <h1>Create User</h1>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="name">Name:</label>
                <input v-model="form.name" id="name" type="text" required />
            </div>
            <div>
                <label for="username">Username:</label>
                <input v-model="form.username" id="username" type="text" required />
            </div>
            <div>
                <label for="email">Email:</label>
                <input v-model="form.email" id="email" type="email" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input v-model="form.password" id="password" type="password" required />
            </div>
            <div>
                <label for="role">Choose a role:</label>
                <select v-model="form.role" id="role">
                    <option>Admin</option>
                    <option>User</option>
                </select>
            </div>
            <button type="submit">Create User</button>
        </form>
    </div>
</template>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 400px;
    }

    label {
        font-weight: bold;
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