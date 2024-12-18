// a high level parser actually opening the data files required 
// (maybe dynamically in the future?)
// and calls stuff like ThingTemplateParser.ts

import itemData from "@/data/json/items.json"
import levelData from "@/data/json/levels.json"
import { ThingTemplateParser } from "./ThingTemplateParser"
import { LevelTemplateParser } from "./LevelTemplateParser"

export class GameLoader {
    public static load():boolean {
        let loadSuccessful = true

        itemData.forEach(item => {
            ThingTemplateParser.parseThingFromDict(item)
        })

        levelData.forEach(level => {
            LevelTemplateParser.parseFromDict(level)
        })

        return loadSuccessful
    } 

}