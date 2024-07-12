import {onBeforeMount, ref} from "vue";
import {createI18n} from "vue-i18n";
import axios from "axios";

import {isProduction} from "~/config/process.ts";

import {StoredLocaleType} from "@/store/types/LocaleType";
import {StoredLocaleMessageType} from "@/store/types/LocaleMessageType";

export type MessageType = {
    [key: string]: string,
}

export const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('locale') || '',
    messages: {},
    missingWarn: !isProduction,
    fallbackWarn: !isProduction,
});

export default function useLang() {
    const availableLocales = ref<StoredLocaleType[]>([]);
    const selected = ref<StoredLocaleType | null>(null);

    onBeforeMount(async () => {
        try {
            availableLocales.value = await axios.get('/src/store/states/locales.json')
                .then((res) => res.data);

            if (!Array.isArray(availableLocales.value)
                || Array.isArray(availableLocales.value) && availableLocales.value.length === 0) {
                throw new Error('No available locales found');
            }

            await setLocale(localStorage.getItem('locale') ?? availableLocales.value[0].key);
        } catch (e) {
            console.error('Error loading locales:', e);
        }
    });

    async function setLocale(newLocale: string): Promise<void> {
        if (!availableLocales.value) {
            return;
        }

        const foundAvailableLocale = availableLocales.value
            .find((locale) => locale.key === newLocale);

        if (!foundAvailableLocale) {
            console.warn(`Locale '${newLocale}' not found`);
            return;
        }

        try {
            i18n.global.locale.value = newLocale;
            const message = await axios.get('/src/store/states/locale-messages.json')
                .then((res) => Object.assign({}, ...res.data
                    .filter((message: StoredLocaleMessageType): boolean => message.locale_id === foundAvailableLocale.id)
                    .map((message: StoredLocaleMessageType): MessageType => ({
                            [message.group + '_' + message.key]: message.text
                        }
                    ))));

            i18n.global.setLocaleMessage(newLocale, message);
            selected.value = foundAvailableLocale;

            localStorage.setItem('locale', newLocale);
        } catch (error) {
            console.error(`Error loading messages for locale '${newLocale}':`, error);
        }
    }

    return {
        selected,
        options: availableLocales,
        setLocale,
    }
}
