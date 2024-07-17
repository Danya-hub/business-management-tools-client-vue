<script setup lang="ts">

import {PropType} from "vue";
import {RocketLaunchIcon, ChevronDownIcon} from "@heroicons/vue/24/outline";

import type {OpenStateType} from "@/components/types/OpenStateType.ts";

import Logo from "@/components/UI/Logo.vue";
import Search from "@/components/UI/Form/Search.vue";
import SingleButton from "@/components/UI/Form/SingleButton.vue";
import Tasks from "@/components/partials/Header/Tasks/Tasks.vue";
import UserPanel from "@/components/partials/Header/UserPanel.vue";

defineProps({
  asideIsOpened: {
    type: Object as PropType<OpenStateType>
  }
});

</script>

<template>
  <header class="flex justify-between pe-2 h-14 bg my-1">
    <router-link to="/" class="mx-4" v-if="!asideIsOpened?.focus">
      <Logo></Logo>
    </router-link>
    <Search
        class="max-w-[600px] w-full bg-gray-200 me-4"
    ></Search>
    <div class="flex justify-between">
      <div class="grid gap-5 grid-flow-col text">
        <Tasks></Tasks>
        <UserPanel></UserPanel>
        <div class="flex">
          <SingleButton class="button bg-orange-400 me-2 self-center">
            <div class="bg-amber-600 p-1 rounded-full me-2">
              <RocketLaunchIcon class="w-4"></RocketLaunchIcon>
            </div>
            Купить
            <ChevronDownIcon class="arrow"></ChevronDownIcon>
          </SingleButton>
          <SingleButton class="button bg-green-500 self-center">
            Пригласить
            <ChevronDownIcon class="arrow"></ChevronDownIcon>
          </SingleButton>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
header > *,
header > div > * {
  @apply self-center;
}

.icon {
  @apply w-6 h-6 mx-auto;
}

.button {
  @apply px-3 py-2 text-white font-medium rounded-full flex items-center;
}

.arrow {
  @apply w-4 ms-2;
}
</style>