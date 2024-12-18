import { pickRandom } from "@/utils/arrayUtils";
import type { AffordancePackage } from "../AffordancePackage";
import type { Capability } from "../capabilities/Capability"

export class ThingTemplate {
    constructor(
        public readonly key: string,
        public readonly secondaryKeys: string[],
        public readonly capabilities: Capability[],
        public readonly affordancePackages: AffordancePackage[],
        public readonly isMovable: boolean,
        public readonly props: ThingPropertyDict,
        public readonly images: string[]
    ) {
        ThingTemplate.instances.push(this)
    }


    private static instances: ThingTemplate[] = []


    get randomImage(): string | undefined {
        return pickRandom(this.images)
    }

    private static getAllThings(): ThingTemplate[] {
        return this.instances
    }

    public static getThingByKey(key: string): ThingTemplate | undefined {
        // WARNING: this fails with a === comparison
        // if have not the slightest idea why
        const thing = ThingTemplate.getAllThings().find(thing => thing.key == key )
        return thing
    }
} 

export type ThingPropertyDict = {
    [key: string]: string | number;
};