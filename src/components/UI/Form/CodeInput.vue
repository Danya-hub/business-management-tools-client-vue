<script setup lang="ts">
import {ref} from "vue";
import {useField} from "vee-validate";
import {string} from "yup";
import {i18n} from "@/hooks/useLang.ts";
import InputError from "@/components/UI/Form/InputError.vue";

const props = defineProps({
  length: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    default: 'code',
  }
});

const {errorMessage, handleChange} = useField(
    'code',
    string()
        .required(i18n.global.t('required_code'))
        .min(props.length, i18n.global.t('min_length_code')),
);
const codeInputValue = ref<string[]>([]);

function handleInput(e: Event, inputIndex: number): void {
  const target = e.target as HTMLInputElement;

  if (target.value.length && target.nextElementSibling instanceof HTMLInputElement) {
    target.nextElementSibling.focus();
  } else if (!target.value.length && target.previousElementSibling instanceof HTMLInputElement) {
    target.previousElementSibling.focus();
  }

  codeInputValue.value[inputIndex] = target.value;

  handleChange(codeInputValue.value.join(''));
}
</script>

<template>
  <div class="mx-2">
    <div class="flex justify-center">
      <input
          v-for="i in length"
          type="text"
          @input="handleInput($event, i - 1)"
          :key="`${i}_cell`"
          :id="i.toString()"
          class="w-10 h-10 mx-1 border-gray-600 border-2 rounded text-center text-xl"
          maxlength="1"
      >
    </div>
    <InputError
        class="mt-2"
    >{{ $t(errorMessage ?? '') }}</InputError>
  </div>
</template>

<style scoped>

</style>