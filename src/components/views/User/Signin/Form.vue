<script setup lang="ts">

import {appName} from "~/config/process.ts";

import ReCaptcha from "@/components/UI/Form/ReCaptcha.vue";
import Or from "@/components/UI/Form/Or.vue";
import UsingSocialNetwork from "@/components/UI/Form/UsingSocialNetwork.vue";

import {DataSubmittedSignupFormType, useUserStore} from "@/store/user.ts";
import EmailOrTelInput from "@/components/UI/Form/EmailOrTelInput.vue";
import {useForm} from "vee-validate";

const userStore = useUserStore();
const { handleSubmit } = useForm();

const submitForm = handleSubmit( (data: unknown) => {
  userStore.signin(data as DataSubmittedSignupFormType);
});
</script>

<template>
  <div class="p-6 shadow-xl col-span-3 overflow-y-scroll">
    <h2 class="text-2xl mt-4">Авторизация <b>{{ appName }}</b></h2>
    <div class="my-8">
      <UsingSocialNetwork></UsingSocialNetwork>
      <Or></Or>
      <form
          class="max-w-md mx-auto"
          @submit.prevent="submitForm"
      >
        <div>
          <EmailOrTelInput
              textSize="text-md"
              placeholder="Введите e-mail или телефон"
              :error="userStore.error"
          ></EmailOrTelInput>
        </div>
        <ReCaptcha></ReCaptcha>
        <div class="flex flex-col items-center mt-4">
          <button type="submit"
                  class="mb-4 mx-4 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-full uppercase text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            Авторизоваться
          </button>
          <div>
            <router-link to="/forgot-password" class="uppercase mb-2 block">Забыли пароль?</router-link>
            <router-link to="/signup" class="uppercase">Зарегестрироваться</router-link>
          </div>
        </div>
      </form>
    </div>
    <router-link to="/help-center" class="text-blue-700 text-center block">Нужна помощь?</router-link>
  </div>
</template>

<style scoped>

</style>