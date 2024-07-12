<script setup lang="ts">
  import emitter from "@/utils/emitter.ts";

  function handleClick() {
    emitter.emit('prev');
  }
</script>

<template>
  <button
      type="button"
      @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<style scoped>

</style>