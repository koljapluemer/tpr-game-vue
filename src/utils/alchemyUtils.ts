import type { Field, Grid } from "@/types";
import { getItemByID } from "./itemUtils";
import { ActiveAffordance, PassiveAffordance } from "@/data/affordances";

export function handleDropInteraction(senderField: Field | undefined, receiverField: Field) {
    // handle drop on empty
    if (receiverField.card === undefined && typeof senderField !== "undefined") {
        console.log('dropping on empty')
        receiverField.card = senderField.card
        senderField.card = undefined

    }


    //   ALCHEMY
    if (receiverField.card !== undefined && senderField !== undefined) {
        const sender = senderField.card
        const receiver = receiverField.card


        //   cutting
        if (sender?.item.activeAffordances !== undefined && receiver.item.passiveAffordances !== undefined && ActiveAffordance.CUTS in sender?.item.activeAffordances && PassiveAffordance.CUTTABLE in receiver.item.passiveAffordances) {
            if (receiver.item.load_when_cut) {
                const newItem = getItemByID(receiver.item.load_when_cut)
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

        senderField = undefined;
    }

}