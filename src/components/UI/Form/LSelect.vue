<script setup lang="ts" generic="T">
import {ref} from "vue";

import vClickOutside from "@/directives/clickOutsideDirective.ts";
import ChevronDownIcon from "@heroicons/vue/24/outline/ChevronDownIcon";

const props = defineProps({
  default: {
    type: String,
    required: true,
  },
  items: {
    type: Array as () => T[],
    required: true,
  }
});

defineSlots<{
  item: {
    option: T,
    handleClick: (selected: T) => void,
  },
  icon: {},
}>();

const emit = defineEmits<{
  (e: 'select', selected: string): void
}>();

const selectedOption = ref<string>(props.default);
const isOpen = ref<boolean>(false);

function handleSelect(selected: string): void {
  selectedOption.value = selected;

  emit('select', selected);
}

function handleOpen() {
  isOpen.value = !isOpen.value;
}

function handleClickOutside() {
  isOpen.value = false;
}
</script>

<template>
  <div class="relative">
    <button type="button" @click.stop="handleOpen" class="flex items-center">
      <slot name="icon"></slot>
      {{ selectedOption }}
      <ChevronDownIcon :class="[
          'w-3 h-3 ms-2',
          isOpen ? 'rotate-180' : ''
      ]"></ChevronDownIcon>
    </button>
    <ul v-show="isOpen" v-click-outside="handleClickOutside" class="absolute bg-white shadow rounded z-10 w-max">
      <li v-for="(item, i) in items" :key="`${i}_option`">
        <slot name="item" :option="item" :handleClick="handleSelect"></slot>
      </li>
    </ul>
  </div>
</template>