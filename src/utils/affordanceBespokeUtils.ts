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
    let senderCard = senderField.card
    let receiverCard = receiverField.card
    if (senderCard && receiverCard) {
        console.log('got sender and receiver')
        // CUTTING
        if (affordance === CapabilityPartnered.Cuts) {
            const cardWithCutItem = getCardBasedOnItemId(receiverField.card?.item.load_when_cut)
            if (cardWithCutItem) {
                receiverCard = cardWithCutItem
            }
            return
        }
        // STORAGE
        if (senderCard.item.activeAffordances?.includes(CapabilityPartnered.StoresInSmall)
            || senderCard.item.activeAffordances?.includes(CapabilityPartnered.StoresInMedium)
            || senderCard.item.activeAffordances?.includes(CapabilityPartnered.StoresInLarge)
        ) {
            senderCard = undefined
            return
        }
        // LOCK/UNLOCK
        console.log('aff:', senderCard.item.activeAffordances)
        if (senderCard.item.activeAffordances?.includes(CapabilityPartnered.Locks)) {
            if (receiverField.card?.item.load_when_locked) {
                const newCardWithLockedItem = getCardBasedOnItemId(receiverField.card?.item.load_when_locked)
                if (newCardWithLockedItem) {
                    receiverCard = newCardWithLockedItem
                }
            }
            return
        }
        if (senderCard.item.activeAffordances?.includes(CapabilityPartnered.Unlocks)) {
            console.log('handle unlock')
            if (receiverField.card?.item.load_when_locked) {
                const newCardWithUnlockedItem = getCardBasedOnItemId(receiverField.card?.item.load_when_unlocked)
                if (newCardWithUnlockedItem) {
                    receiverCard = newCardWithUnlockedItem
                }
            }
            return
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