import { useArrayUtils } from "@/composables/useArrayUtils"
import type { CardField } from "./CardField"
import type { Interaction } from "./Interaction"


const { getUniqueArray } = useArrayUtils()


export class FieldGrid {
    #rows: CardField[][]

    constructor(rows: CardField[][]) {
        this.#rows = rows
    }

    get cells(): CardField[] {
        return this.rows.flat()
    }

    get rows() {
        return this.#rows
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

    public static createFromJSONDict(dict: any): FieldGrid {
        try {
            return new FieldGrid([])
        } catch (e) {
            console.error('Could not generate FieldGrid from JSON dict; returning empty. Error:', e)
            return new FieldGrid([])
        }
    }


}