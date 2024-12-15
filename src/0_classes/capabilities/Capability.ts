import type { PassiveAffordance } from "@/data/affordances";

export abstract class Capability {

    public abstract getPartneredAffordances(): PassiveAffordance[]

    public isPartneredWithAffordance(affordance: PassiveAffordance): boolean {
        return this.getPartneredAffordances().includes(affordance)
    }
}