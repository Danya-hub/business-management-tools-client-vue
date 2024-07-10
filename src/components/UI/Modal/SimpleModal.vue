<script setup lang="ts">
import {XMarkIcon} from "@heroicons/vue/24/outline";

import vClickOutside from "@/directives/clickOutsideDirective.ts";
import emitter from "@/utils/emitter.ts";

defineProps({
  isOpened: {
    type: Boolean,
    required: true,
  }
});

function handleClose() {
  emitter.emit('closeModal', false);
}
</script>

<template>
  <div
      v-show="isOpened"
      class="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 p-6 bg-white z-20"
      v-click-outside="handleClose"
  >
    <button
        type="button"
        class="absolute right-0 top-0 p-2 text-black"
        @click="handleClose"
    >
      <XMarkIcon class="w-6 h-6"></XMarkIcon>
    </button>
    <slot></slot>
  </div>
</template>

<style scoped>

</style>