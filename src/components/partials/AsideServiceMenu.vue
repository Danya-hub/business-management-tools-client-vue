<script setup lang="ts">
import {QuestionMarkCircleIcon, MagnifyingGlassIcon} from "@heroicons/vue/24/outline";

import type {UnpackedServiceType} from "@/store/types/ServiceType";

import {useServiceStore} from "@/store/services.ts";
import {useUserStore} from "@/store/user.ts";
import navigateToDynamicRoute from "@/route/helpers/navigateToDynamicRoute.ts";

import Avatar from "@/components/UI/User/Avatar.vue";

const serviceStore = useServiceStore();
const userStore = useUserStore();

function handleNavigateTo(service: UnpackedServiceType | null) {
  if (!service) {
    return;
  }

  navigateToDynamicRoute(
      'service',
      {
        paramKey: "service_name",
        name: service.view.name,
      },
  );
}
</script>

<template>
  <aside class="sticky top-0 right-0 bg-white z-10 text bg backdrop-blur" style="--bg-opacity: 0.9">
    <ul class="grid gap-3 w-14">
      <li>
        <button type="button" class="h-14 w-full">
          <QuestionMarkCircleIcon class="icon"></QuestionMarkCircleIcon>
        </button>
      </li>
      <li v-for="service in serviceStore.unpackedServices" :key="`service_${service.id}`">
        <button type="button" @click="handleNavigateTo(service)" class="w-full">
          <component :is="service.icon" class="icon"></component>
        </button>
      </li>
      <li>
        <button type="button" class="w-full">
          <MagnifyingGlassIcon class="icon"></MagnifyingGlassIcon>
        </button>
      </li>
      <li>
        <button type="button" class="w-full">
          <Avatar
              class="w-10 mx-auto"
              :user="userStore.data"
          ></Avatar>
        </button>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
  .icon {
    @apply w-6 mx-auto;
  }
</style>