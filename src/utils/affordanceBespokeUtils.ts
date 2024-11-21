// if we have no elegant way of handling stuff like cutting, we can at least quarantine in a file

import { capabilityPartnered, type Capability } from "@/data/affordances"
import type { Field } from "@/types"
import { getItemByID } from "./itemUtils"


export function reactToSpecialInteractions(affordance: Capability, senderField: Field, receiverField: Field) {
    const senderCard = senderField.card
    const receiverCard = receiverField.card
    if (senderCard && receiverCard) {
        if (affordance === capabilityPartnered.Cuts) {
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
        if (senderCard.item.activeAffordances?.includes(capabilityPartnered.StoresInSmall)
            || senderCard.item.activeAffordances?.includes(capabilityPartnered.StoresInMedium)
            || senderCard.item.activeAffordances?.includes(capabilityPartnered.StoresInLarge)
        ) {
            senderField.card = undefined
        }
    }
} 