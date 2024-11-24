import { RotationMode, type LearningDataForTopic, type LevelTemplate, type Topic } from "@/types";
import { useLocalStorage } from "../useLocalStorage";
import type { LevelTemplateName } from "@/data/levelTemplates";
import { getLevelTemplateByID } from "@/utils/levelUtils";
import { useArrayUtils } from "../useArrayUtils";
import { translationStore } from "@/stores/translationStore";
import { ref } from "vue";

const { pickRandom } = useArrayUtils()


export default function () {
    const { topicLearningData } = useLocalStorage<{ [key: string]: LearningDataForTopic }>('topicLearninData', {})

    const generateKeyForTopicId = (id: string): string => {
        return translationStore.activeLanguageCode + " | " + id
    }

    const updateDataForWithNewTopicData = (data: LearningDataForTopic) => {
        const key = generateKeyForTopicId(data.topicId)
        topicLearningData.value[key] = data
    }

    const getDataForTopicId = (id: string): LearningDataForTopic | undefined => {
        return topicLearningData.value[generateKeyForTopicId(id)]
    }

    const iterateTopicProgress = (topic: Topic): boolean => {
        let goodMomentToChangeTopic = false

        let topicData = getDataForTopicId(topic.id)
        if (topicData === undefined) {
            console.warn("trying to iterate topic data on a topic that's not stored; should be impossible")
            topicData = addTopicDataForTopic(topic)
        }

        // NEXT: count up the indices and what not
        if (topicData.rotationMode === RotationMode.ClimbingProgressions) {
            const maxIndexForProgressions = topic.progressions.length - 1
            const currentProgression = topic.progressions[topicData.indexOfCurrentProgression]
            const maxIndexForLevelsInCurrentProgression = currentProgression.length - 1
            if (topicData.indexOfCurrentLevel < maxIndexForLevelsInCurrentProgression) {
                topicData.indexOfCurrentLevel += 1
            } else {
                if (topicData.indexOfCurrentProgression < maxIndexForProgressions) {
                    topicData.indexOfCurrentLevel = 0
                    topicData.indexOfCurrentProgression += 1
                    goodMomentToChangeTopic = true
                } else {
                    topicData.rotationMode = RotationMode.FinalRotation
                    goodMomentToChangeTopic = true
                }
            }
        } else {
            goodMomentToChangeTopic = Math.random() < 0.3 
        }
        updateDataForWithNewTopicData(topicData)
        return goodMomentToChangeTopic
    }

    const addTopicDataForTopic = (topic: Topic): LearningDataForTopic => {
        const topicData = {
            topicId: topic.id,
            indexOfCurrentProgression: 0,
            indexOfCurrentLevel: 0,
            rotationMode: RotationMode.ClimbingProgressions
        }
        updateDataForWithNewTopicData(topicData)
        return topicData
    }



    const getNextLevelForTopic = (topic: Topic): LevelTemplate | undefined => {
        let topicData = getDataForTopicId(topic.id)
        // handle fresh topics
        if (topicData === undefined) {
            topicData = addTopicDataForTopic(topic)

        }

        let levelId = undefined as LevelTemplateName | undefined
        if (topicData.rotationMode === RotationMode.ClimbingProgressions) {
            levelId = topic.progressions[topicData.indexOfCurrentProgression][topicData.indexOfCurrentLevel]
        } else {
            levelId = pickRandom(topic.finalPracticeRotation)
        }

        if (levelId !== undefined) {
            const level = getLevelTemplateByID(levelId)
            return level
        } else {
            return undefined
        }


    }

    return {
        updateDataForWithNewTopicData,
        getDataForTopicId,
        getNextLevelForTopic,
        iterateTopicProgress,
    }
}