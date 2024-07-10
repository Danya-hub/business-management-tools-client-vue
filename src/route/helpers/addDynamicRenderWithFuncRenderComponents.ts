import {VNode} from "vue";

import router from "@/route";
import recursiveRenderElement from "@/route/helpers/recursiveRenderElem.ts";
import {UnpackedViewType} from "@/store/types/ViewType";

export default function addDynamicRenderWithFuncRenderComponents(
    dynamicRoute: UnpackedViewType,
    beforeMount: (renderedElem: VNode) => VNode,
) {
    const renderedElem = recursiveRenderElement(dynamicRoute.content_view.content);

    router.addRoute({
        name: dynamicRoute.name,
        path: dynamicRoute.path,
        component: beforeMount(renderedElem),
    });
}