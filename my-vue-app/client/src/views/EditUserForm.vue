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
            name:"",
            email:"",
        });

        const fetchUser = async () => {
            try {
                const response = apiClient.get(`/users/${userId}`);
                form.value = (await response).data;
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
                router.push(`/users/${userId}`);
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
                <input v-model="form.name" type="text" id="name" required>
            </div>
            <div>
                <label for="email">E-mail:</label>
                <input v-model="form.email" type="email" id="email" required>
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