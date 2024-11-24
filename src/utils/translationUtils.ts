import translationData from '@/assets/translations/translations.json'
import { topics } from '@/data/levelTemplates'
import { translationStore } from '@/stores/translationStore'
import type { Grid } from '@/types'
import { getGridFromLevelTemplate } from './gridUtils'
import { getLevelTemplateByID } from './levelUtils'
import { getActionableActionsOnGrid } from './alchemyUtils'
import { getAvailableQuestsBasedOnLevel, getQuestKey } from './questUtils'
import { useArrayUtils } from '@/composables/useArrayUtils'

const { getRandomInt, getUniqueArray } = useArrayUtils();

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

export function logRequiredTranslationKeysForGame() {
    const questKeys: string[] = [] 
    topics.forEach(topic => {
        topic.progressions.forEach(progression => {
            progression.forEach(levelName => {
                const level = getLevelTemplateByID(levelName)
                if (level) {
                    const gridsToPlayThrough: Grid[] = []
                    // make a bunch to catch some different random configs
                    gridsToPlayThrough.push(getGridFromLevelTemplate(level))
                    gridsToPlayThrough.push(getGridFromLevelTemplate(level))
                    gridsToPlayThrough.push(getGridFromLevelTemplate(level))
                    gridsToPlayThrough.push(getGridFromLevelTemplate(level))
                    gridsToPlayThrough.push(getGridFromLevelTemplate(level))

                    gridsToPlayThrough.forEach( grid =>{
                        let actions = getActionableActionsOnGrid(grid)
                        // console.log('actions', actions)
                        while (actions.length > 0) {
                            const quests = getAvailableQuestsBasedOnLevel(level, grid, false)
                            // console.log('quests', quests)
                            quests.forEach(quest => {
                                questKeys.push(getQuestKey(quest))
                            })
                            // set a random field undefined to simulate actions
                            const randomRowIndex = getRandomInt(0, grid.length - 1)
                            const randomColIndex = getRandomInt(0, grid[0].length - 1) 
                            grid[randomRowIndex][randomColIndex].card = undefined
                            actions =  getActionableActionsOnGrid(grid)
                        }
                    })
                }
            })
        })
    })
    console.warn('KEYS', questKeys)
}