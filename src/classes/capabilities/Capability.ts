import type { AffordanceName } from "@/classes/Affordance";
import type { CardField } from "../CardField";
import { Interaction } from "../Interaction";
import { CapabilityCut } from "./CapabilityCut";

export abstract class Capability {

    public abstract get partneredAffordances(): Affordance[]

    public isPartneredWithAffordance(affordance: Affordance): boolean {
        return this.partneredAffordances.includes(affordance)
    }

    public abstract enactOnReceivingField(field:CardField):void
    public abstract enactOnSendingField(field:CardField):void

    public static createBasedOnKey(key:string):Capability | undefined {
        switch(key) {
            case (CapabilityCut.key):
                return new CapabilityCut()
        }
        console.error('No fitting capability found for key:', key)
        return 
    }
}