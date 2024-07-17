<script setup lang="ts">
import {TrashIcon, CheckIcon, XMarkIcon} from "@heroicons/vue/24/outline";

import {StoredTaskType} from "@/store/types/TaskType.ts";

import ActionButton from "@/components/UI/Buttons/ActionButton.vue";
import Time from "@/utils/Time.ts";

defineProps<{
  items: StoredTaskType[],
}>();

const emit = defineEmits<{
  (e: 'remove', task: StoredTaskType): void;
  (e: 'toggleStatus', task: StoredTaskType): void;
}>();

function handleRemoveItem(task: StoredTaskType) {
  emit('remove', task);
}

function handleToggleStatusItem(task: StoredTaskType) {
  emit('toggleStatus', task);
}
</script>

<template>
  <table
      v-show="items.length"
      class="w-full"
  >
    <thead>
      <th class="w-full">
        <span class="ps-2 font-medium text-sm">Задача</span>
      </th>
      <th class="w-full">
        <span class="font-medium text-sm">Создан</span>
      </th>
      <th></th>
    </thead>
    <tbody>
    <tr
        v-for="item in items"
        :key="`${item.id}_task`"
        :id="String(item.id)"
        class="odd:bg-gray-100 border-b border-gray-600 last:border-b-0"
    >
      <td>
        <h4 class="text-sm ps-2">{{ item.title }}</h4>
      </td>
      <td>
        <span
            class="whitespace-nowrap"
        >{{
            Time.textTime(new Date(item.created_at), {
              minute: "numeric",
              hour: "numeric",
              day: "numeric",
              month: "short"
            })
          }}</span>
      </td>
      <td
          class="border-s border-gray-600 flex"
      >
        <ActionButton
            @click="handleToggleStatusItem(item)"
            :class="[
                'self-baseline',
                item.completed ? 'hover:text-red-500' : 'hover:text-green-500'
            ]"
        >
          <component
              :is="item.completed ? XMarkIcon : CheckIcon"
              class="w-4 h-4"
          ></component>
        </ActionButton>
        <ActionButton
            @click="handleRemoveItem(item)"
            class="self-baseline hover:text-red-500"
        >
          <TrashIcon
              class="w-4 h-4"
          ></TrashIcon>
        </ActionButton>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
tr {
  @apply hover:bg-gray-200;
}

th {
  @apply text-left py-2 text-xs;
}

td {
  @apply px-1;
}
</style>