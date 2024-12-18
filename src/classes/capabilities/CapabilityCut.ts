import { Affordance } from "../Affordance"
import type { CardField } from "../CardField"
import { Capability } from "./Capability"


export class CapabilityCut extends Capability {
    public static get key() {
        return "CUT"
    }

    public get partneredAffordances() {
        return [Affordance.IsCuttable]
    }

    public enactOnReceivingField(field: CardField) {
        field.reactToInteractionHappenedToMeWithAffordance(Affordance.IsCuttable)
    }

    public enactOnSendingField(field: CardField) {
        
    }

}