import type { AffordanceName } from "./Affordance"
import type { Thing } from "./Thing"

export type AffordancePackage = {
    affordance: AffordanceName,
    keyOfThingToChangeTo?: string 
}