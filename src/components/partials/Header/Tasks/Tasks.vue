<script setup lang="ts">

import {ref} from "vue";

import vClickOutside from "@/directives/clickOutsideDirective.ts";

import GlobalTime from "@/components/UI/Form/Time/GlobalTime.vue";
import PointModal from "@/components/UI/Modal/PointModal.vue";
import Goals from "@/components/partials/Header/Tasks/Goals.vue";
import DailyTasks from "@/components/partials/Header/Tasks/DailyTasks/DailyTasks.vue";
import Events from "@/components/partials/Header/Tasks/Events/Events.vue";
import {useTaskStore} from "@/store/tasks.ts";

const isOpened = ref<boolean>(false);

const taskStore = useTaskStore();

function handleToggle() {
  isOpened.value = !isOpened.value;
}

function handleClickOutside() {
  isOpened.value = false;
}
</script>

<template>
  <div class="relative">
    <button
        type="button"
        @click.stop="handleToggle"
        class="hover:bg-white hover:bg-opacity-20 p-2 rounded flex"
    >
      <GlobalTime></GlobalTime>
      <Goals
        class="ms-4 mt-1"
        :count="taskStore.tasks.length"
      ></Goals>
    </button>
    <PointModal
        :isOpenedDisplay="isOpened"
        class="z-20 text-black w-[400px]"
        pointPos="mx-2"
        pointDir="top"
        background="bg-white"
        v-click-outside="handleClickOutside"
    >
      <div class="border border-black p-2 rounded">
        <DailyTasks class="mb-4"></DailyTasks>
        <Events></Events>
      </div>
    </PointModal>
  </div>
</template>

<style scoped>

</style>