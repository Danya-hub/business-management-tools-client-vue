<script setup lang="ts">
import {
  onMounted,
  PropType,
  ref,
} from "vue";
import {Bars3Icon, PencilIcon} from "@heroicons/vue/24/outline";

import type {UnpackedToolType} from "@/store/types/ToolType";
import {useToolStore} from "@/store/tools.ts";

import navigateToDynamicRoute from "@/route/helpers/navigateToDynamicRoute.ts";

import type { OpenStateType } from "@/components/types/OpenStateType.ts";
import Logo from "@/components/UI/Logo.vue";

const tools = useToolStore();

const minWidthMenu = 56;
const maxWidthMenu = 240;

const menuWidthStyle = ref<string>('');

const props = defineProps({
  isOpened: {
    type: Object as PropType<OpenStateType>
  }
});

const emit = defineEmits<{
  (e: 'toggle', value: boolean): void,
  (e: 'hover', value: boolean): void,
}>();

function handleNavigateTo(tool: UnpackedToolType | null) {
  if (!tool?.view) {
    return;
  }

  handleHover(false);
  navigateToDynamicRoute(
      'tool',
      {
        paramKey: 'tool_name',
        name: tool.view.name,
      },
  );
}

function toggleMenuWidthStyle(event: keyof OpenStateType): void {
  if (!props.isOpened) {
    return;
  }

  menuWidthStyle.value = `${props.isOpened[event] ? maxWidthMenu : minWidthMenu}px`;
}

function handleHover(value: boolean): void {
  if (!props.isOpened || props.isOpened.focus) {
    return;
  }

  props.isOpened.hover = value;

  emit('hover', value);
  toggleMenuWidthStyle('hover');
}

function handleToggle(): void {
  if (!props.isOpened) {
    return;
  }

  emit('toggle', !props.isOpened.focus);
  toggleMenuWidthStyle('focus');
}

onMounted(() => {
  toggleMenuWidthStyle('hover');
});
</script>

<template>
  <aside
      @mouseenter="handleHover(true)"
      @mouseleave="handleHover(false)"
  >
    <div>
      <div class="w-14"></div>
    </div>
    <div
        :class="[
        'top-0 left-0 z-10 bg text h-screen flex flex-col overflow-hidden shadow backdrop-blur',
        !isOpened?.focus ? 'fixed' : '',
      ]"
        style="--bg-opacity: 0.9"
        :style="{ width: menuWidthStyle }"
    >
      <button
          type="button"
          class="flex items-center w-full"
          @click="handleToggle"
      >
        <div class="min-w-14 h-14 flex items-center">
          <Bars3Icon class="icon"></Bars3Icon>
        </div>
        <b v-if="!isOpened?.focus" class="ms-2 whitespace-nowrap">Развернуть меню</b>
        <router-link v-else to="/">
          <Logo></Logo>
        </router-link>
      </button>
      <hr>
      <ul
          :class="[
              'grid py-4 h-full',
              (isOpened?.focus || isOpened?.hover) ? 'overflow-y-auto' : ''
          ]">
        <li v-for="tool in tools.unpackedTools" :key="`tool_${tool?.id}`">
          <button type="button" @click="handleNavigateTo(tool)" class="flex items-center w-full py-1">
            <div class="min-w-14 me-2 flex items-center">
              <component :is="tool?.icon" class="icon"></component>
            </div>
            <span class="whitespace-nowrap">{{ tool?.text }}</span>
            <button type="button">
              <PencilIcon></PencilIcon>
            </button>
          </button>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.icon {
  @apply w-6 h-6 mx-auto;
}
</style>
