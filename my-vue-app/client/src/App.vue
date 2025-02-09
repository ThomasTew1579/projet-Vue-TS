
<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./components/Navbar.vue";

export default defineComponent({
  name: "App",
  components:{
    Navbar
  }
});
</script>

<template>
  <div id="app">
    <Navbar></Navbar>
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