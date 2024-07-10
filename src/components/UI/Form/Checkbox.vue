<script setup lang="ts">
  defineProps({
    value: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
    }
  });

  const emit = defineEmits<{
    (e: 'check', target: HTMLInputElement): void
  }>();

  function handleCheck(e: Event): void {
    emit('check', e.target as HTMLInputElement);
  }
</script>

<template>
  <div>
    <label class="flex items-baseline">
      <input :name="name" type="checkbox" @change="handleCheck" :required="required">
      <p class="ms-2">{{value}}</p>
    </label>
  </div>
</template>

<style scoped>

</style>