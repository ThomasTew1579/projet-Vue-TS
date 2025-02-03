<script lang="ts">
import { defineComponent, ref , onMounted } from 'vue';
import { useRoute } from 'vue-router';
import apiClient from '../api/axios';

interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

export default defineComponent ({
    name: "UserDetails",
    setup() {
        const route = useRoute();
        const userId = route.params.id;
        const user = ref<User | null>(null);
        const loading = ref<boolean>(true);

        const fetchUser = async () => {
            try {
                const response = await apiClient.get<User>(`/users/${userId}`);
                user.value = response.data;
            } catch (error) {
                console.error("Error fecthing user:", error);
            } finally {
                loading.value = false;
            }
        };

        onMounted(fetchUser);

        return {
            userId,
            user,
            loading,
        }
    }
})
</script>

<template>
    <div>
        <h1>User details</h1>
        <p v-if="loading">Loading...</p>
        <div v-else-if="user" class="user">
            <p><strong>Id</strong>{{  user.id }}</p>
            <p><strong>Username</strong>{{  user.username }}</p>
            <p><strong>Name</strong>{{  user.name }}</p>
            <p><strong>Email</strong>{{  user.email }}</p>
            <p><strong>Password (hashed)</strong><span class="pswd">{{  user.password }}</span></p>
            <p><strong>Role</strong>{{  user.role }}</p>
            <router-link :to="`/user/${userId}/edit`">Edit User</router-link>
        </div>
        <p v-else>User not found</p>
    </div>
</template>

<style scoped>
    .user {
        & p {
            display: flex;
            gap: 4px;
            padding: 4px;

            .pswd {
                opacity: 0.1;
                transition: .2s;
                &:hover {
                    opacity: 1;
                }
            }
            
            & strong:after {
                content:" :";
            }
        }
    }
</style>

