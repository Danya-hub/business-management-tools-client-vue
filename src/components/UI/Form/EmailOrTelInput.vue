<script setup lang="ts">
import {useField} from "vee-validate";
import {ref, watch} from "vue";
import {string} from "yup";

import {i18n} from "@/hooks/useLang.ts";
import Validation from "@/utils/Validation.ts";

import TelSelect, {MountStatesType} from "@/components/UI/Form/TelSelect.vue";
import {TelephoneType} from "@/store/types/TelephoneType";
import InputError from "@/components/UI/Form/InputError.vue";

export type InputValueType = {
  emailOrTel: string,
  telCode?: string | null,
};

defineProps({
  isTel: {
    type: Boolean,
  },
  placeholder: {
    type: String,
    required: true,
  },
  textSize: {
    type: String,
  }
});

const isTel = ref<boolean>(false);
const telCode = ref<TelephoneType | null>(null);
const inputRef = ref<HTMLInputElement>();

const {value: inputValue, errorMessage, handleChange} = useField(
    'emailOrTel',
    string()
        .required(i18n.global.t('auth_tel_or_email_required'))
        .telOrEmail({
              email: i18n.global.t('auth_valid_email_format'),
              tel: i18n.global.t('auth_valid_tel_format'),
            },
            () => ({
              code: telCode.value?.code,
              isTel: isTel.value,
            }))
);

const emit = defineEmits<{
  (e: 'changeTypeInput', isTel: boolean): void;
  (e: 'changeValue', fields: InputValueType): void;
}>();

function onChange(e: Event) {
  const target = e.target as HTMLInputElement;

  isTel.value = Validation.isTel(target.value);
  handleChange(target.value);

  emit('changeValue', {
    emailOrTel: target.value,
    telCode: telCode.value?.code ?? null,
  });
}

function handleSelect(selected: TelephoneType): void {
  telCode.value = selected;

  emit('changeValue', {
    emailOrTel: inputValue.value as string,
    telCode: selected.code,
  });
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
        <div :class="[
            'relative z-0 w-full my-5 group',
            textSize,
        ]">
          <div>
            <input
                type="text"
                ref="inputRef"
                name="emailOrTel"
                id="emailOrTel"
                :class="[
                   'input peer',
                   errorMessage ? 'focus:border-red-600' : 'focus:border-green-600',
                ]"
                placeholder=" "
                :value="inputValue"
                @input="onChange"
            />
            <label
                for="emailOrTel"
                :class="[
                   'label peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
                   errorMessage ? 'peer-focus:text-red-600' : 'peer-focus:text-green-600',
                   textSize
               ]">
              {{ placeholder }}
            </label>
          </div>
        </div>
      </div>
    </div>
    <div v-if="errorMessage">
      <InputError>{{ $t(errorMessage ?? '') }}</InputError>
    </div>
  </div>
</template>

<style scoped>
.input {
  @apply block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0;
}

.label {
  @apply whitespace-nowrap peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0];
}
</style>