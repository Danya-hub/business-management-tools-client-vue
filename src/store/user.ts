import axios from "@/http/axios.ts";
import {defineStore} from "pinia";

import {StoredUserType} from "@/store/types/UserType";

export type InputErrorType = {
    input_id: string,
    message: string,
};

export type UserStateType = {
    data: StoredUserType | null,
    error: InputErrorType | Error | null,
}

export type DataSubmittedSignupFormType = {
    emailOrTel: string,
    telCode: string | null,
    password: string,
};

export const useUserStore = defineStore('user', {
    state(): UserStateType {
        return {
            data: null,
            error: null,
        }
    },
    actions: {
        async findBy(
            predicate: (user: StoredUserType) => boolean,
        ): Promise<StoredUserType | undefined> {
            return await axios.get('/src/store/states/users.json')
                .then((res) => {
                    if (!Array.isArray(res.data)) {
                        throw new Error('Something is wrong');
                    }

                    return res.data.find(predicate)
                });
        },
        async init(): Promise<void> {
            const parsedUserId: number = Number(localStorage.getItem('user_id'));

            if (!parsedUserId) {
                return;
            }

            try {
                const foundUser: StoredUserType | undefined = await this.findBy((user: StoredUserType) => user.id === parsedUserId);

                if (!foundUser) {
                    throw new Error('user_not_exists');
                }

                this.data = foundUser;
                this.error = null;
            } catch (e) {
                this.error = e as Error;
            }
        },
        async signin(payload: DataSubmittedSignupFormType): Promise<void> {
            try {
                const storedUser: StoredUserType | undefined = await axios.get('/src/store/states/users.json')
                    .then((res) => {
                        if (!Array.isArray(res.data)) {
                            return Promise.reject({
                                input_id: 'emailOrTel',
                                message: 'sth_wrong',
                            })
                        }

                        return res.data.find((user: StoredUserType) =>
                            (user.email === payload.emailOrTel
                                || user.telephone.number === payload.emailOrTel && user.telephone.code === payload.telCode)
                            && user.password === payload.password)
                    });

                if (!storedUser) {
                    throw ({
                        input_id: 'emailOrTel',
                        message: 'user_not_exists',
                    })
                }

                this.data = storedUser;
                this.error = null;

                localStorage.setItem('user_id', String(storedUser.id));
            } catch (e) {
                this.error = e as InputErrorType;
            }
        },
        async signup(payload: DataSubmittedSignupFormType): Promise<void> {
            console.log(payload);
        }
    }
});