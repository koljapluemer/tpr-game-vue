// a high level parser actually opening the data files required 
// (maybe dynamically in the future?)
// and calls stuff like ThingTemplateParser.ts

import itemData from "@/data/json/items.json"
import levelData from "@/data/json/levels.json"
import topicData from "@/data/json/topics.json"
import { LevelTemplateParser } from "@/models_backend/LevelTemplateParser"
import { ThingTemplateParser } from "@/models_backend/ThingTemplateParser"
import { TopicTemplate } from "@/models_backend/TopicTemplate"
import { TopicTemplateParser } from "@/models_backend/TopicTemplateParser"
import { gameDataStore } from "@/stores/gameData"

export class GameLoader {
    public static loadFromDataSources(): boolean {
        let loadSuccessful = true

        itemData.forEach(item => {
            ThingTemplateParser.parseThingFromDict(item)
        })

        levelData.forEach(level => {
            LevelTemplateParser.parseFromDict(level)
        })

        topicData.forEach(topic => {
            TopicTemplateParser.parseFromDict(topic)
        })

        return loadSuccessful
    }

    public static createGameData() {
        gameDataStore.setTopics(
            TopicTemplate.createTopicsFromBackendClassObjectList(
                TopicTemplate.getAll()
            )
        )
    }

}