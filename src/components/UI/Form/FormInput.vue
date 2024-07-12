<script setup lang="ts">
import {PropType, ref, watch} from "vue";
import {useField} from "vee-validate";
import {StringSchema} from "yup";

import InputError from "@/components/UI/Form/InputError.vue";

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  schema: {
    type: Object as PropType<StringSchema>,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String
  },
  textSize: {
    type: String,
    default: 'text-sm',
  },
  maxLength: {
    type: Number,
  },
  canDisplayError: {
    type: Boolean,
    default: true,
  },
});

const {value: inputValue, errorMessage, handleChange, validate } = useField(props.name, props.schema);
const inputRef = ref<HTMLInputElement>();

const emit = defineEmits<{
  (e: 'change', value: string, errorMessage: string | undefined): void,
}>();

function onChange(e: Event) {
  const target = e.target as HTMLInputElement;

  handleChange(target.value);
}

watch(inputValue, async () => {
  await validate();

  emit(
      'change',
      inputValue.value as string,
      errorMessage.value,
  );
})

defineExpose({
  inputRef,
});
</script>

<template>
  <div :class="[
      'relative z-0 w-full my-5 group',
      textSize,
    ]">
    <div>
      <input
          :type="type"
          ref="inputRef"
          :name="name"
          :id="name"
          :class="[
             'input peer',
             errorMessage ? 'focus:border-red-600' : 'focus:border-green-600',
          ]"
          placeholder=" "
          :value="inputValue"
          @input="onChange"
          :maxlength="maxLength"
      />
      <label
          :for="name"
          :class="[
               'label peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
               errorMessage ? 'peer-focus:text-red-600' : 'peer-focus:text-green-600',
               textSize,
           ]">
        {{ placeholder }}
      </label>
    </div>
    <div v-if="canDisplayError">
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