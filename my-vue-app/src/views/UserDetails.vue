<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent ({
    name: "UserDetails",
    setup() {
        const route = useRoute();
        const userId = route.params.id;

        return {
            userId
        }
    }
})
</script>

<template>
    <div>
        <h1>User details</h1>
        <p>User ID: {{ userId }}</p>
    </div>
</template>