<script setup lang="ts">
import {useForm} from "vee-validate";

import {appName} from "~/config/process.ts";

import ChildSwitcher, {ChildType} from "@/components/UI/ChildSwitcher/ChildSwitcher.vue";
import Channel from "@/components/views/User/Signin/Channel.vue";
import ConfirmEmail from "@/components/views/User/Signin/ConfirmEmail.vue";
import ConfirmTel from "@/components/views/User/Signin/ConfirmTel.vue";

import {DataSubmittedSignupFormType, useUserStore} from "@/store/user.ts";

const userStore = useUserStore();
const {handleSubmit, meta} = useForm();

const submitForm = handleSubmit((data: unknown) => {
  userStore.signin(data as DataSubmittedSignupFormType);
});

const sections: ChildType[] = [
  () => Channel,
  (props: object | undefined) => {
    if (!props
        || !('isTel' in props)
        || !('inputValue' in props)
    ) {
      return ConfirmEmail;
    }

    return props.isTel ? ConfirmTel : ConfirmEmail;
  },
];
</script>

<template>
  <div class="p-6 shadow-xl col-span-3 overflow-y-scroll overflow-x-hidden">
    <h2 class="text-2xl mt-4">Авторизация <b>{{ appName }}</b></h2>
    <form
        @submit.prevent="submitForm"
    >
      <ChildSwitcher
          :children="sections"
          v-bind="{
            meta,
          }"
      ></ChildSwitcher>
    </form>
    <router-link
        to="/help-center"
        class="text-blue-700 text-center block"
    >Нужна помощь?</router-link>
  </div>
</template>

<style scoped>

</style>