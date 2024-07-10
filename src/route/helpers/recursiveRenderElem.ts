import {RenderFuncContentType} from "@/store/types/ContentViewType";
import {h, VNode} from "vue";

export default function recursiveRenderElement(element: RenderFuncContentType): VNode {
    const [type, props, children] = element;
    return h(type, props, Array.isArray(children) ?
        children.map((child: RenderFuncContentType) => Array.isArray(child) ? recursiveRenderElement(child) : child)
        : children);
};