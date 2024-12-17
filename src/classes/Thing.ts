import { pickRandom } from "@/utils/arrayUtils";
import type { AffordancePackage } from "./AffordancePackage";
import type { Capability } from "./capabilities/Capability"
import type { ThingPropertyDict } from "./ThingProperty";

export class Thing {
    constructor(
        public readonly key: string,
        public readonly secondaryKeys: string[],
        public readonly capabilities: Capability[],
        public readonly affordancePackages: AffordancePackage[],
        public readonly isMovable: boolean,
        public readonly props: ThingPropertyDict,
        public readonly images: string[]
    ) {
        Thing.instances.push(this)
    }

    private static instances: Thing[] = []



    get randomImage(): string | undefined {
        return pickRandom(this.images)
    }

    private static getAllThings(): Thing[] {
        return this.instances
    }

    public static getThingByKey(key: string): Thing | undefined {
        const thing = this.getAllThings().find(thing => thing.key === key )
        return thing
    }
} 