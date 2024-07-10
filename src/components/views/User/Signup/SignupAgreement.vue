<script setup lang="ts">
import {useField} from "vee-validate";

import Checkbox from "@/components/UI/Form/Checkbox.vue";
import {boolean} from "yup";
import {i18n} from "@/hooks/useLang.ts";
import InputError from "@/components/UI/Form/InputError.vue";
import {computed} from "vue";

const checkboxes = {
  ads: useField('ads', boolean().required(i18n.global.t('auth_signup_agreement_required')), {
    type: 'checkbox',
    checkedValue: true,
    uncheckedValue: false,
  }),
  webinars: useField('webinars', boolean().required(i18n.global.t('auth_signup_agreement_required')), {
    type: 'checkbox',
    checkedValue: true,
    uncheckedValue: false,
  }),
};
const fieldError = computed(() => (checkboxes.webinars.errorMessage.value || checkboxes.ads.errorMessage.value) ?? '');

function handleChecked(target: HTMLInputElement) {
  const field = checkboxes[target.name as keyof typeof checkboxes];

  field.handleChange(!field.checked);
}

</script>

<template>
  <div class="my-7 text-sm">
    <p>Регистрируясь, вы подтверждаете, что принимаете <b>Пользовательское соглашение</b>, даете <b>Поручение</b> и <b>Согласие</b>
      на
      обработку персональных данных.</p>
    <div>
      <Checkbox
          class="my-2"
          name="ads"
          value="Я соглашаюсь получать рекламно-информационные материалы в соответствии с Соглашением"
          @check="handleChecked"
      ></Checkbox>
      <Checkbox
          class="my-2"
          name="webinars"
          value="Я хочу получать приглашения на бесплатные вебинары"
          @check="handleChecked"
      ></Checkbox>
    </div>
    <InputError class="mb-2">{{ $t(fieldError) }}</InputError>
  </div>
</template>