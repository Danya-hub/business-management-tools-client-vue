import {AxiosResponse} from "axios";
import {defineStore} from "pinia";

import axios from "@/http/axios.ts";

import type {StoredToolType} from "@/store/types/ToolType";
import type {UnpackedToolType} from "@/store/types/ToolType"

import {getOutlineIcon} from "@/utils/getOutlineIcon.ts";

import {useViewStore} from "@/store/views.ts";

export type ToolStateType = {
    items: StoredToolType[] | [],
    error: Error | null,
}

export const useToolStore = defineStore('tools', {
    state(): ToolStateType {
        return {
            items: [],
            error: null,
        };
    },
    actions: {
        findByToolName(name: string): UnpackedToolType | undefined {
            return this.unpackedTools.find((tool: UnpackedToolType): boolean => tool.view?.name === name);
        },
        async init(): Promise<void> {
            try {
                const storedTools: AxiosResponse<StoredToolType[]> = await axios.get('/src/store/states/tools.json');

                this.items = storedTools.data;
                this.error = null;
            } catch (e) {
                this.error = e as Error;
            }
        },
    },
    getters: {
        unpackedTools(state: ToolStateType): UnpackedToolType[] {
            const viewStore = useViewStore();

            return <UnpackedToolType[]>state.items
                .map((tool: StoredToolType): UnpackedToolType | null => {
                    if (!tool.view_id) {
                        return null;
                    }

                    return {
                        id: tool.id,
                        icon: getOutlineIcon(tool.icon),
                        text: tool.text,
                        hidden: tool.hidden,
                        group: tool.group_id,
                        view: viewStore.unpackedViewByForeignId(tool.view_id),
                    } as UnpackedToolType;
                }).filter(Boolean);
        }
    }
});