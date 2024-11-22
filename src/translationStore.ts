import { reactive } from 'vue'

interface TranslationAudio {
    key: string
    languageCode: string
}

interface TranslationText {
    key: string
    languageCode: string
}


export const translationStore = reactive({
    missingTranslationKeys: [] as string[],
    missingTranslationTexts: [] as TranslationText[],
    missingTranslationAudios: [] as TranslationAudio[],
    activeLanguageCode: "et" as string,

    addMissingTranslationKey(key: string) {
        if (!this.missingTranslationKeys.includes(key)) {
            this.missingTranslationKeys.push(key)
            this.logMissingTranslationKeys()
        }
    },

    addMissingTranslationText(key: string, languageCode: string) {
        const tt: TranslationText = {
            key: key,
            languageCode: languageCode
        }
        if (!this.missingTranslationTexts.includes(tt)) {
            this.missingTranslationTexts.push(tt)
            console.warn('missing translation texts', this.missingTranslationTexts)

        }
    },

    logMissingTranslationKeys() {
        console.warn(this.missingTranslationKeys.join('\n'))
    }


})