import {onMounted, Ref, ref} from "vue";

export default function useLoadingPromises(promises: Promise<void>[]): Ref<boolean> {
    const isLoading = ref(false);

    onMounted(async () => {
        await Promise.all(promises);

        isLoading.value = true;
    });

    return isLoading;
}