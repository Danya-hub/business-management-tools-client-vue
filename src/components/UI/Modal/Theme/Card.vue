<script setup lang="ts">
import {PropType} from "vue";

import type {StoredThemeType} from "@/store/types/ThemeType.ts";

const props = defineProps({
  data: {
    type: Object as PropType<StoredThemeType>,
    required: true,
  }
});

const emit = defineEmits<{
  (e: 'select', data: StoredThemeType): void,
}>();

function handleClick(data: StoredThemeType) {
  emit('select', data);
}

console.log(props.data.background);
</script>

<template>
  <button
      type="button"
      :style="{ background: `rgb(${data.background})` }"
      class="w-36 h-28 relative rounded border border-black p-1 m-2"
      @click="handleClick(data)"
  >
    <b :style="{ color: `rgb(${data.text_color}` }" class="absolute left-0 top-0 ms-2">{{ data.key }}</b>
    <p :style="{ color: `rgb(${data.text_color}` }">Example Text</p>
  </button>
</template>