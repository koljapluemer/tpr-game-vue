import { pickRandom } from "@/utils/arrayUtils"
import { CardImage } from "./CardImage"
import type { FieldProperty } from "./FieldProperty"
import { ThingTemplate } from "./templates/ThingTemplate"
import { Interaction } from "./Interaction"
import type { AffordanceName } from "./Affordance"

export class CardField {
    #thing: ThingTemplate | undefined
    #props: FieldProperty[] = []
    #images: CardImage[] = []

    constructor(thing: ThingTemplate | undefined, props: FieldProperty[] = []) {
        this.#thing = thing
        this.#props = props
    }

    get hasThingOnIt(): boolean {
        return (this.#thing !== undefined)
    }

    get keys(): string[] {
        // TODO: here we're gonna have painful interaction with the FieldGrid/Level
        return this.#thing ? [this.#thing.key] : []
    }

    set thing(thing: ThingTemplate | undefined) {
        this.#thing = thing
        if (thing?.randomImage) {
            this.#images = [new CardImage(thing.randomImage, 0)]
        }
    }

    public getInteractionsGeneratedByDroppingFieldOnMe(droppedField: CardField): Interaction[] {
        if (!droppedField.hasThingOnIt) return []
        if (!this.hasThingOnIt) return []

        const interactions: Interaction[] = []

        droppedField.thing?.capabilities.forEach(capability => {
            this.#thing?.affordancePackages.forEach(pkg => {
                if (capability.isPartneredWithAffordance(pkg.affordance)) {
                    interactions.push(
                        new Interaction(droppedField, this, pkg.affordance)
                    )
                }
            })
        })

        return interactions
    }

    reactToInteractionHappenedToMeWithAffordance(affordance: AffordanceName) {
        const relevantAffordancePackage = this.#thing?.affordancePackages.find(
            pkg => pkg.affordance === affordance
        )
        if (relevantAffordancePackage) {
            if (relevantAffordancePackage.keyOfThingToChangeTo) {
                this.thing = ThingTemplate.getThingByKey(relevantAffordancePackage.keyOfThingToChangeTo)
            }
        }
    }
}