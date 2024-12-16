import type { Affordance } from "@/classes/Affordance";
import type { CardField } from "../CardField";
import { Interaction } from "../Interaction";

export abstract class Capability {
    public abstract get key ():string

    public abstract get partneredAffordances(): Affordance[]

    public isPartneredWithAffordance(affordance: Affordance): boolean {
        return this.partneredAffordances.includes(affordance)
    }

    public abstract enactOnReceivingField(field:CardField):void
    public abstract enactOnSendingField(field:CardField):void

}