<script setup lang="ts">

import Logo from "@/components/UI/Logo.vue";
import LangSelect from "@/components/UI/LangSelect.vue";
import Copyright from "@/components/UI/Copyright.vue";

const emit = defineEmits<{
  (e: 'openModalState', isOpened: boolean): void
}>();

function handleOpenThemeModal() {
  emit('openModalState', true);
}
</script>

<template>
  <footer class="flex mx-2">
    <router-link to="/" class="flex items-center bg-gray-100 p-2 rounded border-gray-400 border me-2">
      <Logo class="text-black"></Logo>
    </router-link>
    <LangSelect
      class="text-black"
    ></LangSelect>
    <ul class="flex items-center">
      <li>
        <Copyright></Copyright>
      </li>
      <li>
        <button type="button">Заказать внедрение</button>
      </li>
      <li>
        <button
            type="button"
            @click.stop="handleOpenThemeModal"
        >Темы</button>
      </li>
      <li>
        <button type="button">Печать</button>
      </li>
    </ul>
  </footer>
</template>

<style scoped>
  li {
    @apply px-3 border-r border-r-black last:border-none;
  }
</style>