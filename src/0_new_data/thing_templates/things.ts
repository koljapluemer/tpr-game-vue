import type { Capability } from "@/0_classes/capabilities/Capability";
import { Affordance, type AffordancePackage } from "../new_types";

const cutKiwiPackage:AffordancePackage = [
    Affordance.IsCuttable, "KIWI_HALVES"
] 

// watch out: this can't be typed. do not do stupid things, I guess
// gonna do runtime validation on the class that creates items, or something
export const ThingTemplates = {
    "KIWI": {
        secondaryKeys: [],
        images: ['kiwi_uncut'],
        capabilities: [],
        affordances: [
            cutKiwiPackage
        ],
        isMovable: true
    },
    "KNIFE": {
        secondaryKeys: [],
        images: ['cupboard'],
        capabilities: [],
        affordances: [],
        isMovable: true
    },
    "KIWI_HALVES": {
        secondaryKeys: [],
        images:['knife'],
        isMovable: true,
        capabilities: []
    }
} as const


export type ThingTemplate = keyof typeof ThingTemplates

// TODO: this still is so not nice to edit...
// DSL?
// or just a UI?
// reread that pattern chapter :)

