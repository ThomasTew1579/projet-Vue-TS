
<script lang="ts">
import { defineComponent, ref } from 'vue';
import ButtonComponent from './ButtonComponent.vue';

export default defineComponent({
  name: "HelloWorld",
  components: {
    ButtonComponent,
  },
  setup() {
    const message = ref<string>("Hello Vue 3 with TypeScript!");
    const count = ref<number>(0);
    const increment  = () => {
      count.value++;
    };

    const clickCount = ref<number>(0);

    const handleButtonClick = () => {
      clickCount.value++;
    }

    return {
      message,
      count,
      increment,
      clickCount,
      handleButtonClick,
    };
  },

});

</script>


<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="increment">Count is:{{ count }}</button> 
    <button-component label="Click me!" @click="handleButtonClick" />
    <p>You clicked the button {{ clickCount }} times.</p>
   </div>
</template>



