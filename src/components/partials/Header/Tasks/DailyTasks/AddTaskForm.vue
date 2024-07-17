<script setup lang="ts">

import {useForm} from "vee-validate";
import {string} from "yup";
import {PlusIcon} from "@heroicons/vue/24/outline";

import Form from "@/components/views/User/ForgetPassword/Form.vue";
import TextInput from "@/components/UI/Form/TextInput.vue";
import ActionButton from "@/components/UI/Buttons/ActionButton.vue";
import InputError from "@/components/UI/Form/InputError.vue";

import {i18n} from "@/hooks/useLang.ts";
import {useTaskStore} from "@/store/tasks.ts";

export type DailyTaskFormStateType = {
  task: string;
};

const {handleSubmit, errorBag, defineField, resetForm} = useForm<DailyTaskFormStateType>({
  validationSchema: {
    task: string()
        .required(i18n.global.t('form_task_field_required')),
  },
});
const [taskInputValue, taskInputProps] = defineField('task', {
  validateOnBlur: false,
  validateOnChange: true,
});

const taskStore = useTaskStore();

const onSubmit = handleSubmit((values: unknown) => {
  const formData = values as DailyTaskFormStateType;

  taskStore.addTask({
    description: '',
    completed: false,
    title: formData.task,
  }).then(() => {
    resetForm();
  });
});
</script>

<template>
  <form
      class="mt-2"
      @submit="onSubmit"
  >
    <div class="w-full flex">
      <TextInput
          class="w-full me-2 h-auto"
          placeholder="введите текст задачи"
          v-model="taskInputValue"
          v-bind="taskInputProps"
      ></TextInput>
      <ActionButton
          type="submit"
          class="self-baseline border border-gray-400"
      >
        <PlusIcon
            class="w-6 h-6"
        ></PlusIcon>
      </ActionButton>
    </div>
    <InputError v-if="errorBag.task">{{ $t(errorBag.task[0]) }}</InputError>
  </form>
</template>

<style scoped>

</style>