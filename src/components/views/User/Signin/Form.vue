<script setup lang="ts">
import {useForm} from "vee-validate";

import {appName} from "~/config/process.ts";

import ChildSwitcher, {ChildType} from "@/components/UI/ChildSwitcher/ChildSwitcher.vue";
import Channel from "@/components/views/User/Signin/Channel.vue";
import ConfirmEmail from "@/components/views/User/Signin/ConfirmEmail.vue";
import ConfirmTel from "@/components/views/User/Signin/ConfirmTel.vue";
import {InputValueType as EmailOrTelInputValueType} from "@/components/UI/Form/EmailOrTelInput.vue";

import {DataSubmittedSignupFormType, useUserStore} from "@/store/user.ts";
import {provide} from "vue";
import route from "@/route";

export type FormStateType = EmailOrTelInputValueType;

const userStore = useUserStore();
const form = useForm<FormStateType>({
  initialValues: {
    emailOrTel: '',
    telCode: null,
  },
  keepValuesOnUnmount: true,
});

const submitForm = form.handleSubmit((data: unknown) => {
  userStore.signin(data as DataSubmittedSignupFormType)
      .then(() => route.replace({
        path: '/',
        replace: true,
      }));
});

const sections: ChildType[] = [
  () => Channel,
  (props: object | undefined) => {
    if (!props
        || !('isTel' in props)
    ) {
      return ConfirmEmail;
    }

    return props.isTel ? ConfirmTel : ConfirmEmail;
  },
];

provide('form', form);

</script>

<template>
  <div class="p-6 shadow-xl col-span-3 overflow-y-scroll overflow-x-hidden">
    <h2 class="text-2xl mt-4">Авторизация <b>{{ appName }}</b></h2>
    <form
        @submit.prevent="submitForm"
    >
      <ChildSwitcher
          :children="sections"
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