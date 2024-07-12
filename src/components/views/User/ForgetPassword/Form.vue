<script setup lang="ts">

import {string} from "yup";
import {useForm} from "vee-validate";

import {i18n} from "@/hooks/useLang.ts";

import Form from "@/components/views/User/Signup/Form.vue";
import FormInput from "@/components/UI/Form/FormInput.vue";
import ReCaptcha from "@/components/UI/Form/ReCaptcha.vue";

import {DataSubmittedResetPasswordFormType} from "@/store/types/UserType";
import {useUserStore} from "@/store/user.ts";

const userStore = useUserStore();
const {handleSubmit, meta} = useForm();

const submitForm = handleSubmit((data: unknown) => {
  userStore.resetPassword(data as DataSubmittedResetPasswordFormType);
});
</script>

<template>
  <div class="p-6 shadow-xl col-span-3 overflow-y-scroll overflow-x-hidden">
    <div class="mt-4">
      <h2 class="text-2xl mb-4">Сброс пароля</h2>
      <p>Введите e-mail и мы вам отправим смс со ссылкой на сброс пароля</p>
    </div>
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
      <div class="flex justify-center items-baseline flex-wrap mt-4">
        <button
            type="submit"
            :class="[
            'my-5 mx-4 text-white bg-green-500 font-medium rounded-full uppercase text-sm w-full sm:w-auto px-5 py-2.5 text-center',
            !meta.valid ? 'opacity-60 cursor-auto' : 'hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-500',
          ]"
            :disabled="!meta.valid"
        >Отправить
        </button>
        <router-link to="/signin" class="uppercase">Вспомнили?</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>