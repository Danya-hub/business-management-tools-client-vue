<script setup lang="ts">
import {computed, ref, useAttrs} from "vue";
import {object, string} from "yup";

import {i18n} from "@/hooks/useLang.ts";
import Validation from "@/utils/Validation.ts";
import {TelephoneType} from "@/store/types/TelephoneType";

import FormInput from "@/components/UI/Form/FormInput.vue";
import TelSelect, {MountStatesType} from "@/components/UI/Form/TelSelect/TelSelect.vue";

const attrs = useAttrs();
const telCode = ref<string>('');
const inputValue = ref<string>('');
const isTel = computed(() => Validation.isTel(inputValue.value));

const schema = computed(() => isTel
    ? string()
        .required(i18n.global.t('auth_tel_required'))
        .tel(i18n.global.t('auth_valid_tel_format'), () => telCode.value)
    : string()
        .required(i18n.global.t('auth_email_required'))
        .email(i18n.global.t('auth_valid_email_format'))
);

function handleSelect(selected: TelephoneType) {
  telCode.value = selected.code;
}

function handleChange(value: string) {
  inputValue.value = value;
}

function handleMountTelSelect(states: MountStatesType) {
  telCode.value = states.defaultTel.code;
}

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div class="flex items-center">
    {{ isTel }} {{ inputValue }}
    <div v-show="isTel">
      <TelSelect
          class="me-3"
          @select="handleSelect"
          @mount="handleMountTelSelect"
      ></TelSelect>
    </div>
    <div class="w-full overflow-hidden">
      <FormInput
          @change="handleChange"
          v-bind="attrs"
          :schema="schema"
          textSize="text-md"
          :type="isTel ? 'tel' : 'email'"
          :name="isTel ? 'tel' : 'email'"
      ></FormInput>
    </div>
  </div>
</template>