import * as Yup from "yup";

import {useTelephoneStore} from "@/store/telephones.ts";

Yup.addMethod(Yup.string, 'tel', function (errorMessage: string, code: () => string | undefined) {
    return this.test('tel', errorMessage,  function (number) {
        const telephoneStore = useTelephoneStore();
        const {path, createError} = this;

        const _code: string | undefined = code();

        if (!_code) {
            return (
                createError({
                    path,
                    message: errorMessage,
                })
            );
        }

        const foundTelFormat = telephoneStore.findBy('code', _code);

        if (!foundTelFormat) {
            return (
                createError({
                    path,
                    message: errorMessage,
                })
            );
        }

        if (foundTelFormat.length !== number?.length) {
            return (
                createError({
                    path,
                    message: errorMessage,
                })
            );
        }

        return true;
    });
});

Yup.addMethod(Yup.string, 'telOrEmail', function (
    errorMessage: {
        tel: string,
        email: string,
    },
    options: () => ({
        isTel: boolean,
        code: string | undefined,
    })
) {
    return this.test('telOrEmail', errorMessage, function (value) {
        const {
            path,
            createError
        } = this;
        const {
            isTel,
            code,
        } = options();

        if (isTel && code) {
            return Yup.string().tel(errorMessage.tel, () => code).isValidSync(value)
                || createError({
                    path,
                    message: errorMessage.tel
                });
        }

        return Yup.string().email(errorMessage.email).isValidSync(value)
            || createError({
                path,
                message: errorMessage.email
            });
    });
});