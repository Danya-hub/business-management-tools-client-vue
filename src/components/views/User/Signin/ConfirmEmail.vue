<script setup lang="ts">
import {ChevronLeftIcon} from "@heroicons/vue/24/outline";

import PrevButton from "@/components/UI/ChildSwitcher/PrevButton.vue";
import CodeInput from "@/components/UI/Form/CodeInput.vue";
import {PropType} from "vue";
import {FormMeta} from "vee-validate";
import NextButton from "@/components/UI/ChildSwitcher/NextButton.vue";

defineProps({
  inputValue: {
    type: String,
    required: true,
  },
  meta: {
    type: Object as PropType<FormMeta<object>>,
    required: true,
  },
});
</script>

<template>
  <PrevButton
      class="mt-5 flex items-center"
  >
    <ChevronLeftIcon
        class="w-4 h-4"
    ></ChevronLeftIcon>
    Назад
  </PrevButton>
  <div>
    <p class="mt-6">Мы отправили вам смс с кодом на почту <b>{{ inputValue }}</b>. Введите код в поле</p>
    <CodeInput
        length="4"
        class="my-4"
    ></CodeInput>
    <div class="flex flex-wrap justify-center items-center">
      <PrevButton
          class="mx-2 flex items-center"
      >
        <ChevronLeftIcon
            class="w-4 h-4"
        ></ChevronLeftIcon>
        Назад
      </PrevButton>
      <button
          type="submit"
          :class="[
            'my-5 mx-4 text-white bg-green-500 font-medium rounded-full uppercase text-sm w-full sm:w-auto px-5 py-2.5 text-center',
            !meta.valid ? 'opacity-60 cursor-auto' : 'hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-500',
          ]"
          :disabled="!meta.valid"
      >Авторизоваться
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>