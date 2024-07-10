<script setup lang="ts">
import useDynamicRoute from "@/hooks/useDynamicRoute.ts";

import TwoALayout from "@/components/layout/TwoALayout.vue";

import {useServiceStore} from "@/store/services.ts";
import {UnpackedServiceType} from "@/store/types/ServiceType";

const toolStore = useServiceStore();

const renderedView = useDynamicRoute(
    function () {
      const foundService: UnpackedServiceType | undefined = toolStore.findByServiceName(this.viewName);

      if (!foundService) {
        return undefined;
      }

      return foundService.view;
    }, "service_name"
);

</script>

<template>
  <TwoALayout>
    <component :is="renderedView"></component>
  </TwoALayout>
</template>