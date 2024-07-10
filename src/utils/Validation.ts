class Validation {
    isTel(value: string): boolean {
        return /^[()|\-|\d]+$/.test(value);
    }
}

export default new Validation();