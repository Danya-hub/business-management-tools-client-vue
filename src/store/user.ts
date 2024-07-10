import axios from "@/http/axios.ts";
import {defineStore} from "pinia";

import {StoredUserType} from "@/store/types/UserType";
import {AxiosResponse} from "axios";

export type InputErrorType = {
    input_id: string,
    message: Error,
};

export type UserStateType = {
    data: StoredUserType | null,
    error: InputErrorType | null,
}

export type DataSubmittedSignupFormType = {
    email: string,
    ads: boolean,
    webinars: boolean,
    reCaptcha: boolean,
};

export const useUserStore = defineStore('user', {
    state(): UserStateType {
        return {
            data: null,
            error: null,
        }
    },
    actions: {
        async init(): Promise<void> {
            if (localStorage.getItem('user_id')) {
                return;
            }

            try {
                const storedUserId = localStorage.getItem('user_id');
                const parsedUserId = storedUserId !== null ? Number(storedUserId) : null;
                const storedUser: AxiosResponse<StoredUserType> = await axios.get('/src/store/states/user.json')
                    .then((res) => res.data.find((user: StoredUserType) => Number.isInteger(Number(storedUserId)) && user.id === parsedUserId));

                this.data = storedUser.data;
                this.error = null;
            } catch (e) {
                this.error = e as InputErrorType;
            }
        },
        async signin(payload: DataSubmittedSignupFormType): Promise<void> {
            console.log(payload)
        },
        async signup(payload: DataSubmittedSignupFormType): Promise<void> {
            console.log(payload);
        }
    }
});