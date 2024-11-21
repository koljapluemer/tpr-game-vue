import translationData from '@/assets/translations/translations.json'

export function getTranslationForKey(key: string, languageCode: string): string | undefined {
    console.log('translation data', translationData)
    console.log(key, languageCode)
    const sentence = translationData.find((sentence) => sentence.key == key)
    console.log('sentence', sentence)
    if (sentence) {
        const translation: string | undefined = sentence[languageCode]
        console.log('translation', translation)
        return translation
    }
    return undefined
}