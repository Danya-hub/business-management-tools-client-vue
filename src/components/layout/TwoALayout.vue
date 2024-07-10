<script setup lang="ts">
import {provide, ref} from "vue";

import AsideServiceMenu from "@/components/partials/AsideServiceMenu.vue";
import AsideToolsMenu from "@/components/partials/AsideToolsMenu.vue";
import Header from "@/components/partials/Header.vue";
import Footer from "@/components/partials/Footer.vue";
import Theme from "@/components/UI/Modal/Theme/Theme.vue";

import type { OpenStateType } from "@/components/types/OpenStateType.ts";
import emitter from "@/utils/emitter.ts";

const asideIsOpened = ref<OpenStateType>({
  hover: false,
  focus: false,
});
const themeIsOpened = ref<boolean>(false);

function handleToggleOpenState(value: boolean) {
  asideIsOpened.value.focus = value;
}

function handleHoverOpenState(value: boolean) {
  asideIsOpened.value.hover = value;
}

function handleToggleThemeModal(isOpened: boolean) {
  themeIsOpened.value = isOpened;
}

provide('themeIsOpened', themeIsOpened);

emitter.on('closeModal', (value: boolean) => {
  themeIsOpened.value = value;
})
</script>

<template>
  <div class="flex h-screen">
    <AsideToolsMenu
        :isOpened="asideIsOpened"
        @hover="handleHoverOpenState"
        @toggle="handleToggleOpenState"
    ></AsideToolsMenu>
    <div class="flex-1 text bg bg-opacity-30">
      <Header
          :isOpened="asideIsOpened"
      ></Header>
      <main>
        <Theme></Theme>
        <slot></slot>
      </main>
      <Footer
        @openModalState="handleToggleThemeModal"
      ></Footer>
    </div>
    <AsideServiceMenu></AsideServiceMenu>
  </div>
</template>

