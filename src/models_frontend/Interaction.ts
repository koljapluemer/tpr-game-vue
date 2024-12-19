import type { Affordance } from "../models_shared/Affordance"
import type { Field } from "./Field"

export type Interaction = {
    sender: Field
    affordance: Affordance
    senderKeys: string[]
    receiver: Field
    receiverKeys: string[]

}

export function createInteraction(sender: Field, receiver: Field, affordance: Affordance): Interaction {
    return {
        sender: sender,
        receiver: receiver,
        affordance: affordance,
        senderKeys: sender.keys,
        receiverKeys: receiver.keys
    }
}