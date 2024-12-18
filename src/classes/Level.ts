import { useArrayUtils } from "@/composables/useArrayUtils"
import { CardField } from "./CardField"
import type { Interaction } from "./Interaction"
import type { LevelTemplate } from "./templates/LevelTemplate"
import type { LevelTemplateCell } from "./templates/LevelTemplateCell"


const { getUniqueArray } = useArrayUtils()


export class Level {
    #grid: CardField[][]

    constructor(rows: CardField[][]) {
        this.#grid = rows
    }

    get cells(): CardField[] {
        return this.grid.flat()
    }

    get grid() {
        return this.#grid
    }

    public static createFromLevelTemplate(template: LevelTemplate): Level {
        return new Level(
            this.getGridFromTemplate(template)
        )
    }

    private static getGridFromTemplate(template: LevelTemplate): CardField[][] {
        return template.gridData.map((templateRow: LevelTemplateCell[]) =>
            templateRow.map((templateCell: LevelTemplateCell) =>
                CardField.createFromLevelTemplateCell(templateCell)
            )
        );
    }

    public getPossibleInteractions(): Interaction[] {
        let actions: Interaction[] = []

        this.cells.forEach(senderField => {
            this.cells.forEach(receiverField => {
                actions = actions.concat(receiverField.getInteractionsGeneratedByDroppingFieldOnMe(senderField))
            })
        })
        const uniqueActions = getUniqueArray(actions)
        return uniqueActions
    }

}