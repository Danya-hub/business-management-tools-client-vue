<script setup lang="ts">

import {useField} from "vee-validate";
import {boolean} from "yup";
import { RecaptchaV2 } from "vue3-recaptcha-v2";

import {i18n} from "@/hooks/useLang.ts";
import InputError from "@/components/UI/Form/InputError.vue";

const emit = defineEmits<{
  (e: 'check', checked: boolean): void
}>();

const {handleChange, errorMessage} = useField(
    'reCaptcha',
    boolean().required(i18n.global.t('auth_recaptcha')),
    {
      type: 'checkbox',
      checkedValue: true,
      uncheckedValue: false,
    });

function handleCheck(): void {
  handleChange(true);
  emit('check', true);
}
</script>

<template>
  <RecaptchaV2
    @loadCallback="handleCheck"
  ></RecaptchaV2>
  <InputError class="mb-2">{{ $t(errorMessage ?? '') }}</InputError>
</template>
