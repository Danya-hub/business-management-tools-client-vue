<script setup lang="ts">

import {useEventStore} from "@/store/events.ts";

import EventItem from "@/components/partials/Header/Tasks/Events/EventItem.vue";

const eventStore = useEventStore();

</script>

<template>
  <ul
      class="my-3 list-disc ps-4"
  >
    <EventItem
        v-for="item in eventStore.events"
        :key="`${item.id}_task`"
        :item="item"
    ></EventItem>
  </ul>
</template>

<style scoped>

</style>