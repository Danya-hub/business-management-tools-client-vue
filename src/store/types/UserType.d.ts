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
};

export type DataSubmittedSigninFormType = {
    emailOrTel: string,
    telCode: string | null,
    password: string,
};

export type DataSubmittedResetPasswordFormType = {
    emailOrTel: string,
    telCode: string | null,
}