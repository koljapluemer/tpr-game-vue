import { isArray, isString } from "@/utils/parsingUtils";
import { TopicTemplate } from "./TopicTemplate";
import { LevelTemplate } from "./LevelTemplate";

export class TopicTemplateParser {
    public static parseFromDict(dict: Record<string, any>): TopicTemplate | undefined {
        const name = isString(dict["name"]) ? dict["name"] : undefined
        const progressions = this.parseProgressions(dict)
        const finalRotations = this.parseFinalRotation(dict)

        // the implicit equal here is intentional
        // empty arrays or an empty string as name is illegal, not just strict undefined
        // TODO: however, this doesn't fail empty arrays it seems :)
        if (!name || !progressions || !finalRotations) {
            return undefined
        }

        return new TopicTemplate(
            name, progressions, finalRotations
        )

    }


    public static parseProgressions(dict: Record<string, any>): LevelTemplate[][] | undefined {
        const progressions: LevelTemplate[][] = []

        // checking if well formed
        if (!isArray(dict["progressions"])) return undefined
        dict["progressions"].forEach((potentialProgression: any) => {
            if (!isArray(potentialProgression)) return undefined
        })

        // dumb ts double check stuff here because it doesn't remember we check it for being an array
        if (isArray(dict["progressions"])) dict["progressions"].forEach((potentialProgression: any) => {
            const progression:LevelTemplate[] = []
            if (isArray(potentialProgression)) potentialProgression.forEach((potentialLevelTemplateName: any) => {
                if (!isString(potentialLevelTemplateName)) return undefined
                const level = LevelTemplate.getThingByName(potentialLevelTemplateName)
                if (level) progression.push(level)
            })
            progressions.push(progression)
        })

        return progressions
    }

    public static parseFinalRotation(dict: Record<string, any>): LevelTemplate[] | undefined {
        const finalRotation: LevelTemplate[] = []
        if (!isArray(dict["finalRotation"])) return undefined

        dict["finalRotation"].forEach((potentialLevelTemplateName: any) => {
            if (!isString(potentialLevelTemplateName)) return undefined
            const level = LevelTemplate.getThingByName(potentialLevelTemplateName)
            if (level) finalRotation.push(level)

        });


        return finalRotation
    }

}