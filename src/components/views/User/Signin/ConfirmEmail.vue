<script setup lang="ts">
import {inject} from "vue";
import {FormContext} from "vee-validate";
import {ChevronLeftIcon} from "@heroicons/vue/24/outline";

import PrevButton from "@/components/UI/ChildSwitcher/PrevButton.vue";
import CodeInput from "@/components/UI/Form/CodeInput.vue";

const form = inject<FormContext>('form');

function handleClick(): void {
  if (!form) {
    return;
  }

  form.setValues({
    emailOrTel: form.values.emailOrTel,
  });
}

defineOptions({
  inheritAttrs: false,
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
    <p class="mt-6">Мы отправили вам смс с кодом на почту <b>{{ form?.values.emailOrTel }}</b>. Введите код в поле</p>
    <CodeInput
        :length="4"
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
          @click="handleClick"
          :class="[
            'my-5 mx-4 text-white bg-green-500 font-medium rounded-full uppercase text-sm w-full sm:w-auto px-5 py-2.5 text-center',
            !form?.meta.value.valid ? 'opacity-60 cursor-auto' : 'hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-500',
          ]"
          :disabled="!form?.meta.value.valid"
      >Авторизоваться
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>