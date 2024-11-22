import translationData from '@/assets/translations/translations.json'
import { translationStore } from '@/stores/translationStore'

export function getTranslationForKey(key: string): string | undefined {
    const sentence = translationData.find((sentence) => sentence.key == key)
    if (sentence) {
        const translation: string | undefined = sentence[translationStore.activeLanguageCode as keyof typeof sentence]
        if (!translation) {
            translationStore.addMissingTranslationText(key)
            return undefined
        }
        return translation
    } else {
        translationStore.addMissingTranslationKey(key)
        return undefined

    }
}

