import { affordancePairs } from "@/data/affordances"
import type { AlchemyAction, Field, Grid, Item } from "@/types"
import { activeAffordanceIsActionableOnItem } from "./affordanceUtils"
import { toRaw } from 'vue';

export function getActionableActionsOnGrid(grid: Grid): AlchemyAction[] {
    const actions: AlchemyAction[] = []

    const fieldsWithCards: Field[] = []
    grid.forEach(row => {
        row.forEach(cell => {
            if (cell.card) {
                fieldsWithCards.push(cell)
            }
        })
    })

    fieldsWithCards.forEach(field => {
        field.card?.item.activeAffordances?.forEach(affordance => {
            // indepdent affordance (like move)
            if (affordancePairs[affordance] === undefined) {
                const action: AlchemyAction = {
                    sender: field,
                    affordance: affordance,
                    senderKeys: structuredClone(toRaw(field.identifiers))
                }
                actions.push(action)
            } else {
                // affordances needing another to work
                fieldsWithCards.forEach(receiverField => {
                    if (receiverField.card && activeAffordanceIsActionableOnItem(affordance, receiverField.card.item)) {
                        const action: AlchemyAction = {
                            sender: field,
                            affordance: affordance,
                            senderKeys: structuredClone(toRaw(field.identifiers)),
                            receiver: receiverField,
                            receiverKeys: structuredClone(toRaw(receiverField.identifiers))
                        }
                        actions.push(action)
                    }
                })
            }


        })

    })
    return actions

}