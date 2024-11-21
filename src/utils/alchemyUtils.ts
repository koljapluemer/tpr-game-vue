import { capabilityClick, capabilityMove, capabilityPartnered, type Capability, type CapabilityClick, type CapabilityMove, type CapabilityPartnered } from "@/data/affordances";
import type { AlchemyAction, AlchemyActionClick, AlchemyActionMove, AlchemyActionPartnered, Field, Grid, Item } from "@/types"
import { toRaw } from 'vue';
import { affordancePartnerings, type PassiveAffordance } from "@/data/affordances";

export function IsPartneredCapabilityActionableOnField(affordance: CapabilityPartnered, field: Field): boolean {
    const item = field.card?.item
    let isActionable = false
    const requiredPassiveAffordance: PassiveAffordance = affordancePartnerings[affordance]
    if (requiredPassiveAffordance && item && item.passiveAffordances) {
        if (requiredPassiveAffordance in item.passiveAffordances) {
            isActionable = true
        }
    }
    return isActionable
}

export function IsMoveCapabilityActionableOnField(affordance: CapabilityMove, field: Field): boolean {
    // allow move only on empty fields
    return (field.card === undefined)
}

export function IsClickCapabilityActionable(): boolean {
    // here for consistency, may later have a cooldown timer or whatever
    return true
}

export function getActionsForWhenFieldIsDroppedOnField(senderField: Field, receiverField: Field): AlchemyAction[] {
    const actions: AlchemyAction[] = []
    senderField.card?.item.activeAffordances?.forEach(affordance => {
        if (affordance in capabilityMove) {
            if (IsMoveCapabilityActionableOnField(affordance as CapabilityMove, senderField)) {
                actions.push(makeMoveActionFromField(senderField, receiverField, affordance as CapabilityMove))
            }
        }
        if (affordance in capabilityPartnered) {
            if (IsPartneredCapabilityActionableOnField(affordance as CapabilityPartnered, senderField)) {
                actions.push(makePartneredActionFromField(senderField, receiverField, affordance as CapabilityPartnered))
            }
        }
        // this spams redundant actions becase a new click action is made
        // for each (ignored) receiver field but I don't think it matters too much
        if (affordance in capabilityClick) {
            if (IsClickCapabilityActionable()) {
                actions.push(makeClickActionFromField(senderField, affordance as CapabilityClick))
            }
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

    return actions
}


// not sure if this is ever needed...
export function makeGenericActionFromField(field: Field, affordance: Capability): AlchemyAction {
    return {
        sender: field,
        affordance: affordance,
        senderKeys: structuredClone(toRaw(field.identifiers))
    }
}

export function makeClickActionFromField(field: Field, affordance: CapabilityClick): AlchemyActionClick {
    return {
        sender: field,
        affordance: affordance,
        senderKeys: structuredClone(toRaw(field.identifiers))
    }
}

export function makeMoveActionFromField(senderField: Field, receiverField: Field, affordance: CapabilityMove): AlchemyActionMove {
    return {
        sender: senderField,
        receiver: receiverField,
        affordance: affordance,
        senderKeys: structuredClone(toRaw(senderField.identifiers))
    }
}


export function makePartneredActionFromField(senderField: Field, receiverField: Field, affordance: CapabilityPartnered): AlchemyActionPartnered {
    return {
        sender: senderField,
        receiver: receiverField,
        affordance: affordance,
        senderKeys: structuredClone(toRaw(senderField.identifiers)),
        receiverKeys: structuredClone(toRaw(receiverField.identifiers))
    }
}