import type { AffordanceName } from "./Affordance"
import type { ThingTemplate } from "./templates/ThingTemplate"

export type AffordancePackage = {
    affordance: AffordanceName,
    keyOfThingToChangeTo?: string 
}