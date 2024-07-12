<script setup lang="ts">
import {computed, ref, useAttrs, watch} from "vue";
import {string} from "yup";

import {i18n} from "@/hooks/useLang.ts";
import Validation from "@/utils/Validation.ts";

import FormInput from "@/components/UI/Form/FormInput.vue";
import TelSelect, {MountStatesType} from "@/components/UI/Form/TelSelect.vue";
import {TelephoneType} from "@/store/types/TelephoneType";
import InputError from "@/components/UI/Form/InputError.vue";

const attrs = useAttrs();

const telCode = ref<TelephoneType | null>(null);
const inputValue = ref<string>('');
const inputErrorMessage = ref<string | undefined>(undefined);

const isTel = computed(() => Validation.isTel(inputValue.value));

const emit = defineEmits<{
  (e: 'changeTypeInput', isTel: boolean): void
  (e: 'changeValue', value: string): void
}>();

function handleChange(value: string, errorMessage: string | undefined) {
  inputValue.value = value;
  inputErrorMessage.value = errorMessage;

  emit('changeValue', value);
}

function handleSelect(selected: TelephoneType): void {
  telCode.value = selected;
}


function handleMountTelSelect(states: MountStatesType): void {
  telCode.value = states.defaultTel;
}

watch(isTel, () => {
  emit('changeTypeInput', isTel.value);
});

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div>
    <div class="flex items-center">
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
            name="emailOrTel"
            :canDisplayError="false"
            :schema="string()
              .required(i18n.global.t('auth_tel_or_email_required'))
              .telOrEmail({
                email: i18n.global.t('auth_valid_email_format'),
                tel: i18n.global.t('auth_valid_tel_format'),
              },
              () => ({
                code: telCode!.code,
                isTel: isTel,
              }))"
            textSize="text-md"
            v-bind="Object.assign({}, attrs, isTel ? {
              type: 'tel',
            } : {
              type: 'email',
            })"
        ></FormInput>
      </div>
    </div>
    <InputError class="mb-4">{{ $t(inputErrorMessage ?? '') }}</InputError>
  </div>
</template>
