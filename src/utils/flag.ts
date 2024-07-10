export function getFlagSrc(country: string | undefined): string {
    if (!country) {
        return '';
    }

    return `http://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`
}