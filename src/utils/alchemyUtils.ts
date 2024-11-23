import type { AlchemyAction, Field, Grid, Item } from "@/types"
import { toRaw } from 'vue';
import { affordancePartnerings, CapabilityPartnered, type PassiveAffordance } from "@/data/affordances";
import { useArrayUtils } from "@/composables/useArrayUtils";

const {getUniqueArray} = useArrayUtils()

export function IsPartneredCapabilityActionableOnField(affordance: CapabilityPartnered, field: Field): boolean {
    const item = field.card?.item
    let isActionable = false
    const requiredPassiveAffordance: PassiveAffordance = affordancePartnerings[affordance]
    if (requiredPassiveAffordance !== undefined && item !== undefined && item.passiveAffordances !== undefined) {
        if (item.passiveAffordances.includes(requiredPassiveAffordance)) {
            isActionable = true
        }
    }
    return isActionable
}


export function getActionsForWhenFieldIsDroppedOnField(senderField: Field, receiverField: Field): AlchemyAction[] {
    const actions: AlchemyAction[] = []
    senderField.card?.item.activeAffordances?.forEach(affordance => {
        if (IsPartneredCapabilityActionableOnField(affordance, receiverField)) {
            actions.push(makePartneredAction(senderField, receiverField, affordance))
        }
    })
    return actions
}



export function getActionableActionsOnGrid(grid: Grid): AlchemyAction[] {
    let actions: AlchemyAction[] = []

    const cells: Field[] = []
    grid.forEach(row => {
        row.forEach(cell => {
            cells.push(cell)
        })
    })

    cells.forEach(senderField => {
        cells.forEach(receiverField => {
            actions = actions.concat(getActionsForWhenFieldIsDroppedOnField(senderField, receiverField))
        })
    })
    const uniqueActions = getUniqueArray(actions)
    return uniqueActions
}



export function makePartneredAction(senderField: Field, receiverField: Field, affordance: CapabilityPartnered): AlchemyAction {
    return {
        sender: senderField,
        receiver: receiverField,
        affordance: affordance,
        senderKeys: structuredClone(toRaw(senderField.identifiers)),
        receiverKeys: structuredClone(toRaw(receiverField.identifiers))
    }
}