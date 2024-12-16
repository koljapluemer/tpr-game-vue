import { Affordance } from "@/classes/Affordance"
import type { CardField } from "../CardField"
import { Capability } from "./Capability"


export class CapabilityCut extends Capability {
    public get key() {
        return "CUT"
    }

    public get partneredAffordances() {
        return [Affordance.IsCuttable]
    }

    public enactOnReceivingField(field: CardField) {
        field.changeCardToOtherThingAccordingToAffordance(Affordance.IsCuttable)
    }

    public enactOnSendingField(field: CardField) {
        // trigger cutting side effect
    }


}