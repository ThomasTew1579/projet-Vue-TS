<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '../api/axios';

export default defineComponent ({
    name:"EditUserForm",
    setup() {
        const route = useRoute();
        const router = useRouter();
        const userId = route.params.id as string;

        const form = ref({
            name: "",
            username: "",
            email: "",
            password:"",
            role:"",
        });

        const fetchUser = async () => {
            try {
                const response = await apiClient.get(`/users/${userId}`);
                form.value = response.data;
            } catch(error) {
                console.error("Error fecthing user :", error);
                alert("Failed to load user data.");
                router.push("/");
            }
        };

        const handleSubmit = async () => {
            try {
                await apiClient.put(`/users/${userId}`, form.value);
                alert("User update successfully!");
                router.push(`/user/${userId}`);
            } catch(error) {
                console.error("Error updating user :", error);
                alert("Failed to update user.");
            }
        };

        onMounted(fetchUser);

        return {
            form,
            handleSubmit,
        }
    }
})

</script>


<template>
    <div>
        <h1>Edit User</h1>
        <form @submit.prevent ="handleSubmit">
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
            <button type="submit">Save Change</button>
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