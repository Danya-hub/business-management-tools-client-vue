<script setup lang="ts">
import {computed} from "vue";
import {hasFlag} from "country-flag-icons";

import {getFlagSrc} from "@/utils/flag.ts";

const props = defineProps({
  name: {
    type: String,
    required: true,
  }
});

const src = computed(() => getFlagSrc(props.name));
</script>

<template>
  <img
      :alt="props.name"
      :src="src"
  />
</template>