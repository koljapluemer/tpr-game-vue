import type { AlchemyAction, Card, FieldProperty } from "@/types"
import type { RefactorCard } from "./RefactorCard"
import type { Affordance } from "@/0_new_data/new_types"

export class RefactorField {
    #card: RefactorCard | undefined
    #props: FieldProperty[] = []

    public hasCardOnIt():boolean {
        return !(this.#card === undefined)
    }

    public changeCardToOtherThingAccordingToAffordance(affordance: Affordance) {
        // e.g.: Field may have a card on it, holding a KIWI
        // now we have an action with an affordance CUT coming in,
        // so we're making a new Card to hold, with KIWI_HALVES on it
        // for that, we're querying the current card for it's affordances,
        // if it doesn't have the affordance in its AffordancePackage[], or the 
        // package does not contain a thing to change to, we do nothing

    }
    
}