<script lang="ts">
import { defineComponent, ref , onMounted } from 'vue';
import apiClient from '../api/axios';

interface User {
    id: number;
    name: string;
}

export default defineComponent({
    name:"Home",
    setup() {
        const users = ref<User[]>([]);
        const loading = ref<boolean>(true);

        const fetchUser = async () => {
            try {
                const response = await apiClient.get<User[]>("/users");
                users.value = response.data;
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                loading.value = false;
            }
        };

        onMounted(fetchUser);

        return {
            users,
            loading,
        };
    }
});
</script>

<template>
    <div>
        <h1>Users</h1>
        <router-link to="/user/new">Creat New User</router-link>
        <p v-if="loading">Loading users...</p>
        <ul v-else>
            <li v-for="user in users" :key="user.id">
                <router-link :to="`/user/${user.id}`">{{ user.name }}</router-link>
            </li>
        </ul>
    </div>
</template>