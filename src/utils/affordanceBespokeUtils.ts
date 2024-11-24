// if we have no elegant way of handling stuff like cutting, we can at least quarantine in a file

import type { AlchemyAction, Card, CardImage, Field } from "@/types"
import { getItemByID } from "./itemUtils"
import { CapabilityPartnered } from "@/data/affordances"
import type { ItemName } from "@/data/items"
import { scan } from "rxjs"


export function executeActionEffects(action: AlchemyAction) {

    const senderField = action.sender
    const receiverField = action.receiver
    const affordance = action.affordance
    const senderCard = senderField.card
    const receiverCard = receiverField.card
    if (senderCard && receiverCard) {
        // CUTTING
        if (affordance === CapabilityPartnered.Cuts) {
            console.log('cut registered')
            const cardWithCutItem = getCardBasedOnItemId(receiverField.card?.item.load_when_cut)
            if (cardWithCutItem) {
                console.log('loading cut item')
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
        // GIVE/TAKE 
        if (action.affordance === CapabilityPartnered.Giveable) {
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
        // OPEN/CLOSE (PUSH/PULL)
        if (action.affordance === CapabilityPartnered.Pushes) {
            if (receiverField.card?.item.load_when_pushed) {
                const newCardWithItem = getCardBasedOnItemId(receiverField.card?.item.load_when_pushed)
                if (newCardWithItem) {
                    receiverField.card = newCardWithItem
                }
            }
        }
        if (action.affordance === CapabilityPartnered.Pulls) {
            if (receiverField.card?.item.load_when_pulled) {
                const newCardWithItem = getCardBasedOnItemId(receiverField.card?.item.load_when_pulled)
                if (newCardWithItem) {
                    receiverField.card = newCardWithItem
                }
            }
        }
        // BOARDING (e.g. a bus)
        if (action.affordance === CapabilityPartnered.Boards) {
            senderField.card = undefined
        }
        // PARKING
        if (action.affordance === CapabilityPartnered.Parkable) {

            receiverField.card?.images.push(
                {
                    name: senderCard.images[0].name,
                    zIndex: 1,
                    scale: 0.3
                }
            )
            senderField.card = undefined

        }
        // PLACING
        // (currently fruits in bowl)
        if (action.affordance === CapabilityPartnered.Placeable) {
            receiverField.card?.images.push(getImage(senderCard.images[0].name, 0.5))
            senderField.card = undefined
        }

    }
}

function getImage(imageName:string, scale=0.3): CardImage {
    return {
        name:imageName,
        zIndex: 1,
        scale: scale
    }
}

function getCardBasedOnItemId(id: ItemName | undefined, generateSmallImage = false): Card | undefined {
    if (id === undefined) {
        return undefined
    } else {
        const item = getItemByID(id)
        if (item !== undefined) {
            const card = {
                item: item,
                images: [{
                    name: item.images[0],
                    zIndex: 0,
                    scale: generateSmallImage? 0.3 : 1
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