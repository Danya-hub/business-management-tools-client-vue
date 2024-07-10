<script setup lang="ts">
import {PropType} from "vue";
import {UserType} from "@/store/types/UserType";

const props = defineProps({
  user: {
    type: Object as PropType<UserType>,
    required: true,
  },
});

let defaultAvatar: undefined | string = undefined;

if (!props.user?.avatar) {
  defaultAvatar = `https://ui-avatars.com/api/?name=${props.user?.first_name}+${props.user?.last_name}`;
}
</script>

<template>
  <div class="w-10 h-10 rounded-full overflow-hidden">
    <img :src="user?.avatar || defaultAvatar" alt="user-avatar" class="w-full h-full">
  </div>
</template>