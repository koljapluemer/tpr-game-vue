import translationData from '@/assets/translations/translations.json'
import { translationStore } from '@/store'

export function getTranslationForKey(key: string, languageCode: string): string | undefined {
    console.log('translation data', translationData)
    console.log(key, languageCode)
    const sentence = translationData.find((sentence) => sentence.key == key)
    console.log('sentence', sentence)
    if (sentence) {
        const translation: string | undefined = sentence[languageCode as keyof typeof sentence]
        console.log('translation', translation)
        if (!translation) {
            translationStore.addMissingTranslationText(key, languageCode)
        }
        return translation
    } else {
        translationStore.addMissingTranslationKey(key)
    }
    return undefined
}