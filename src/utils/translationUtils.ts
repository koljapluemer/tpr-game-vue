import translationData from '@/assets/translations/translations.json'
import { translationStore } from '@/translationStore'

export function getTranslationForKey(key: string, languageCode: string): string | undefined {
    const sentence = translationData.find((sentence) => sentence.key == key)
    if (sentence) {
        const translation: string | undefined = sentence[languageCode as keyof typeof sentence]
        if (!translation) {
            translationStore.addMissingTranslationText(key, languageCode)
        }
        return translation
    } else {
        translationStore.addMissingTranslationKey(key)
    }
    return undefined
}