import * as Yup from "yup";

Yup.addMethod(Yup.string, 'tel', function (errorMessage: string, getValue: () => string) {
    return this.test('tel', errorMessage, async function (value) {
        const {path, createError} = this;

        console.log(value, getValue())

        return (
            createError({
                path,
                message: errorMessage,
            })
        );
    });
});