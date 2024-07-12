<script setup lang="ts">
import {inject} from "vue";
import {FormContext} from "vee-validate";

import Or from "@/components/UI/Form/Or.vue";
import ReCaptcha from "@/components/UI/Form/ReCaptcha.vue";
import UsingSocialNetwork from "@/components/UI/Form/UsingSocialNetwork.vue";
import NextButton from "@/components/UI/ChildSwitcher/NextButton.vue";
import PasswordInput from "@/components/UI/Form/PasswordInput.vue";
import EmailOrTelInput, {
  InputValueType as EmailOrTelInputValueType,
} from "@/components/UI/Form/EmailOrTelInput.vue";
import {
  FormStateType as SigninFormStateType,
} from "@/components/views/User/Signin/Form.vue";

import emitter from "@/utils/emitter.ts";

const props = defineProps({
  isTel: {
    type: Boolean,
    default: false,
  },
})

const form = inject<FormContext<SigninFormStateType>>('form');

function handleChangeTypeInput(newIsTel: boolean) {
  emitter.emit('childProps', {
    isTel: newIsTel,
  });

  if (!form) {
    return;
  }

  if (!newIsTel) {
    form.setFieldValue('telCode', null);
  }
}

function handleChangeInputValue(newValue: EmailOrTelInputValueType) {
  emitter.emit('childProps', {
    isTel: props.isTel,
  });

  if (!form) {
    return;
  }

  if (props.isTel) {
    form.setFieldValue('telCode', newValue.telCode);
  }
}
</script>

<template>
  <div class="my-8">
    <UsingSocialNetwork></UsingSocialNetwork>
    <Or></Or>
    <div
        class="max-w-md mx-auto"
    >
      <EmailOrTelInput
          :isTel="props.isTel"
          textSize="text-md"
          placeholder="Введите e-mail или телефон"
          @changeTypeInput="handleChangeTypeInput"
          @changeValue="handleChangeInputValue"
      ></EmailOrTelInput>
      <PasswordInput></PasswordInput>
      <ReCaptcha></ReCaptcha>
      <div class="flex flex-col items-center mt-4">
        <NextButton
            :class="[
                'mb-4 mx-4 text-white bg-green-500 font-medium rounded-full uppercase text-sm w-full sm:w-auto px-5 py-2.5 text-center',
                !form?.meta.value.valid ? 'opacity-60 cursor-auto' : 'hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-500',
            ]"
            :disabled="!form?.meta.value.valid"
        >Далее
        </NextButton>
        <div>
          <router-link
              to="/forget-password"
              class="uppercase mb-2 block"
          >Забыли пароль?
          </router-link>
          <router-link
              to="/signup"
              class="uppercase"
          >Зарегестрироваться
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>