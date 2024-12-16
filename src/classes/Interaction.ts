
export class Interaction  {
    #sender: Card
    #affordance: Affordance
    #senderKeys: string[]
    #receiver: Card
    #receiverKeys: string[]

    constructor(sender:Card, receiver:Card, affordance:Affordance) {
        this.#sender = sender
        this.#receiver = receiver
        this.#affordance = affordance

        this.#receiverKeys = receiver.keys
        this.#senderKeys = sender.keys
    }
  }
