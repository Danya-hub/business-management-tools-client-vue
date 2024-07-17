<script setup lang="ts">

import {computed, shallowRef} from "vue";

import SimpleModal from "@/components/UI/Modal/SimpleModal.vue";
import NumberInput from "@/components/UI/Form/NumberInput/NumberInput.vue";
import Clock from "@/components/UI/Form/Time/Clock.vue";

import Time from "@/utils/Time.ts";

const props = defineProps<{
  minStep: number;
  hourStep: number;
  maxMin: number;
  maxHour: number;
  time: Date;
  isOpened: boolean;
}>();

const emit = defineEmits<{
  (e: 'submit'): void,
  (e: 'change', newTime: Date): void,
}>();

const selectedClockHand = shallowRef<string>('hourHand');

const pickedTimeUnits = computed(() => ({
  hours() {
    if (!props.time) {
      return '';
    }

    const formattedHours = props.time.getHours();

    if (formattedHours > props.maxHour) {
      return props.maxHour;
    }

    return formattedHours.toString().padStart(2, '0');
  },
  minutes() {
    if (!props.time) {
      return '';
    }

    const formattedMinutes = Time.roundByStep(
        props.time.getMinutes(),
        props.minStep,
    );

    if (formattedMinutes > props.maxMin) {
      return props.maxMin;
    }

    return formattedMinutes.toString().padStart(2, '0');
  }
}));

function handleChangeHourInput(value: number) {
  if (!props.time) {
    return '';
  }

  const newTime: Date = Time.addUnit(
      props.time,
      'setHours',
      () => value > props.maxHour ? props.maxHour : value
  );

  selectedClockHand.value = 'hourHand';
  emit('change', newTime);
}

function handleChangeMinuteInput(value: number) {
  if (!props.time) {
    return '';
  }

  const newTime: Date = Time.addUnit(
      props.time,
      'setMinutes',
      () => value > props.maxMin ? props.maxMin : value
  );

  selectedClockHand.value = 'minuteHand';
  emit('change', newTime);
}

function handleChangeClockTime(hand: string, value: number) {
  if (!props.time) {
    return '';
  }

  const newTime: Date = Time.addUnit(
      props.time,
      'hourHand' === hand ? 'setHours' : 'setMinutes',
      () => value,
  );

  emit('change', newTime);
}

function handleSelect() {
  if (!props.time) {
    return '';
  }

  emit('submit');
}
</script>

<template>
  <SimpleModal
      closeEvent="timeModalCloseEvent"
      title="Время"
      :isOpened="isOpened"
      class="top-1/2 -translate-y-1/2 shadow"
  >
    <div
        class="bg-gray-200 px-10 py-4 rounded"
    >
      <Clock
          :cycle="2"
          :time="time"
          :maxHour="12"
          :maxMin="maxMin"
          :minStep="minStep"
          :hourStep="hourStep"
          :selectedHand="selectedClockHand"
          @change="handleChangeClockTime"
      ></Clock>
      <div
          class="grid grid-flow-col gap-3 mx-auto w-fit mt-4"
      >
        <NumberInput
            name="hours"
            :max="maxHour"
            :step="hourStep"
            :value="pickedTimeUnits.hours()"
            @change="handleChangeHourInput"
        ></NumberInput>
        <NumberInput
            name="minutes"
            :max="maxMin"
            :step="minStep"
            :value="pickedTimeUnits.minutes()"
            @change="handleChangeMinuteInput"
        ></NumberInput>
      </div>
      <button
          type="button"
          class="bg-green-400 mt-4 px-3 py-2 mx-auto block rounded text-sm"
          @click="handleSelect"
      >Выбрать
      </button>
    </div>
  </SimpleModal>
</template>

<style scoped>

</style>