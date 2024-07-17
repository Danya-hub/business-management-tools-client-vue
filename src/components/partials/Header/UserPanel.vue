<script setup lang="ts">

import Profile from "@/components/UI/User/Profile.vue";

import {useUserStore} from "@/store/user.ts";
import SimpleModal from "@/components/UI/Modal/SimpleModal.vue";
import {shallowRef} from "vue";
import emitter from "@/utils/emitter.ts";
import ChevronDownIcon from "@heroicons/vue/24/outline/ChevronDownIcon";

const userStore = useUserStore();
const modalIsOpened = shallowRef<boolean>(false);

function handleClose() {
  modalIsOpened.value = false;
}

emitter.on('userPanelModalCloseEvent', handleClose);
</script>

<template>
  <div
      class="relative"
  >
    <div>
      <Profile
          class="h-full"
          :user="userStore.data"
          @click="handleClose"
      ></Profile>
      <ChevronDownIcon
          class="w-4 ms-2"
      ></ChevronDownIcon>
    </div>
    <SimpleModal
        :isOpened="modalIsOpened"
        closeEvent="userPanelModalCloseEvent"
    ></SimpleModal>
  </div>
</template>

<style scoped>

</style>