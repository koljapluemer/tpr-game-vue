import type { Affordance } from "@/0_new_data/new_types";
import type { RefactorAction } from "../RefactorAction";
import type { RefactorField } from "../RefactorField";

export abstract class Capability {

    public abstract getPartneredAffordances(): Affordance[]

    public isPartneredWithAffordance(affordance: Affordance): boolean {
        return this.getPartneredAffordances().includes(affordance)
    }

    public abstract enactOnReceivingField(field:RefactorField):void
    public abstract enactOnSendingField(field:RefactorField):void


}