import type { Affordance } from "./Affordance"
import type { Thing } from "./Thing"

export type AffordancePackage = {
    affordance: Affordance,
    thingToChangeTo?: Thing 
}