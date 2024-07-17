<script setup lang="ts">

import {useForm} from "vee-validate";
import {string} from "yup";
import {PlusIcon} from "@heroicons/vue/24/outline";

import TimeInput from "@/components/UI/Form/Time/TimeInput/TimeInput.vue";
import TextInput from "@/components/UI/Form/TextInput.vue";
import ActionButton from "@/components/UI/Buttons/ActionButton.vue";
import Checkbox from "@/components/UI/Form/Checkbox.vue";
import InputError from "@/components/UI/Form/InputError.vue";
import EventList from "@/components/partials/Header/Tasks/Events/EventList.vue";

import Time from "@/utils/Time.ts";
import {i18n} from "@/hooks/useLang.ts";

import type {ObjectRange} from "@/utilTypes/Number.ts";
import {useEventStore} from "@/store/events.ts";

export type EventFormStateType = {
  event: string;
  time: ObjectRange<Date>;
};

function defaultValues(): EventFormStateType {
  return {
    event: '',
    time: {
      min: new Date(),
      max: Time.addUnit(
          new Date(),
          'setHours',
          (date: Date) => date.getHours() + 1,
      ),
    },
  };
}

const {defineField, errorBag, handleSubmit, resetForm} = useForm<EventFormStateType>({
  validationSchema: {
    event: string()
        .required(i18n.global.t('form_event_field_required')),
  },
  initialValues: defaultValues(),
});
const [eventInputValue, eventInputProps] = defineField('event', {
  validateOnBlur: false,
  validateOnChange: true,
});
const [timeInputValue] = defineField<'time', ObjectRange<Date>>('time');

const eventStore = useEventStore();

const onSubmit = handleSubmit((values: unknown) => {
  const formData = values as EventFormStateType;

  eventStore.addEvent({
    title: formData.event,
    start: formData.time.min,
    finish: formData.time.max,
  }).then(() => resetForm());
});

function handleSelect(fieldName: keyof ObjectRange<Date>, selected: Date): void {
  timeInputValue.value[fieldName] = selected;
}
</script>

<template>
  <div>
    <div class="p-2 rounded bg-yellow-300 w-full">
      <span>События</span>
    </div>
    <EventList></EventList>
    <form
        class="mt-2 flex"
        @submit="onSubmit"
    >
      <TimeInput
          class="me-2"
          :maxHour="24"
          v-model="timeInputValue.min"
          @select="(value: Date) => handleSelect('min', value)"
      ></TimeInput>
      <TimeInput
          class="me-2"
          :maxHour="24"
          v-model="timeInputValue.max"
          @select="(value: Date) => handleSelect('max', value)"
      ></TimeInput>
      <div
          class="w-full me-2"
      >
        <div
            class="flex"
        >
          <TextInput
              class="me-2 p-2 w-full h-auto"
              placeholder="новое событие"
              v-model="eventInputValue"
              v-bind="eventInputProps"
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
        <div v-if="errorBag.event">
          <InputError>{{ $t(errorBag.event[0]) }}</InputError>
        </div>
        <Checkbox
            class="mt-1"
            name="outOffice"
            value="вне офиса"
        ></Checkbox>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>
