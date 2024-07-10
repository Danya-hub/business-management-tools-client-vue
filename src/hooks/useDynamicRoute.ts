import {h, ref, VNode, watch} from "vue";
import {useRoute} from "vue-router";

import router from "@/route";
import addDynamicRenderWithFuncRenderComponents from "@/route/helpers/addDynamicRenderWithFuncRenderComponents.ts";

import TwoALayout from "@/components/layout/TwoALayout.vue";

import {UnpackedViewType} from "@/store/types/ViewType";

export default function useDynamicRoute(
    defineView: (this: {viewName: string}) => UnpackedViewType | undefined,
    routeParamKey: string
) {
    const selectedView = ref<VNode | null>();
    const route = useRoute();

    function renderDynamicView(viewName: string): void {
        const view: UnpackedViewType | undefined = defineView.call({
            viewName,
        });

        if (!view) {
            return;
        }

        addDynamicRenderWithFuncRenderComponents(
            view,
            (children: VNode) => {
                selectedView.value = children;

                return h(TwoALayout, () => children);
            }
        );
    }

    watch(
        () => route.params[routeParamKey] as string,
        (newViewName: string): void => {
            if (!router.hasRoute(newViewName)) {
                renderDynamicView(newViewName);
            }
        },
        {
            immediate: true,
        }
    )

    return selectedView;
}