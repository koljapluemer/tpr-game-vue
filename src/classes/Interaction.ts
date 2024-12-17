import type { AffordanceName } from "./Affordance"
import type { CardField } from "./CardField"

export class Interaction  {
    #sender: CardField
    #affordance: Affordance
    #senderKeys: string[]
    #receiver: CardField
    #receiverKeys: string[]

    constructor(sender:CardField, receiver:CardField, affordance:Affordance) {
        this.#sender = sender
        this.#receiver = receiver
        this.#affordance = affordance

        this.#receiverKeys = receiver.keys
        this.#senderKeys = sender.keys
    }
  }
