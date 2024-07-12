<script setup lang="ts">

import {string} from "yup";
import {EyeIcon, EyeSlashIcon} from "@heroicons/vue/24/outline";

import {i18n} from "@/hooks/useLang.ts";

import FormInput from "@/components/UI/Form/FormInput.vue";
import {ref} from "vue";

const isHided = ref<boolean>(true);

function handleToggle(): void {
  isHided.value = !isHided.value;
}
</script>

<template>
  <div
      class="flex items-center"
  >
    <FormInput
        :schema="string()
              .required(i18n.global.t('auth_password_required'))
              .min(8, i18n.global.t('auth_password_min_length'))"
        placeholder="Введите пароль"
        textSize="text-md"
        :type="isHided ? 'password' : 'text'"
        name="password"
        :maxLength="8"
    ></FormInput>
    <button
        type="button"
        class="mx-2"
        @click="handleToggle"
    >
      <EyeSlashIcon v-if="isHided" class="eyeIcon"></EyeSlashIcon>
      <EyeIcon v-else class="eyeIcon"></EyeIcon>
    </button>
  </div>
</template>

<style scoped>
.eyeIcon {
  @apply w-4 h-4;
}
</style>