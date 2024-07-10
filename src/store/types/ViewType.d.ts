import {StoredContentViewType} from "@/store/types/ContentViewType";

export type StoredViewType = {
    id: number,
    name: string,
    path: string,
    replace: boolean,
    view_type: string,
    content_view_id: number
};

export type UnpackedViewType = {
    id: number,
    name: string,
    path: string,
    replace: boolean,
    view_type: string,
    content_view: StoredContentViewType
};