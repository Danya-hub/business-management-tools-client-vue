<script setup lang="ts">
import MagnifyingGlassIcon from "@heroicons/vue/24/outline/MagnifyingGlassIcon";
</script>

<template>
  <form class="flex rounded-full" action="">
    <input type="search" class="bg-transparent p-1 ps-4 w-full text-ellipsis" :placeholder="$t('header_search')">
    <button type="submit" class="p-2 text-black">
      <MagnifyingGlassIcon class="w-4"></MagnifyingGlassIcon>
    </button>
  </form>
</template>