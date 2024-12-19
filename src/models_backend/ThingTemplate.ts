import type { AffordancePackage } from "@/models_shared/AffordancePackage";
import type { Capability } from "@/models_shared/capabilities/Capability";
import { pickRandom } from "@/utils/arrayUtils";

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

    public static getAll(): ThingTemplate[] {
        return this.instances
    }

    public static getByKey(key: string): ThingTemplate | undefined {
        // WARNING: this fails with a === comparison
        // if have not the slightest idea why
        const thing = ThingTemplate.getAll().find(thing => thing.key == key )
        return thing
    }
} 

export type ThingPropertyDict = {
    [key: string]: string | number;
};