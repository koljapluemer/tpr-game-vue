import type { Affordance } from "@/0_new_data/new_types";

export abstract class Capability {

    public abstract enact():void
    public abstract getPartneredAffordances(): Affordance[]

    public isPartneredWithAffordance(affordance: Affordance): boolean {
        return this.getPartneredAffordances().includes(affordance)
    }
}