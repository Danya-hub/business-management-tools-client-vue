<script setup lang="ts">
import {inject} from "vue";

import type {StoredThemeType} from "@/store/types/ThemeType.ts";

import SimpleModal from "@/components/UI/Modal/SimpleModal.vue";
import {useThemeStore} from "@/store/themes.ts";
import Card from "@/components/UI/Modal/Theme/Card.vue";

import vClickOutside from "@/directives/clickOutsideDirective.ts";
import emitter from "@/utils/emitter.ts";

const themeIsOpened = inject('themeIsOpened');

const themeStore = useThemeStore();

function handleSelectTheme(data: StoredThemeType) {
  themeStore.setTheme(data.id);
}

function handleClose() {
  emitter.emit('themeModalCloseEvent', false);
}
</script>

<template>
  <SimpleModal
      closeEvent="themeModalCloseEvent"
      :isOpened="themeIsOpened"
      class="left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 max-w-[600px] max-h-[500px] shadow-xl rounded"
      v-click-outside="handleClose"
  >
    <h4 class="text-black mb-2">Темы оформления</h4>
    <ul class="flex flex-wrap overflow-y-scroll">
      <li v-for="theme in themeStore.items">
        <Card
            @select="handleSelectTheme"
            :key="`theme_${theme.key}`"
            :data="theme"></Card>
      </li>
    </ul>
  </SimpleModal>
</template>