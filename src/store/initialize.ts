import {useContentViewStore} from "@/store/contentViews.ts";
import {useViewStore} from "@/store/views.ts";
import {useServiceStore} from "@/store/services.ts";
import {useToolStore} from "@/store/tools.ts";
import {useThemeStore} from "@/store/themes.ts";
import {useTelephoneStore} from "@/store/telephones.ts";

export default (): Promise<void>[] => ([
    useContentViewStore().init(),
    useViewStore().init(),
    useServiceStore().init(),
    useToolStore().init(),
    useThemeStore().init(),
    useTelephoneStore().init(),
]);