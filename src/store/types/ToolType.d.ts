import type {FunctionalComponent, HTMLAttributes, VNodeProps} from "vue";
import {UnpackedViewType} from "@/store/types/ViewType";

export type StoredToolType = {
    id: number,
    icon: string,
    text: string,
    view_id: number | null,
    hidden: boolean,
    group_id: number | null,
}

export type UnpackedToolType = {
    id: number,
    icon: FunctionalComponent<HTMLAttributes & VNodeProps>,
    text: string,
    view: UnpackedViewType | null,
    hidden: boolean,
    group: number | null,
};