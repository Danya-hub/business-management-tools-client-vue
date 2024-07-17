import {defineStore} from "pinia";
import {AxiosResponse} from "axios";

import axios from "@/http/axios.ts";

import {StoredEventType, UnpackedEventType} from "@/store/types/EventType.ts";

export type EventStateType = {
    events: StoredEventType[];
    error: Error | null;
};

export const useEventStore=  defineStore('events', {
    state(): EventStateType {
        return {
            events: [],
            error: null,
        };
    },
    actions: {
        async init(): Promise<void> {
            try {
                const storedServices: AxiosResponse<StoredEventType[]> = await axios.get('/src/store/states/events.json');

                this.events = storedServices.data;
                this.error = null;
            } catch (e) {
                this.error = e as Error;
            }
        },
        async addEvent(newEvent: Partial<UnpackedEventType>): Promise<StoredEventType[]> {
            this.events.push({
                ...newEvent,
                id: Date.now(),
                description: '',
                start: newEvent.start!.getTime(),
                finish: newEvent.finish!.getTime(),
            } as Required<StoredEventType>);

            return this.events;
        },
    }
});