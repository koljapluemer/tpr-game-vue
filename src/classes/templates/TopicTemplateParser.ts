import { isString } from "@/utils/parsingUtils";
import type { TopicTemplate } from "./TopicTemplate";
import type { LevelTemplate } from "./LevelTemplate";

export class TopicTemplateParser {
    public static parseFromDict(dict: Record<string, any>): TopicTemplate | undefined {
        const name = isString(dict["name"]) ? dict["name"] : undefined


        return

    }


    static parseProgressions(dict: Record<string, any>): LevelTemplate[][] {
        const progressions: LevelTemplate[][] = []


        return progressions
    }

    static parseFinalRotation(dict: Record<string, any>): LevelTemplate[] {
        const finalRotation: LevelTemplate[] = []

        return finalRotation
    }

}