import { Affordance } from "@/0_new_data/new_types";
import { Capability } from "./Capability";
import type { RefactorField } from "../RefactorField";

export class CapabilityCut extends Capability {
    public getPartneredAffordances(): Affordance[] {
        return [Affordance.IsCuttable]
    }

    public enactOnReceivingField(field:RefactorField) {
        field.changeCardToOtherThingAccordingToAffordance(Affordance.IsCuttable)
    }

    public enactOnSendingField(field:RefactorField) {
        // trigger cutting side effect
    }


}