// if we have no elegant way of handling stuff like cutting, we can at least quarantine in a file

import type { Field } from "@/types"
import { getItemByID } from "./itemUtils"
import { CapabilityPartnered } from "@/data/affordances"


export function reactToSpecialInteractions(affordance: CapabilityPartnered, senderField: Field, receiverField: Field) {
    const senderCard = senderField.card
    const receiverCard = receiverField.card
    if (senderCard && receiverCard) {
        if (affordance === CapabilityPartnered.Cuts) {
            if (receiverField.card!.item.load_when_cut) {
                const newItem = getItemByID(receiverField.card!.item.load_when_cut)
                console.log('cut img found:', newItem)
                if (newItem) {
                    receiverField.card = {
                        item: newItem,
                        images: [{
                            name: newItem.images[0],
                            zIndex: 0
                        }
                        ]
                    }
                }

            }
        }
        // STORAGE
        if (senderCard.item.activeAffordances?.includes(CapabilityPartnered.StoresInSmall)
            || senderCard.item.activeAffordances?.includes(CapabilityPartnered.StoresInMedium)
            || senderCard.item.activeAffordances?.includes(CapabilityPartnered.StoresInLarge)
        ) {
            senderField.card = undefined
        }
    }
} 