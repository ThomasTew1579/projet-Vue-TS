<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name:"ButtonComponent",
    props:{
        label: {
            type: String , 
            required:true,
        },
    },
    emits:["click"],
    setup(_, {emit}) {
        const handleClick = () => {
            emit("click");
        };

        return {
            handleClick,
        };
    },
});

</script>

<template>
    <button @click="handleClick">
        {{ label }}
    </button>
</template>