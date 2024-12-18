import type { FieldGrid } from "../FieldGrid";
import type { LevelTemplate } from "./LevelTemplate";




export class LevelTemplateParser {


    public static parseFromDict(dict: Record<string, any>): LevelTemplate | undefined {
        return undefined
    }

    private static passGrid(dict: Record<string, any>): FieldGrid | undefined {
        // validation array of arrays of arrays
        if (!Array.isArray(dict["grid"])) {
            return 
        }

        dict["grid"].forEach(row => {
            if (!Array.isArray(row)) {
                return
            }
        })


    }
}