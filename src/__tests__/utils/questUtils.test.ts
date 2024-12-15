import { CapabilityPartnered } from "@/data/affordances"
import { ItemName } from "@/data/items"
import type { AlchemyAction, Card, Field, Item, Quest } from "@/types"
import { actionFulfilledQuest } from "@/utils/questUtils"
import { describe, expect, it } from "vitest"

const itemAvocado: Item = {
    id: ItemName.avocado,
    primaryKey: "a",
    images: []
}

const cardA: Card = {
    item: itemAvocado,
    images: []
}

const fieldA: Field = {
    card: cardA,
    identifiers: ["A"]
}

const fieldB: Field = {
    card: cardA,
    identifiers: ["B"]
}


const simpleNonsenseAction: AlchemyAction = {
    sender: fieldA,
    receiver: fieldB,
    affordance: CapabilityPartnered.Locks,
    senderKeys: [],
    receiverKeys: []
}

const simpleNonsenseQuest: Quest = {
    requiredAffordance: CapabilityPartnered.Parkable,
    requiredReceiverKey: "XYT",
    requiredSenderKey: "ABDFDVES"
}



describe('UTILS', () => {
    // alchemy
    it('quest fulfilled checker essentially runs', () => {
        const fulfilled = actionFulfilledQuest(simpleNonsenseAction, simpleNonsenseQuest)
        expect(fulfilled).toBeFalsy()
    })
}
)