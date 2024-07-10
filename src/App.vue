<script setup lang="ts">
import {computed, ref} from "vue";

import useLoadingPromises from "@/hooks/useLoadingPromises.ts";
import emitter from "@/utils/emitter.ts";
import storeInit from "@/store/initialize.ts";
import {useThemeStore} from "@/store/themes.ts";

import Loader from "@/components/UI/Loader.vue";

const viewIsLoaded = ref<boolean>(false);
const storeWasLoaded = useLoadingPromises(storeInit());
const themeStore = useThemeStore();

const textColor = computed((): string | undefined => themeStore.selected?.text_color);
const background = computed((): string | undefined => themeStore.selected?.background);

emitter.on('viewLoading', (value: boolean) => {
  viewIsLoaded.value = value;
});

const isInitialised = computed(() => viewIsLoaded && storeWasLoaded);
</script>

<template>
  <router-view v-if="isInitialised"></router-view>
  <Loader v-else>isLoading...</Loader>
</template>

<style>
.text {
  --text-color: v-bind(textColor);

  color: rgb(var(--text-color));
}

.bg {
  --bg-opacity: 1;

  background: rgba(v-bind(background), var(--bg-opacity));
}
</style>