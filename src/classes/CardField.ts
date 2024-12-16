import { pickRandom } from "@/utils/arrayUtils"
import { CardImage } from "./CardImage"
import type { FieldProperty } from "./FieldProperty"
import type { Thing } from "./Thing"
import { Interaction } from "./Interaction"

export class CardField {
    #thing: Thing | undefined
    #props: FieldProperty[] = []
    #images: CardImage[] = []

    constructor(thing: Thing | undefined, props: FieldProperty[] = []) {
        this.#thing = thing
        this.#props = props
    }

    get hasThingOnIt(): boolean {
        return (this.#thing !== undefined)
    }

    set thing(thing: Thing) {
        this.#thing = thing
        if (thing.randomImage) {
            this.#images = [new CardImage(thing.randomImage, 0)]
        }
    }

    public getInteractionsGeneratedByDroppingFieldOnMe(droppedField: CardField): Interaction[] {
        if (!droppedField.hasThingOnIt) return []
        if (!this.hasThingOnIt) return []

        const interactions: Interaction[] = []

        droppedField.thing.capabilities.forEach(capability => {
            this.#thing!.affordancePackages.forEach(pkg => {
                if (capability.isPartneredWithAffordance(pkg.affordance)) {
                    interactions.push(
                        new Interaction(droppedField, this, pkg.affordance)
                    )
                }
            })
        })

        return interactions
    }
}