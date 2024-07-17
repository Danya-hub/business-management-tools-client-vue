<script setup lang="ts">

import {XMarkIcon} from "@heroicons/vue/24/outline";
import {useSlots} from "vue";

const emit = defineEmits<{
  (e: 'click'): void;
}>();

function handleClick() {
  emit('click');
}

const slots = useSlots();
</script>

<template>
  <button
      type="button"
      class="p-2 text-black flex items-center"
      @click="handleClick"
  >
    <slot name="icon">
      <XMarkIcon class="w-6 h-6"></XMarkIcon>
    </slot>
    <span class="ms-1" v-if="slots.text">
      <slot name="text"></slot>
    </span>
  </button>
</template>

<style scoped>

</style>