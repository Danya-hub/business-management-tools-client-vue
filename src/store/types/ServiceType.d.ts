import {HTMLAttributes, VNodeProps, FunctionalComponent} from "vue";

import {UnpackedViewType} from "@/store/types/ViewType";

export type StoredServiceType = {
    id: number,
    icon: string,
    view_id: number | null,
};

export type UnpackedServiceType = {
    id: number,
    icon: FunctionalComponent<HTMLAttributes & VNodeProps>,
    view: UnpackedViewType,
};