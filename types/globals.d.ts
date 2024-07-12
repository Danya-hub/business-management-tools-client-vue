import {TelephoneType} from "@/store/types/TelephoneType";

declare global {
    interface Window {
        onloadCallback: () => void;
    }
}

declare module 'yup' {
    interface StringSchema {
        tel(errorMessage: string, code: () => string | undefined): StringSchema;
        telOrEmail(
            errorMessage: {
                tel: string,
                email: string,
            },
            options: () => ({
                isTel: boolean,
                code: string | undefined,
            }),
        ): StringSchema;
    }
}

export {}