import {AxiosResponse} from "axios";
import {defineStore} from "pinia";

import type {StoredServiceType, UnpackedServiceType} from "@/store/types/ServiceType";

import {getOutlineIcon} from "@/utils/getOutlineIcon.ts";
import {useViewStore} from "@/store/views.ts";

import axios from "@/http/axios.ts";

export type ServiceStateType = {
    items: StoredServiceType[] | [],
    error: Error | null,
}

export const useServiceStore = defineStore('services', {
    state(): ServiceStateType {
        return {
            items: [],
            error: null,
        }
    },
    actions: {
        async init(): Promise<void> {
            try {
                const storedServices: AxiosResponse<StoredServiceType[]> = await axios.get('/src/store/states/services.json');

                this.items = storedServices.data;
                this.error = null;
            } catch (e) {
                this.error = e as Error;
            }
        },
        findByServiceName(name: string): UnpackedServiceType | undefined {
            return this.unpackedServices.find((service: UnpackedServiceType): boolean => service.view?.name === name);
        },
    },
    getters: {
        unpackedServices(state: ServiceStateType): UnpackedServiceType[] {
            const viewStore = useViewStore();

            return <UnpackedServiceType[]>state.items.map((service: StoredServiceType): UnpackedServiceType | null => {
                if (!service.view_id) {
                    return null;
                }

                return {
                    id: service.id,
                    icon: getOutlineIcon(service.icon),
                    view: viewStore.unpackedViewByForeignId(service.view_id),
                } as UnpackedServiceType;
            }).filter(Boolean);
        }
    }
});