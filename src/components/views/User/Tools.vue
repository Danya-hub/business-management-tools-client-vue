<script setup lang="ts">

import type {UnpackedToolType} from "@/store/types/ToolType";

import {useToolStore} from "@/store/tools.ts";
import useDynamicRoute from "@/hooks/useDynamicRoute.ts";

import TwoALayout from "@/components/layout/TwoALayout.vue";

const toolStore = useToolStore();

const renderedView = useDynamicRoute(
    function () {
      const foundTool: UnpackedToolType | undefined = toolStore.findByToolName(this.viewName);

      if (!foundTool || !foundTool.view) {
        return undefined;
      }

      return foundTool.view;
    }, "tool_name"
);

</script>

<template>
  <TwoALayout>
    <component :is="renderedView"></component>
  </TwoALayout>
</template>