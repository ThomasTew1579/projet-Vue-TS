
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useCounter } from '../composables/userCounter';

export default defineComponent({
  name: "HelloWorld",
  setup() {
    const message = ref<string>("Hello Vue 3 with TypeScript!");
    const { count, increment, decrement} = useCounter(10);

  
    return {
      message,
      count,
      increment,
      decrement,
    };
  },

});

</script>


<template>
  <div>
    <h1>{{ message }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
   </div> 
</template>



