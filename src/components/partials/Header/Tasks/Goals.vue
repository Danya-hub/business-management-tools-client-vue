<script setup lang="ts">
  import { FlagIcon } from "@heroicons/vue/24/outline";

  defineProps({
    count: {
      type: Number,
      default: 0,
    }
  });
</script>

<template>
  <div class="flex items-center">
    <FlagIcon
      class="w-3 h-3"
    ></FlagIcon>
    <span
        class="ms-1 text-xs"
    >{{count}}</span>
  </div>
</template>

<style scoped>

</style>