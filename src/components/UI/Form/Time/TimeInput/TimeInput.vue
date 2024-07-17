<script setup lang="ts">
import {shallowRef, ref, onBeforeMount} from "vue";

import Time from "@/utils/Time.ts";
import emitter from "@/utils/emitter.ts";
import Modal from "@/components/UI/Form/Time/TimeInput/Modal.vue";

export type ComponentPropsType = {
  minStep: number;
  hourStep: number;
  maxMin: number;
  maxHour: number;
  class: string;
  modelValue: Date | undefined;
};

const emit = defineEmits<{
  (e: 'select', selected: Date): void,
}>();

const props = withDefaults(defineProps<Partial<ComponentPropsType>>(), {
  minStep: 5,
  hourStep: 1,
  maxHour: 12,
  maxMin: 60,
});

function adjustMinutesByStep(_date?: Date | undefined) {
  const newDate = _date || new Date();

  newDate.setMinutes(Time.roundByStep(
      newDate.getMinutes(),
      props.minStep,
  ));

  return newDate;
}

const time = ref<Date | undefined>(props.modelValue);
const clockIsOpened = shallowRef<boolean>(false);
const formattedSelectedTimeInputValue = shallowRef<string>(props.modelValue
    ? Time.textTime(adjustMinutesByStep(props.modelValue), {
      minute: "numeric",
      hour: "numeric",
    })
    : '');

onBeforeMount(() => {
  if (time.value) {
    return;
  }

  time.value = adjustMinutesByStep();
  formattedSelectedTimeInputValue.value = Time.textTime(time.value, {
    minute: "numeric",
    hour: "numeric",
  });
});

function handleChangeOpenState(isOpened: boolean) {
  clockIsOpened.value = isOpened;
}

function handleChangeModalInput(newTime: Date) {
  time.value = newTime;
  formattedSelectedTimeInputValue.value = Time.textTime(newTime, {
    minute: "numeric",
    hour: "numeric",
  });
}

function handleSubmitModal() {
  if (!time.value) {
    return;
  }

  clockIsOpened.value = false;

  emit('select', time.value);
}

emitter.on('timeModalCloseEvent', handleChangeOpenState);
</script>

<template>
  <div :class="['relative', $props.class]">
    <input
        type="text"
        class="text-center rounded bg-gray-50 border text-gray-900 p-2 block w-16"
        :value="formattedSelectedTimeInputValue"
        @click.stop="handleChangeOpenState(true)"
        readonly
    >
    <Modal
        :hourStep="hourStep"
        :isOpened="clockIsOpened"
        :maxHour="maxHour"
        :maxMin="maxMin"
        :minStep="minStep"
        :time="time"
        @submit="handleSubmitModal"
        @change="handleChangeModalInput"
    ></Modal>
  </div>
</template>

<style scoped>

</style>