import type {FunctionalComponent, HTMLAttributes, VNodeProps} from "vue";
import * as Icons from "@heroicons/vue/24/outline";

export function getOutlineIcon(name: string): FunctionalComponent<HTMLAttributes & VNodeProps> {
    return Icons[name as keyof typeof Icons];
}