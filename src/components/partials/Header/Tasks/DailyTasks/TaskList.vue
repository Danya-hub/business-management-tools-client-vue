<script setup lang="ts">
import {useTaskStore} from "@/store/tasks.ts";

import type {StoredTaskType} from "@/store/types/TaskType.ts";
import Checkbox from "@/components/UI/Form/Checkbox.vue";

const taskStore = useTaskStore();

function handleCheck(target: HTMLInputElement, item: StoredTaskType) {
  item.completed = target.checked;

  taskStore.toggleTaskStatus(item);
}
</script>

<template>
  <ul
      class="my-3"
  >
    <li
        v-for="item in taskStore.tasks"
        :key="`${item.id}_task`"
        class="text-xs mb-1"
    >
      <Checkbox
          :required="false"
          :name="String(item.id)"
          :value="item.title"
          :checked="item.completed"
          @check="(target: HTMLInputElement) => handleCheck(target, item)"
      ></Checkbox>
    </li>
  </ul>
</template>

<style scoped>

</style>