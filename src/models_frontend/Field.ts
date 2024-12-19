import type { Affordance } from "../models_shared/Affordance"
import { ThingTemplate } from "@/models_backend/ThingTemplate"
import { createInteraction, type Interaction } from "./Interaction"
import type { CardImage } from "./CardImage"

export type Field = {
    thing: ThingTemplate | undefined
    images: CardImage[]
    keys: string[]
}

export function setFieldImageToRandomThing(field: Field) {
    // TODO
}

export function getInteractionsGeneratedByDroppingFieldOnField(senderField: Field, receiverField: Field): Interaction[] {
    if (!senderField.thing) return []
    if (!receiverField.thing) return []

    const interactions: Interaction[] = []

    senderField.thing?.capabilities.forEach(capability => {
        receiverField.thing?.affordancePackages.forEach(pkg => {
            if (capability.isPartneredWithAffordance(pkg.affordance)) {
                interactions.push(
                    createInteraction(senderField, receiverField, pkg.affordance)
                )
            }
        })
    })

    return interactions
}

export function changeFieldAccordingToActivatedAffordance(field: Field, affordance: Affordance) {
    const relevantAffordancePackage = field.thing?.affordancePackages.find(
        pkg => pkg.affordance === affordance
    )
    if (relevantAffordancePackage) {
        if (relevantAffordancePackage.keyOfThingToChangeTo) {
            // TODO: may die because vue hates classes
            field.thing = ThingTemplate.getByKey(relevantAffordancePackage.keyOfThingToChangeTo)
        }
    }
}

