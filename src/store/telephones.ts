import {defineStore} from "pinia";
import {AxiosResponse} from "axios";

import axios from "@/http/axios.ts";

import type { TelephoneType } from "@/store/types/TelephoneType"

export type TelephoneStateType = {
    items: TelephoneType[] | [],
    error: Error | null,
};

export const useTelephoneStore = defineStore('telephones', {
    state(): TelephoneStateType {
        return {
            items: [],
            error: null,
        };
    },
    actions: {
        async init(): Promise<void> {
            try {
                const storedServices: AxiosResponse<TelephoneType[]> = await axios.get('/src/store/states/telephones.json');

                this.items = storedServices.data;
                this.error = null;
            } catch (e) {
                this.error = e as Error;
            }
        },
    }
});