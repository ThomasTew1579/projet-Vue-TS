<script lang="ts">
import { defineComponent, ref } from 'vue';
import apiClient from '../api/axios';

export default defineComponent ({
    name: "UserForm",
    setup() {
        const form = ref({
            name: "",
            email: "",
        });

        const handleSubmit = async () => {
            try {
                const response = await apiClient.post("/users", form.value);
                console.log("User created;", response.data);
                alert("User created successfully!");
            } catch (error) {
                console.log("User created;", error);
                alert("User created successfully!");
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
                <label for="email">Email:</label>
                <input v-model="form.email" id="email" type="email" required />
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