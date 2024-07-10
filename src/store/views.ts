import {defineStore} from "pinia";

import {StoredViewType, UnpackedViewType} from "@/store/types/ViewType";
import {StoredContentViewType} from "@/store/types/ContentViewType";
import {useContentViewStore} from "@/store/contentViews.ts";
import {AxiosResponse} from "axios";
import axios from "@/http/axios.ts";

type ViewStateType = {
  items: StoredViewType[] | [],
  error: Error | null,
};

export const useViewStore = defineStore('views', {
    state(): ViewStateType {
        return {
            items: [],
            error: null,
        }
    },
    actions: {
        findById(id: number): StoredViewType | undefined {
            return this.items.find((view: StoredViewType): boolean => view.id === id);
        },
        async init(): Promise<void> {
            try {
                const storedViews: AxiosResponse<StoredViewType[]> = await axios.get('/src/store/states/views.json');

                this.items = storedViews.data;
                this.error = null;
            } catch (e) {
                this.error = e as Error;
            }
        },
        unpackedViewByForeignId(id: number): UnpackedViewType | undefined {
            const foundView: StoredViewType | undefined = this.findById(id);

            if (!foundView) {
                return undefined;
            }

            const contentViewStore = useContentViewStore();
            const foundContentView: StoredContentViewType | undefined = contentViewStore.findById(foundView.content_view_id);

            if (!foundContentView) {
                return undefined;
            }

            return {
                id: foundView.id,
                name: foundView.name,
                path: foundView.path,
                replace: foundView.replace,
                view_type: foundView.view_type,
                content_view: foundContentView
            }
        }
    }
});