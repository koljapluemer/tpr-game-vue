import { pickRandom } from "@/utils/arrayUtils";
import type { AffordancePackage } from "./AffordancPackage";
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
    ) { }

    public static createFromThingList(thingList: any) {
        // TODO: here, load in my thing data, which I edit not sure how yet
        // how about massive overengineering :)
    }

    get randomImage(): string | undefined {
        return pickRandom(this.images)
    }


} 