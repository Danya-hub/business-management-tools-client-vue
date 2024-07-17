<script setup lang="ts">

import TaskSelectionPanel from "@/components/partials/Header/Tasks/DailyTasks/TaskSelectionPanel/TaskSelectionPanel.vue";
import AddTaskForm from "@/components/partials/Header/Tasks/DailyTasks/AddTaskForm.vue";
import TaskList from "@/components/partials/Header/Tasks/DailyTasks/TaskList.vue";
</script>

<template>
  <div>
    <TaskSelectionPanel></TaskSelectionPanel>
    <TaskList></TaskList>
    <AddTaskForm></AddTaskForm>
  </div>
</template>

<style scoped>

</style>