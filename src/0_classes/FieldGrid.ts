import { useArrayUtils } from "@/composables/useArrayUtils"
import type { AlchemyAction, Field } from "@/types"
import { getActionsForWhenFieldIsDroppedOnField } from "@/utils/alchemyUtils"


const { getUniqueArray } = useArrayUtils()


export class FieldGrid {
    // TODO: put in constructor
    rows: Field[][] = []

    get cells(): Field[] {
        return this.rows.flat()
    }

    public getActionableActionsOnGrid(): AlchemyAction[] {
        let actions: AlchemyAction[] = []

        this.cells.forEach(senderField => {
            this.cells.forEach(receiverField => {
                actions = actions.concat(getActionsForWhenFieldIsDroppedOnField(senderField, receiverField))
            })
        })
        const uniqueActions = getUniqueArray(actions)
        return uniqueActions
    }


}