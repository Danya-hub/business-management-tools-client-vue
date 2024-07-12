<script setup lang="ts">
import Or from "@/components/UI/Form/Or.vue";
import ReCaptcha from "@/components/UI/Form/ReCaptcha.vue";
import UsingSocialNetwork from "@/components/UI/Form/UsingSocialNetwork.vue";
import EmailOrTelInput from "@/components/UI/Form/EmailOrTelInput.vue";

import {useUserStore} from "@/store/user.ts";
import emitter from "@/utils/emitter.ts";
import NextButton from "@/components/UI/ChildSwitcher/NextButton.vue";
import {PropType} from "vue";
import {FormMeta} from "vee-validate";

const props = defineProps({
  meta: {
    type: Object as PropType<FormMeta<object>>,
    required: true,
  },
  isTel: {
    type: Boolean,
    default: false,
  },
  inputValue: {
    type: String,
    default: '',
  },
})

const userStore = useUserStore();

function handleChangeTypeInput(newIsTel: boolean) {
  emitter.emit('childProps', {
    isTel: newIsTel,
    inputValue: props.inputValue,
  });
}

function handleChangeInputValue(newValue: string) {
  emitter.emit('childProps', {
    isTel: props.isTel,
    inputValue: newValue,
  });
}
</script>

<template>
  <div class="my-8">
    <UsingSocialNetwork></UsingSocialNetwork>
    <Or></Or>
    <div
        class="max-w-md mx-auto"
    >
      <div>
        <EmailOrTelInput
            textSize="text-md"
            placeholder="Введите e-mail или телефон"
            :error="userStore.error"
            @changeTypeInput="handleChangeTypeInput"
            @changeValue="handleChangeInputValue"
        ></EmailOrTelInput>
      </div>
      <ReCaptcha></ReCaptcha>
      <div class="flex flex-col items-center mt-4">
        <NextButton
            :class="[
                'mb-4 mx-4 text-white bg-green-500 font-medium rounded-full uppercase text-sm w-full sm:w-auto px-5 py-2.5 text-center',
                !meta.valid ? 'opacity-60 cursor-auto' : 'hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-500',
            ]"
            :disabled="!meta.valid"
        >Далее
        </NextButton>
        <div>
          <router-link to="/forgot-password" class="uppercase mb-2 block">Забыли пароль?</router-link>
          <router-link to="/signup" class="uppercase">Зарегестрироваться</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>