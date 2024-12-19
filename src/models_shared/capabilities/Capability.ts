import type { Field } from "@/models_frontend/Field";
import type { Affordance } from "@/models_shared/Affordance";

export abstract class Capability {

    public abstract get partneredAffordances(): Affordance[]

    public isPartneredWithAffordance(affordance: Affordance): boolean {
        return this.partneredAffordances.includes(affordance)
    }

    public abstract enactOnReceivingField(field:Field):void
    public abstract enactOnSendingField(field:Field):void

}