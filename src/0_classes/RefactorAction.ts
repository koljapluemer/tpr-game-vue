import type { Affordance } from "@/0_new_data/new_types"
import type { RefactorCard } from "./RefactorCard"

export class RefactorAction  {
    #sender: RefactorCard
    #affordance: Affordance
    #senderKeys: string[]
    #receiver: RefactorCard
    #receiverKeys: string[]

    constructor(sender:RefactorCard, receiver:RefactorCard, affordance:Affordance) {
        this.#sender = sender
        this.#receiver = receiver
        this.#affordance = affordance

        this.#receiverKeys = receiver.#keys
        this.#senderKeys = sender.#keys
    }
  }
