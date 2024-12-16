import { pickRandom } from "@/utils/arrayUtils";
import type { AffordancePackage } from "./AffordancPackage";
import type { Capability } from "./capabilities/Capability"
import type { ThingPropertyDict } from "./ThingProperty";

import { z } from "zod";
import { ThingParser } from "./ThingParser";

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


    get randomImage(): string | undefined {
        return pickRandom(this.images)
    }


    public static createFromJsonSourcedDict(thingData: Object): Thing | undefined {
        return ThingParser.parseThingFromDict(thingData)
    }

} 