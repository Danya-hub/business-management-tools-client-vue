import {defineStore} from "pinia";
import {AxiosResponse} from "axios";

import type {StoredThemeType} from "@/store/types/ThemeType.ts";

import axios from "@/http/axios.ts";

export type ThemeStateType = {
    items: StoredThemeType[] | [],
    selected: StoredThemeType | undefined,
    error: Error | null,
}

export const useThemeStore = defineStore('themes', {
    state(): ThemeStateType {
        return {
            items: [],
            selected: undefined,
            error: null,
        };
    },
    actions: {
        async init(): Promise<void> {
            try {
                const storedThemes: AxiosResponse<StoredThemeType[]> = await axios.get('/src/store/states/themes.json');

                this.items = storedThemes.data;
                this.selected = storedThemes.data[0];
                this.error = null;
            } catch (e) {
                this.error = e as Error;
            }
        },
        setTheme(id: number): void {
            this.selected = this.items.find((theme: StoredThemeType) => theme.id === id);
        },
    }
});