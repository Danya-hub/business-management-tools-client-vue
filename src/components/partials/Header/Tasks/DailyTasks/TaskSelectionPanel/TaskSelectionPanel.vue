<script setup lang="ts">

import {computed, shallowRef} from "vue";
import {MagnifyingGlassIcon} from "@heroicons/vue/24/outline";
import {useForm} from "vee-validate";
import {string} from "yup";

import Form from "@/components/views/User/ForgetPassword/Form.vue";
import SimpleModal from "@/components/UI/Modal/SimpleModal.vue";
import TextInput from "@/components/UI/Form/TextInput.vue";
import CloseButton from "@/components/UI/Buttons/CloseButton.vue";
import ActionButton from "@/components/UI/Buttons/ActionButton.vue";
import InputError from "@/components/UI/Form/InputError.vue";
import ModalTaskTable from "@/components/partials/Header/Tasks/DailyTasks/TaskSelectionPanel/ModalTaskTable.vue";

import emitter from "@/utils/emitter.ts";

import {i18n} from "@/hooks/useLang.ts";
import {useTaskStore} from "@/store/tasks.ts";
import {StoredTaskType} from "@/store/types/TaskType.ts";

const existTasksModalIsOpened = shallowRef<boolean>(false);
const {errorBag, defineField, handleSubmit, resetForm} = useForm({
  validationSchema: {
    searchTasksInput: string()
        .required(i18n.global.t('search_value_required')),
  },
});
const [searchTaskInputValue, searchTaskInputProps] = defineField('searchTasksInput');

function handleOpenListOfExistTasks(value: boolean) {
  existTasksModalIsOpened.value = value;
  resetForm();
}

const onSubmit = handleSubmit((values: unknown) => {
  console.log(values)
});

const taskStore = useTaskStore();
const filteredTasks = computed(() => taskStore.filterBy(taskStore.tasks, []));

emitter.on('existTasksModalCloseEvent', handleOpenListOfExistTasks);

function handleRemoveTask(task: StoredTaskType) {
  taskStore.removeTask(task);
}

function handleToggleStatusTask(task: StoredTaskType) {
  task.completed = !task.completed;

  taskStore.toggleTaskStatus(task);
}
</script>

<template>
  <div class="flex justify-between items-center p-2 rounded bg-blue-300">
    <span>Задачи на день</span>
    <div>
      <button
          type="button"
          class="border-b border-dashed border-black text-xs"
          @click="handleOpenListOfExistTasks(true)"
      >Выбрать из списка
      </button>
      <SimpleModal
          class="shadow w-[340px]"
          closeEvent="existTasksModalCloseEvent"
          :isOpened="existTasksModalIsOpened"
          :hasCloseButton="false"
      >
        <form
            @submit="onSubmit"
        >
          <div class="flex">
            <TextInput
                class="placeholder:text-sm"
                placeholder="поиск задач"
                v-model="searchTaskInputValue"
                v-bind="searchTaskInputProps"
            ></TextInput>
            <ActionButton
                type="submit"
                class="border border-gray-400 ms-1 self-baseline"
            >
              <MagnifyingGlassIcon
                  class="w-4 h-4"
              ></MagnifyingGlassIcon>
            </ActionButton>
          </div>
          <InputError
              v-if="errorBag.searchTasksInput"
          >{{ $t(errorBag.searchTasksInput[0]) }}</InputError>
        </form>
        <ModalTaskTable
            :items="filteredTasks"
            @remove="handleRemoveTask"
            @toggleStatus="handleToggleStatusTask"
        ></ModalTaskTable>
        <CloseButton
            class="mx-auto mt-2 text-red-500"
            @click="handleOpenListOfExistTasks(false)"
        >
          <template #text>
            Закрыть
          </template>
        </CloseButton>
      </SimpleModal>
    </div>
  </div>
</template>

<style scoped>

</style>