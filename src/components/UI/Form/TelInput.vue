<script setup lang="ts">

import {string, StringSchema} from "yup";

import {i18n} from "@/hooks/useLang.ts";
import {TelephoneType} from "@/store/types/TelephoneType";

import TelSelect, {MountStatesType} from "@/components/UI/Form/TelSelect.vue";
import FormInput from "@/components/UI/Form/FormInput.vue";
import {PropType, ref, useAttrs} from "vue";

const telCode = ref<TelephoneType | null>(null);
const inputError = ref<string | undefined>(undefined);
const attrs = useAttrs();

defineProps({
  schema: {
    type: Object as PropType<StringSchema>,
    required: true,
  }
});

const emit = defineEmits<{
  (e: 'select', selected: TelephoneType): void,
  (e: 'change', value: string): void,
}>();

function handleSelect(selected: TelephoneType): void {
  telCode.value = selected;

  emit('select', selected);
}

function handleChange(value: string, errorMessage: string | undefined): void {
  inputError.value = errorMessage;

  emit('change', value);
}

function handleMountTelSelect(states: MountStatesType): void {
  telCode.value = states.defaultTel;
}

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <TelSelect
      class="me-3"
      @select="handleSelect"
      @mount="handleMountTelSelect"
  ></TelSelect>
  <FormInput
      inputRef="telInputRef"
      @change="handleChange"
      :schema="schema
         .tel(i18n.global.t('auth_valid_tel_format'), () => telCode!.code)"
      textSize="text-md"
      type="tel"
      name="tel"
      :maxLength="telCode?.length"
      :canDisplayError="false"
      v-bind="attrs"
  ></FormInput>
</template>

<style scoped>

</style>