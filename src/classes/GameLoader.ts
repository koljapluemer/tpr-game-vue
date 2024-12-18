// a high level parser actually opening the data files required 
// (maybe dynamically in the future?)
// and calls stuff like ThingTemplateParser.ts

import itemData from "@/data/json/items.json"
import levelData from "@/data/json/levels.json"
import topicData from "@/data/json/topics.json"
import { ThingTemplateParser } from "./templates/ThingTemplateParser"
import { LevelTemplateParser } from "./templates/LevelTemplateParser"
import { TopicTemplateParser } from "./templates/TopicTemplateParser"
import { TopicTemplate } from "./templates/TopicTemplate"
import { Topic } from "./Topic"

export class GameLoader {
    public static loadFromDataSources():boolean {
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
        TopicTemplate.getAll().forEach(
            template => {
                Topic.createFromTopicTemplate(template)
            }
        )
    }

}