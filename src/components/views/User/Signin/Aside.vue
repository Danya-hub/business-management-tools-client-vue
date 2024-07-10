<script setup lang="ts">

import Logo from "@/components/UI/Logo.vue";
import LangSelect from "@/components/UI/LangSelect.vue";
</script>

<template>
  <div class="flex col-span-5 flex-col justify-between p-10 bg-sky-400">
    <div>
      <Logo class="text-white"></Logo>
    </div>
    <div>
      <div class="mb-8 text-white">
        <h2 class="text-4xl mb-4 font-medium">Помогаем бизнесу работать</h2>
        <p class="text-xl">Бесплатно для всей компании</p>
      </div>
      <LangSelect class="float-right"></LangSelect>
    </div>
  </div>
</template>

<style scoped>

</style>