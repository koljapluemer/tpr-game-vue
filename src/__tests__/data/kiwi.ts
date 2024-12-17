import type { AffordancePackage } from "@/classes/AffordancePackage"
import { Thing } from "@/classes/Thing"

export const kiwiTemplate = {
    "key": "KIWI",
    "secondaryKeys": ["FRUIT"],
    "images": ["kiwi_uncut"],
    "capabilities": [],
    "affordances": [
        ["IsCuttable", "KIWI_HALVES"]
    ],
    "isMovable": true
}



const kiwiCutObject = new Thing("KIWI_HALVES", ["FRUIT"], [], [], true, {}, ["kiwi_cut"])

const kiwiAffordancePackage: AffordancePackage = {
    affordance: "IsCuttable",
    keyOfThingToChangeTo: kiwiCutObject.key
}

export const kiwiObject = new Thing("KIWI", ["FRUIT"], [], [kiwiAffordancePackage], true, {}, ["kiwi_uncut"])

