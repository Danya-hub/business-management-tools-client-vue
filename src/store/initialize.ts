import {useContentViewStore} from "@/store/contentViews.ts";
import {useViewStore} from "@/store/views.ts";
import {useServiceStore} from "@/store/services.ts";
import {useToolStore} from "@/store/tools.ts";
import {useThemeStore} from "@/store/themes.ts";
import {useTelephoneStore} from "@/store/telephones.ts";
import {useUserStore} from "@/store/user.ts";
import {useTaskStore} from "@/store/tasks.ts";
import {useEventStore} from "@/store/events.ts";

export default (): Promise<void>[] => ([
    useContentViewStore().init(),
    useViewStore().init(),
    useServiceStore().init(),
    useToolStore().init(),
    useThemeStore().init(),
    useTelephoneStore().init(),
    useUserStore().init(),
    useTaskStore().init(),
    useEventStore().init(),
]);