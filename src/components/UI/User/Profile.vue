<script setup lang="ts">

import {PropType} from "vue";

import Avatar from "@/components/UI/User/Avatar.vue";
import {StoredUserType} from "@/store/types/UserType";

defineProps({
  user: {
    type: Object as PropType<StoredUserType>,
    required: true,
  }
})

const emit = defineEmits<{
  (e: 'click'): void;
}>();

function handleClick() {
  emit('click');
}
</script>

<template>
  <button
      type="button"
      class="flex items-center"
      @click="handleClick"
  >
    <Avatar class="me-4 w-10" :user="user"></Avatar>
    <b>{{user.email}}</b>
  </button>
</template>