<script setup lang="ts">
import {computed, ComputedRef, Ref, ref} from "vue";
import useInterval from "@/hooks/useInterval.ts";

const time: Ref<number> = ref<number>(Date.now());
const ms: number = 60000;

useInterval((): void => {
  time.value += ms;
}, ms);

const formattedTime: ComputedRef<string> = computed((): string => Intl.DateTimeFormat(
    localStorage.getItem('locale') ?? window.navigator.language,
    {
      hour: "numeric",
      minute: "numeric",
    }
).format(time.value));
</script>

<template>
  <span class="text-4xl whitespace-nowrap">{{ formattedTime }}</span>
</template>