<script setup lang="ts">
import {useForm} from "vee-validate";
import {string} from "yup";

import {appName} from "~/config/process.ts";

import ReCaptcha from "@/components/UI/Form/ReCaptcha.vue";
import Or from "@/components/UI/Form/Or.vue";
import UsingSocialNetwork from "@/components/UI/Form/UsingSocialNetwork.vue";
import FormInput from "@/components/UI/Form/FormInput.vue";
import SignupAgreement from "@/components/views/User/Signup/SignupAgreement.vue";

import {useUserStore, DataSubmittedSignupFormType} from "@/store/user.ts";
import {i18n} from "@/hooks/useLang.ts";

const userStore = useUserStore();
const { handleSubmit } = useForm();

const submitForm = handleSubmit( (data: unknown) => {
  userStore.signup(data as DataSubmittedSignupFormType);
});
</script>

<template>
  <div class="p-6 shadow-xl col-span-3 overflow-y-scroll">
    <h2 class="text-2xl mt-4">Регистрация <b>{{ appName }}</b></h2>
    <div class="my-8">
      <UsingSocialNetwork></UsingSocialNetwork>
      <Or></Or>
      <form
          class="max-w-md mx-auto"
          @submit="submitForm"
      >
        <FormInput
            :schema="string()
              .required(i18n.global.t('auth_email_required'))
              .email(i18n.global.t('auth_valid_email_format'))"
            placeholder="Введите e-mail"
            textSize="text-md"
            type="email"
            name="email"
        ></FormInput>
        <ReCaptcha></ReCaptcha>
        <SignupAgreement></SignupAgreement>
        <div class="flex justify-center items-baseline flex-wrap mt-4">
          <button type="submit"
                  class="mb-4 mx-4 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-full uppercase text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            Начать бесплатно
          </button>
          <router-link to="/signin" class="uppercase">Уже авторизованы?</router-link>
        </div>
      </form>
    </div>
    <router-link to="/help-center" class="text-blue-700 text-center block">Нужна помощь?</router-link>
  </div>
</template>

<style scoped>

</style>