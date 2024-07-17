<script setup lang="ts">
import {ref} from "vue";
import {ChevronDownIcon} from "@heroicons/vue/24/outline";

import PointModal from "@/components/UI/Modal/PointModal.vue";
import vClickOutside from "@/directives/clickOutsideDirective.ts";
import useLang from "@/hooks/useLang.ts";

const { selected: selectedLocale, setLocale, options: localeOptions } = useLang();

const isOpened = ref<boolean>(false);

function handleChangeOpenStateModal(): void {
  isOpened.value = !isOpened.value;
}

function handleClickOutside(): void {
  isOpened.value = false;
}
</script>

<template>
  <div class="relative">
    <PointModal
        class="w-max"
        background="bg-white"
        pointPos="ms-3"
        pointDir="bottom"
        modalPos="bottom-full"
        :isOpenedShow="isOpened"
    >
      <ul class="flex flex-col flex-wrap max-h-32">
        <li v-for="option in localeOptions">
          <a href="#" @click="setLocale(option.key)" class="py-1 px-2 block">{{ option.text }}</a>
        </li>
      </ul>
    </PointModal>
    <button
        type="button"
        class="bg-gray-100 p-2 rounded border-gray-400 border flex items-center"
        @click="handleChangeOpenStateModal"
        v-click-outside="handleClickOutside"
    >
      {{selectedLocale?.text}}
      <ChevronDownIcon class="w-3 ms-2"></ChevronDownIcon>
    </button>
  </div>
</template>