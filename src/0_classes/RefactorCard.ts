import type { AlchemyAction, CardImage } from "@/types"
import type { Capability } from "./capabilities/Capability"
import type { ThingTemplate } from "@/0_new_data/thing_templates/things"
import type { Affordance, ThingProperty } from "@/0_new_data/new_types"
import type { RefactorField } from "./RefactorField"
import { RefactorAction } from "./RefactorAction"

export class RefactorCard  {
    // TODO: force all these things to be set in the constructor instead
    #thingTemplate: ThingTemplate
    #images: CardImage[]  = []
    #keys: string[] = []
    #capabilities: Capability[]  = []
    #affordances: Affordance[] = []
    #props: ThingProperty[] = []
    #isMovable: boolean = false


    constructor(thing: ThingTemplate) {
        this.#thingTemplate = thing
    }

    public static getCardForField(field:RefactorField, thing: ThingTemplate):RefactorCard {
        // TODO: gen keys here etc. (or maybe in the constructor)
        // which also depends on fieldprops, field position, etc
        return new RefactorCard(thing)
    }

    public getActionsGeneratedByDroppingCardOnMe(droppedCard:RefactorCard):RefactorAction[] {
        const generatedActions:RefactorAction[] = []
        droppedCard.#capabilities.forEach(capability => {
            this.#affordances.forEach(affordance => {
                if (capability.isPartneredWithAffordance(affordance)) {
                    const action = new RefactorAction (droppedCard, this, affordance)
                    generatedActions.push(action)
                }
            })
        })
        return generatedActions
    }
    
}