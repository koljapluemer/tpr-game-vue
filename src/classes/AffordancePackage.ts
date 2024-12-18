import type { Affordance } from "./Affordance"
import type { ThingTemplate } from "./templates/ThingTemplate"

export type AffordancePackage = {
    affordance: Affordance,
    keyOfThingToChangeTo?: string 
}