import type { AffordancePackage } from "@/models_shared/AffordancePackage"
import { ThingTemplate } from "@/classes/templates/ThingTemplate"

export const kiwiTemplate = {
    "key": "KIWI",
    "secondaryKeys": ["FRUIT"],
    "images": ["kiwi_uncut"],
    "capabilities": [],
    "affordances": [
        [0, "KIWI_HALVES"]
    ],
    "isMovable": true
}



const kiwiCutObject = new ThingTemplate("KIWI_HALVES", ["FRUIT"], [], [], true, {}, ["kiwi_cut"])

const kiwiAffordancePackage: AffordancePackage = {
    affordance: 0,
    keyOfThingToChangeTo: kiwiCutObject.key
}

export const kiwiObject = new ThingTemplate("KIWI", ["FRUIT"], [], [kiwiAffordancePackage], true, {}, ["kiwi_uncut"])

