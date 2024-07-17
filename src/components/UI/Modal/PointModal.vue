<script setup lang="ts">
withDefaults(defineProps<{
  background: string;
  pointPos?: string;
  pointDir: string;
  modalPos?: string;
  isOpenedShow?: boolean | null;
  isOpenedDisplay?: boolean | null;
}>(), {
  pointPos: '',
  pointDir: 'bottom',
  modalPos: '',
  isOpenedShow: null,
  isOpenedDisplay: null,
});

</script>

<template>
  <div
      :class="[
      'absolute',
      modalPos,
    ]"
      v-if="isOpenedDisplay === null || isOpenedDisplay"
      v-show="isOpenedShow === null || isOpenedShow"
  >
    <div
        v-if="pointDir === 'top'"
        :class="['w-8 h-4 overflow-hidden', pointPos]"
    >
      <div :class="['triangle shadow translate-y-1/2', background]"></div>
    </div>
    <div :class="[background, 'shadow p-3 rounded']">
      <slot></slot>
    </div>
    <div
        v-if="pointDir === 'bottom'"
        :class="['w-8 h-4 overflow-hidden', pointPos]"
    >
      <div :class="['triangle shadow -translate-y-1/2', background]"></div>
    </div>
  </div>
</template>

<style scoped>
.triangle {
  @apply w-4 h-4 bg-white rotate-45 mx-auto;
}
</style>