<script setup lang="ts">

  import {computed} from "vue";

  import {StoredEventType} from "@/store/types/EventType.ts";
  import Time from "@/utils/Time.ts";

  const props = defineProps<{
    item: StoredEventType,
  }>();

  const textStartTime = computed(() => Time.textTime(new Date(props.item.start), {
    hour: "numeric",
    minute: "numeric",
  }));
  const textFinishTime = computed(() => Time.textTime(new Date(props.item.finish), {
    hour: "numeric",
    minute: "numeric",
  }));
</script>

<template>
  <li class="text-xs mb-1">
    <span>{{ textStartTime }} - {{ textFinishTime }}</span>
    <b class="ms-3">{{item.title}}</b>
  </li>
</template>

<style scoped>

</style>