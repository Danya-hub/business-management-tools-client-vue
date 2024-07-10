import router from "@/route";

type DynamicRouteType = {
    paramKey: string,
    name: string,
}

export default function navigateToDynamicRoute(
    defaultRouteName: string,
    dynamicRoute: DynamicRouteType,
): void {
    if (router.hasRoute(dynamicRoute.name)) {
        router.push({
            name: dynamicRoute.name,
        });
    } else {
        router.push({
            name: defaultRouteName,
            params: {
                [dynamicRoute.paramKey]: dynamicRoute.name,
            }
        });
    }
}