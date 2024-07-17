<script setup lang="ts">

export type ButtonTypes = 'button' | 'submit' | 'reset';

withDefaults(defineProps<{
  type?: ButtonTypes | undefined,
}>(), {
  type: 'button',
});

const emit = defineEmits<{
  (e: 'click'): void;
}>();

function handleClick() {
  emit('click');
}

</script>

<template>
  <button
      :type="type"
      class="p-2 rounded"
      @click.stop="handleClick"
  >
    <slot></slot>
  </button>
</template>

<style scoped>

</style>