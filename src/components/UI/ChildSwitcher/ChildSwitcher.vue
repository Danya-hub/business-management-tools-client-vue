<script setup lang="ts">
import {computed, PropType, ref, defineComponent, useAttrs} from "vue";

import emitter from "@/utils/emitter.ts";

export type ChildType = (props?: object) => ReturnType<typeof defineComponent>;

const props = defineProps({
  children: {
    type: Array as PropType<ChildType[]>,
    required: true,
  },
});
const attrs = useAttrs();

const childProps = ref<object>({});
const displayedChildIndex = ref<number>(0);
const displayedChild = computed(() => props.children[displayedChildIndex.value]);

function handleNext() {
  displayedChildIndex.value += 1;
}

function handlePrev() {
  displayedChildIndex.value -= 1;
}

function handleUpdateChildProps(props: object) {
  childProps.value = props;
}

emitter.on('childProps', handleUpdateChildProps);
emitter.on('next', handleNext);
emitter.on('prev', handlePrev);

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <component
      :is="displayedChild({
        ...childProps,
        ...attrs,
      })"
      v-bind="{
        ...childProps,
        ...attrs,
      }"
  ></component>
</template>