import axios from "@/http/axios";
import {defineStore} from "pinia";

import {StoredContentViewType} from "@/store/types/ContentViewType";
import {AxiosResponse} from "axios";

export type ContentViewStateType = {
    items: StoredContentViewType[] | [],
    error: Error | null,
}

export const useContentViewStore = defineStore('contentView', {
    state(): ContentViewStateType {
        return {
            items: [],
            error: null,
        }
    },
    actions: {
        findById(id: number): StoredContentViewType | undefined {
            return this.items?.find((contentView: StoredContentViewType): boolean => contentView.id === id);
        },
        async init(): Promise<void> {
            try {
                const storedContentViews: AxiosResponse<StoredContentViewType[]> = await axios.get('/src/store/states/content-views.json');

                this.items = storedContentViews.data;
                this.error = null;
            } catch (e) {
                this.error = e as Error;
            }
        }
    }
});