<script setup lang="ts">
import {computed, shallowRef} from "vue";
import Time from "@/utils/Time.ts";

export type RadiantPropsType = {
  hourHand: number;
  minuteHand: number;
};

export type ComponentPropsType = {
  time: Date | undefined;
  selectedHand?: keyof RadiantPropsType;
  maxMin: number;
  maxHour: number;
  hourStep: number;
  minStep: number;
  cycle?: number;
};

const props = withDefaults(defineProps<ComponentPropsType>(), {
  selectedHand: 'hourHand',
  cycle: 1,
});

const emit = defineEmits<{
  (e: 'change', hand: string, value: number): void,
}>();

const isMoveable = shallowRef<boolean>(false);
const radiant = computed<RadiantPropsType>(getTimeHand);

function getTimeHand(): RadiantPropsType {
  if (!props.time) {
    return {
      minuteHand: 0,
      hourHand: 0,
    };
  }

  return {
    minuteHand: Time.toRadian(props.time.getMinutes(), props.maxMin),
    hourHand: Time.toRadian(props.time.getHours() % props.maxHour, props.maxHour),
  };
}

function handleMouseMove(e: MouseEvent) {
  if (!isMoveable.value) {
    return;
  }

  const target = e.currentTarget as HTMLElement;

  const rect: DOMRect = target.getBoundingClientRect();
  const dx: number = e.clientX - rect.left - target.offsetWidth / 2,
      dy: number = e.clientY - rect.top - target.offsetHeight / 2;

  let newHandValue: number = 0;

  if (props.selectedHand === 'hourHand') {
    newHandValue = Math.floor(Time.toUnit((Math.atan2(dy, dx) + Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI), props.maxHour));
  } else {
    newHandValue = Math.floor(Time.toUnit((Math.atan2(dy, dx) + Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI), props.maxMin / props.minStep)) * props.minStep;
  }

  emit('change', props.selectedHand, newHandValue);
}

function handleMouseUp() {
  isMoveable.value = false;
}

function handleMouseDown() {
  isMoveable.value = true;
}
</script>

<template>
  <div
      class="w-28 h-28 bg-no-repeat rounded-full bg-white relative border border-gray-600 p-1"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mousedown="handleMouseDown"
  >
    <div
        class="w-full h-full bg-clock bg-center bg-[length:100%] border-4 border-green-400 rounded-full"
    >
      <div
          id="minutes"
          class="hand-container"
          :style="{ transform: `rotate(${radiant.minuteHand}rad)` }"
      >
        <div
            class="absolute bg-black w-[2.5%] h-[40%] left-1/2 top-[33%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        ></div>
      </div>
      <div
          id="hours"
          class="hand-container"
          :style="{ transform: `rotate(${radiant.hourHand}rad)` }"
      >
        <div
            class="absolute bg-black w-[2%] h-[30%] left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hand-container {
  @apply absolute left-0 top-0 w-full h-full;
}
</style>