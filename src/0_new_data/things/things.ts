import type { Capability } from "@/0_classes/capabilities/Capability";
import type { Affordance } from "../new_types";

type AffordancePackage = {
    affordance: Affordance,
    reactingWithItem: any
}


// watch out: this can't be typed. do not do stupid things, I guess
// gonna do runtime validation on the class that creates items, or something
export const Things = {
    "ukulele": {
        primaryKey: "UKULELE",
        secondaryKeys: [],
        images: ['ukulele'],
        capabilities: [],
        affordances: []
    },
    "cupboard": {
        primaryKey: "CUPBOARD",
        secondaryKeys: [],
        images: ['cupboard'],
        capabilities: [],
        affordances: []
    }
} as const


export type Thing = keyof typeof Things

// TODO: keep rebuilding by making this knife and kiwi, and keep adding