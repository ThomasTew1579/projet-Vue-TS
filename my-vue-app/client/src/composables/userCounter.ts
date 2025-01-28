import { ref } from "vue";

export function useCounter(initialValue: number = 0) {
    const count = ref<number>(initialValue);

    const increment = () => {
        count.value++;
    };

    const decrement = () => {
        count.value--;
    };

    return {
        count,
        increment,
        decrement,
    };
}