<script setup lang="ts">
import emitter from "@/utils/emitter.ts";
import CloseButton from "@/components/UI/Buttons/CloseButton.vue";

const props = defineProps({
  closeEvent: {
    type: String,
    required: true,
  },
  isOpened: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  outsideIsAvailable: {
    type: Boolean,
  },
  hasCloseButton: {
    type: Boolean,
    default: true,
  }
});

function handleClose() {
  emitter.emit(props.closeEvent, false);
}
</script>

<template>
  <div
      v-show="isOpened"
      class="absolute pt-10 pb-8 px-6 bg-white z-20 rounded"
  >
    <h4
        class="absolute left-0 top-0 p-2"
    >{{ title }}</h4>
    <CloseButton
        v-if="hasCloseButton"
        @click="handleClose"
        class="absolute right-0 top-0"
    ></CloseButton>
    <slot></slot>
  </div>
</template>

<style scoped>

</style>