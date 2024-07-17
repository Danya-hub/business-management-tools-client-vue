<script setup lang="ts">
import {useAttrs} from "vue";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/vue/24/outline";

const attrs = useAttrs();

export type NumberInputTypeProps = {
  step?: number;
  value: number | string;
  min?: number,
  max: number,
};

const props = withDefaults(
    defineProps<NumberInputTypeProps>(),
    {
      max: 0,
      step: 1,
      min: 0,
    },
);

const emit = defineEmits<{
  (e: 'change', value: number): void
}>();

function handleClick(value: number) {
  if (props.min > value) {
    emit('change', props.max - props.step);
    return;
  }

  emit('change', value % props.max);
}

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;

  emit('change', Number(target.value));
}
</script>

<template>
  <div
      class="field"
  >
    <input
        type="number"
        :value="value"
        @change="handleInput"
        v-bind="attrs"
    >
    <div
        class="grid absolute right-0 top-0 bottom-0"
    >
      <button
          type="button"
          class="switcher"
          @click="handleClick(+props.value + props.step)"
      >
        <ChevronUpIcon
            class="icon"
        ></ChevronUpIcon>
      </button>
      <button
          type="button"
          class="switcher"
          @click="handleClick(+props.value - props.step)"
      >
        <ChevronDownIcon
            class="icon"
        ></ChevronDownIcon>
      </button>
    </div>
  </div>
</template>

<style scoped>
.field {
  @apply flex rounded bg-white overflow-hidden relative;
}

input {
  @apply block w-10 h-6 text-center outline-0;
}

input::-webkit-inner-spin-button {
  @apply invisible;
}

.switcher {
  @apply px-1 hover:bg-gray-300;
}

.icon {
  @apply w-2 h-2;
}
</style>