// if we have no elegant way of handling stuff like cutting, we can at least quarantine in a file

import type { AlchemyAction, Card, Field } from "@/types"
import { getItemByID } from "./itemUtils"
import { CapabilityPartnered } from "@/data/affordances"
import type { ItemName } from "@/data/items"


export function executeActionEffects(action: AlchemyAction) {
    console.log('execute action effects for action', action)

    const senderField = action.sender
    const receiverField = action.receiver
    const affordance = action.affordance
    const senderCard = senderField.card
    const receiverCard = receiverField.card
    if (senderCard && receiverCard) {
        console.log('got sender and receiver')
        // CUTTING
        if (affordance === CapabilityPartnered.Cuts) {
            const cardWithCutItem = getCardBasedOnItemId(receiverField.card?.item.load_when_cut)
            if (cardWithCutItem) {
                receiverField.card = cardWithCutItem
            }
        }
        // STORAGE
        if (action.affordance === CapabilityPartnered.StoresInSmall
            || action.affordance === CapabilityPartnered.StoresInMedium
            || action.affordance === CapabilityPartnered.StoresInLarge
        ) {
            senderField.card = undefined
        }
        // LOCK/UNLOCK
        if (action.affordance === CapabilityPartnered.Locks) {
            if (receiverField.card?.item.load_when_locked) {
                const newCardWithLockedItem = getCardBasedOnItemId(receiverField.card?.item.load_when_locked)
                if (newCardWithLockedItem) {
                    receiverField.card = newCardWithLockedItem
                }
            }
        }
        if (action.affordance === CapabilityPartnered.Unlocks) {
            if (receiverField.card?.item.load_when_unlocked) {
                const newCardWithUnlockedItem = getCardBasedOnItemId(receiverField.card?.item.load_when_unlocked)
                if (newCardWithUnlockedItem) {
                    receiverField.card = newCardWithUnlockedItem
                }
            }
        }
        // BOARDING (e.g. a bus)
        if (action.affordance === CapabilityPartnered.Boards) {
            senderField.card = undefined
        }

    }
}

function getCardBasedOnItemId(id: ItemName | undefined): Card | undefined {
    if (id === undefined) {
        return undefined
    } else {
        const item = getItemByID(id)
        if (item !== undefined) {
            const card = {
                item: item,
                images: [{
                    name: item.images[0],
                    zIndex: 0
                }
                ]
            }
            return card
        }
    }
    return undefined
}

export function executeMoveToField(originalField: Field, targetField: Field): boolean {
    let moveToEmptyHappened = false
    if (targetField.card === undefined) {
        targetField.card = originalField.card
        originalField.card = undefined
        moveToEmptyHappened = true
    }
    return moveToEmptyHappened
}