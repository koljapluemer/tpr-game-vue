import type { Affordance } from "../models_shared/Affordance"
import { ThingTemplate } from "@/models_backend/ThingTemplate"
import { createInteraction, type Interaction } from "./Interaction"
import type { CardImage } from "./CardImage"
import { LevelTemplateCell } from "@/models_backend/LevelTemplateCell"

export type Field = {
    thing: ThingTemplate | undefined
    images: CardImage[]
    keys: string[]
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

export function getChangedFieldAccordingToReceivedAffordance(field: Field, affordance: Affordance):Field |undefined {
    const relevantAffordancePackage = field.thing?.affordancePackages.find(
        pkg => pkg.affordance === affordance
    )
    console.info('affordance pkg', relevantAffordancePackage)
    if (relevantAffordancePackage) {
        if (relevantAffordancePackage.keyOfThingToChangeTo) {
            console.info('trying to change to', relevantAffordancePackage.keyOfThingToChangeTo)
            // TODO: may die because vue hates classes
            field.thing = ThingTemplate.getByKey(relevantAffordancePackage.keyOfThingToChangeTo)
            console.info('thing:', field.thing)
            const template = LevelTemplateCell.createFromThingName(relevantAffordancePackage.keyOfThingToChangeTo)
            if (template) return template.createFieldBasedOnMe()
        }
    }
    return undefined
}
