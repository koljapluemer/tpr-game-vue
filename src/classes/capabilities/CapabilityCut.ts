import { AffordanceName } from "@/classes/Affordance"
import type { CardField } from "../CardField"
import { Capability } from "./Capability"


export class CapabilityCut extends Capability {
    public static get key() {
        return "CUT"
    }

    public get partneredAffordances() {
        return [AffordanceName.IsCuttable]
    }

    public enactOnReceivingField(field: CardField) {
        field.reactToInteractionHappenedToMeWithAffordance(AffordanceName.IsCuttable)
    }

    public enactOnSendingField(field: CardField) {
        
    }


}