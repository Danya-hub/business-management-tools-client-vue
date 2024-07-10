<script setup lang="ts">
import GoogleSignInButton from "@/components/UI/Form/GoogleSignInButton.vue";
import GithubSignInButton from "@/components/UI/Form/GithubSignInButton.vue";

</script>

<template>
  <div class="flex py-4 w-fit mx-auto">
    <GoogleSignInButton
        class="icon w-8 h-8"
    ></GoogleSignInButton>
    <GithubSignInButton
        class="icon w-8 h-8"
    ></GithubSignInButton>
  </div>
</template>

<style scoped>
  .icon {
    @apply me-3 last:me-0;
  }
</style>