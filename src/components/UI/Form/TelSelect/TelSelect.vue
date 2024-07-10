<script setup lang="ts">
import {onMounted} from "vue";

import {useTelephoneStore} from "@/store/telephones.ts";
import {TelephoneType} from "@/store/types/TelephoneType";

import {getFlagSrc} from "@/utils/flag.ts";
import LSelect from "@/components/UI/Form/LSelect.vue";

export type MountStatesType = {
  defaultTel: TelephoneType,
};

const telephoneStore = useTelephoneStore();
const defaultTel: TelephoneType = telephoneStore.items[0];

const emit = defineEmits<{
  (e: 'select', selected: TelephoneType): void,
  (e: 'mount', states: MountStatesType): void,
}>();

function handleSelectTelephone(value: string): void {
  const foundTel = telephoneStore.items.find((item: TelephoneType) => item.code === value);

  if (!foundTel) {
    return;
  }

  emit('select', foundTel);
}

onMounted(() => {
  emit('mount', {
    defaultTel,
  });
});
</script>

<template>
  <LSelect
      :default="defaultTel.code"
      :items="telephoneStore.items"
      @select="handleSelectTelephone"
  >
    <template v-slot:item="{ option, handleClick }: {
        option: TelephoneType,
        handleClick: (selected: string) => void,
      }">
      <button type="button" class="flex items-center px-4 py-1 hover:bg-gray-200 w-full" @click="handleClick(option.code)">
        <img
            :src="getFlagSrc(option.country)"
            :alt="option.country"
            class="me-2 w-6"
        />
        <span>{{ option.code }}</span>
      </button>
    </template>
  </LSelect>
</template>