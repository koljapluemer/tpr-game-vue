import type { AlchemyAction, Field, Grid } from "@/types";
import { getItemByID } from "./itemUtils";
import { ActiveAffordance, affordancePairs, PassiveAffordance } from "@/data/affordances";
import { toRaw } from "vue";
import { activeAffordanceIsActionableOnItem } from "./affordanceUtils";

export function handleDropInteraction(senderField: Field | undefined, receiverField: Field): AlchemyAction[] {
    const actions: AlchemyAction[] = []
    // handle drop on empty
    // TODO: kind of outdated, but then again it's just MOVE that's special again
    // will have to take special care with other stuff requiring no receiver card
    if (receiverField.card === undefined && typeof senderField !== "undefined") {
        console.log('dropping on empty')
        receiverField.card = senderField.card
        senderField.card = undefined

        const action = {
            sender: senderField,
            affordance: ActiveAffordance.MOVABLE,
            senderKeys: structuredClone(toRaw(senderField.identifiers))
        }

        actions.push(action)

    }

    // ALCHEMY 
    if (receiverField.card && senderField) {
        const sender = senderField.card
        const receiver = receiverField.card
        if (sender && receiver && sender.item.activeAffordances) {
            console.log('all affordances', sender.item.activeAffordances)
            // skip everything not needing partner (this is pretty badly abstracted)
            const affordancesRequiringPartner = sender.item.activeAffordances?.filter(affordance => {
                return affordancePairs[affordance] != undefined
            })
            console.log('checking partner affordances', affordancesRequiringPartner)
            console.log('receiver', receiver)

            affordancesRequiringPartner.forEach(affordance => {
                console.log('checking affordance', affordance)
                if (activeAffordanceIsActionableOnItem(affordance, receiver.item)) {
                    console.log('partner found')
                    // checking this again because ts forgot the check we did literally 5 lines ago
                    if (senderField) {
                        const action = {
                            sender: senderField,
                            affordance: affordance,
                            senderKeys: structuredClone(toRaw(senderField.identifiers)),
                            receiver: receiverField,
                            receiverKeys: structuredClone(toRaw(receiverField.identifiers))
                        }
                        actions.push(action)


                        // special treatments:
                        // CUT
                        if (affordance === ActiveAffordance.CUTS) {
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
                        // STORAGE
                        if (sender.item.activeAffordances?.includes(ActiveAffordance.STORES_IN_SMALL)
                            || sender.item.activeAffordances?.includes(ActiveAffordance.STORES_IN_MEDIUM)
                            || sender.item.activeAffordances?.includes(ActiveAffordance.STORES_IN_LARGE)
                        ) {
                            senderField.card = undefined
                        }
                    }

                }
                else {
                    console.log('not a partner')
                }
            })

        }
    }
    return actions
}