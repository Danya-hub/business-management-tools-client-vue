<script setup lang="ts">
defineProps({
  background: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    default: '0px'
  },
  isOpened: {
    type: Boolean,
    default: false
  },
});

</script>

<template>
  <div class="absolute bottom-full" v-show="isOpened">
    <div :class="[background, 'shadow p-3 rounded']">
      <slot></slot>
    </div>
    <div :class="['w-8 h-4 overflow-hidden', position]">
      <div :class="['triangle shadow', background]"></div>
    </div>
  </div>
</template>

<style scoped>
.triangle {
  @apply w-4 h-4 bg-white rotate-45 -translate-y-1/2 mx-auto;
}
</style>