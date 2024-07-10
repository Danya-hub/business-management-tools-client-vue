import {TelephoneType} from "@/store/types/TelephoneType";

export type StoredUserType = {
    id: number,
    role: string,
    first_name: string,
    last_name: string,
    avatar: string | null,
    password: string,
    email: string,
    telephone: TelephoneType & { number: string }
};