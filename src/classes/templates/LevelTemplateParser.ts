import { isArrayOfStrings, isString } from "@/utils/parsingUtils";
import type { FieldGrid } from "../FieldGrid";
import { LevelTemplate } from "./LevelTemplate";
import { LevelTemplateCell } from "./LevelTemplateCell";
import { ThingTemplate } from "./ThingTemplate";




export class LevelTemplateParser {


    public static parseFromDict(dict: Record<string, any>): LevelTemplate | undefined {
        const grid = this.parseGrid(dict)
        const name = isString(dict["name"]) ? dict["name"] : undefined

        if (!grid || !name) {
            console.warn('data missing, cannot create level template', dict)
            return undefined
        }
        return new LevelTemplate(name, grid, [])
    }

    private static parseGrid(dict: Record<string, any>): LevelTemplateCell[][] | undefined {
        // validation array of arrays of arrays
        if (!Array.isArray(dict["grid"])) {
            return
        }

        dict["grid"].forEach(row => {
            if (!Array.isArray(row)) {
                return
            }
            row.forEach(cell => {
                if (!isArrayOfStrings(cell)) {
                    return
                }
            })
        })

        // generating grid data

        const templateGrid: LevelTemplateCell[][] = []
        dict["grid"].forEach(rowData => {
            const row: LevelTemplateCell[] = []
            rowData.forEach((cellData: string[]) => {
                const cell = LevelTemplateCell.createFromArrayOfThingNames(cellData)
                if (!cell) {
                    console.warn('illegal cell in grid, stopping parse of level template')
                    return undefined
                } else {
                    row.push(cell)
                }
            })
            templateGrid.push(row)
        })
        return templateGrid
    }
}