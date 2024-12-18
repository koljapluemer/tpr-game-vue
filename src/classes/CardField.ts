import { pickRandom } from "@/utils/arrayUtils"
import { CardImage } from "./CardImage"
import type { FieldProperty } from "./FieldProperty"
import { ThingTemplate } from "./templates/ThingTemplate"
import { Interaction } from "./Interaction"
import type { Affordance } from "./Affordance"
import type { LevelTemplateCell } from "./templates/LevelTemplateCell"

export class CardField {
    #thing: ThingTemplate | undefined
    #images: CardImage[] = []

    constructor(thing: ThingTemplate | undefined) {
        this.#thing = thing
    }

    get hasThingOnIt(): boolean {
        return (this.#thing !== undefined)
    }

    get images() {
        return this.#images
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

    public static createFromLevelTemplateCell(template:LevelTemplateCell):CardField {
        return new CardField(
            template.randomThing
        )
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

    reactToInteractionHappenedToMeWithAffordance(affordance: Affordance) {
        const relevantAffordancePackage = this.#thing?.affordancePackages.find(
            pkg => pkg.affordance === affordance
        )
        if (relevantAffordancePackage) {
            if (relevantAffordancePackage.keyOfThingToChangeTo) {
                this.thing = ThingTemplate.getByKey(relevantAffordancePackage.keyOfThingToChangeTo)
            }
        }
    }
}