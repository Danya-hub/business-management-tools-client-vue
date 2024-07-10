<script setup lang="ts">
  import {appName} from "~/config/process.ts";

  const year: number = new Date().getFullYear();

</script>

<template>
  <p>&copy; "{{appName}}", {{year}}</p>
</template>