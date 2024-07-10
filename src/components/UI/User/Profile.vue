<script setup lang="ts">

import {PropType} from "vue";
import ChevronDownIcon from "@heroicons/vue/24/outline/ChevronDownIcon";

import Avatar from "@/components/UI/User/Avatar.vue";
import {UserType} from "@/store/types/UserType";

defineProps({
  user: {
    type: Object as PropType<UserType>,
    required: true,
  }
})
</script>

<template>
  <button type="button" class="flex items-center">
    <Avatar class="me-4 w-10" :user="user"></Avatar>
    <b>{{user.email}}</b>
    <ChevronDownIcon class="w-4 ms-2"></ChevronDownIcon>
  </button>
</template>