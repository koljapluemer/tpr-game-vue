import { Affordance } from "@/0_new_data/new_types";
import { Capability } from "./Capability";

export class CapabilityCut extends Capability {
    public getPartneredAffordances(): Affordance[] {
        return [Affordance.IsCuttable]
    }

    public enact() {
        // trigger cutting side effect
    }
}