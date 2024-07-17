import {AxiosResponse} from "axios";
import {defineStore} from "pinia";

import {StoredTaskType, UnpackedTaskType} from "@/store/types/TaskType.ts";

import axios from "@/http/axios.ts";

export type EventStateType = {
    tasks: StoredTaskType[];
    error: Error | null;
};

export const useTaskStore = defineStore('tasks', {
    state(): EventStateType {
        return {
            tasks: [],
            error: null,
        };
    },
    actions: {
        async init(): Promise<void> {
            try {
                const storedServices: AxiosResponse<StoredTaskType[]> = await axios.get('/src/store/states/tasks.json');

                this.tasks = storedServices.data;
                this.error = null;
            } catch (e) {
                this.error = e as Error;
            }
        },
        async addTask(newTask: Partial<UnpackedTaskType>): Promise<StoredTaskType[]> {
            this.tasks.push({
                ...newTask,
                created_at: Date.now(),
                id: Date.now(),
            } as Required<UnpackedTaskType>);

            return this.tasks;
        },
        filterBy(filteredTasks: StoredTaskType[], filters: any[]): StoredTaskType[] {
            return filteredTasks;
        },
        toggleTaskStatus(changedTask: StoredTaskType): void {
            const indexFoundTask: number = this.tasks.findIndex((task: StoredTaskType): boolean => task.id === changedTask.id);

            this.tasks[indexFoundTask].completed = changedTask.completed;
        },
        removeTask(removedTask: StoredTaskType): void {
            this.tasks = this.tasks.filter((task: StoredTaskType): boolean => task.id !== removedTask.id);
        },
    }
});