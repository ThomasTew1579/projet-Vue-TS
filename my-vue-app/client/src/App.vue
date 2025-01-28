
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
nav {
    margin-bottom: 20px;
}

nav a {
    margin: 0 10px;
    text-decoration: none;
    color: #42b983;
}

nav a.router-link-active {
    font-weight: bold;
}
</style>