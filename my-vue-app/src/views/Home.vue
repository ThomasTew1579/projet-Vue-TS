<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name:"Home",
});
</script>

<template>
    <div>
        <h1>Home</h1>
        <ul>
            <li><router-link to="/user/1">View User 1</router-link></li>
            <li><router-link to="/user/2">View User 2</router-link></li>
        </ul>
    </div>
</template>