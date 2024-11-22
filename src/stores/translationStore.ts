import { LanguageCode, type LanguageCodeType } from '@/types'
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
    activeLanguageCode: LanguageCode.Arabic,

    addMissingTranslationKey(key: string) {
        if (!this.missingTranslationKeys.includes(key)) {
            this.missingTranslationKeys.push(key)
            this.logMissingTranslationKeys()
        }
    },

    changeLangCode(code: LanguageCodeType) {
        console.log('code changed', code)
        this.activeLanguageCode = code
    },

    addMissingTranslationText(key: string) {
        const tt: TranslationText = {
            key: key,
            languageCode: this.activeLanguageCode!
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