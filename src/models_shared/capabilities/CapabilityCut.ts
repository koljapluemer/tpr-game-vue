import { getChangedFieldAccordingToReceivedAffordance, type Field } from "@/models_frontend/Field"
import { Affordance } from "../Affordance"
import { Capability } from "./Capability"


export class CapabilityCut extends Capability {
    public static get key() {
        return "CUT"
    }

    public get partneredAffordances() {
        return [Affordance.IsCuttable]
    }

    public enactOnReceivingField(field: Field) {
        getChangedFieldAccordingToReceivedAffordance(field, Affordance.IsCuttable)
    }

    public enactOnSendingField(field: Field) {
        
    }

    public shouldBeResetAfterAction(): boolean {
        return true
    }

}