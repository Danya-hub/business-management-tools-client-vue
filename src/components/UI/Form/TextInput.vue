<script setup lang="ts">
  withDefaults(defineProps<{
    placeholder: string;
    modelValue: string | number
  }>(), {
    modelValue: '',
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>();

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;

    emit('update:modelValue', target.value);
  }
</script>

<template>
  <input
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      class="px-2 flex-1 border border-gray-400 rounded"
      @change="handleChange"
  >
</template>

<style scoped>

</style>