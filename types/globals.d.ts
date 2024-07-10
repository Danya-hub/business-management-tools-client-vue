import {TelephoneType} from "@/store/types/TelephoneType";

declare global {
    interface Window {
        onloadCallback: () => void;
    }
}

declare module 'yup' {
    interface StringSchema {
        tel(errorMessage: string, getValue: () => string): StringSchema;
    }
}

export {}