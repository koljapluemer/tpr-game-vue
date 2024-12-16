import type { AffordancePackage, ThingProperty } from "@/0_new_data/new_types"
import type { Capability } from "./capabilities/Capability"

export class Thing {
    #key: string;
    #secondaryKeys: string[];
    #capabilities: Capability[];
    #affordances: AffordancePackage[];
    #isMovable: boolean;
    #props: ThingProperty[]

    constructor(
        key: string,
        secondaryKeys: string[],
        capabilities: Capability[],
        affordances: AffordancePackage[],
        isMovable: boolean,
        props: ThingProperty[]
    ) {
        this.#key = key;
        this.#secondaryKeys = secondaryKeys;
        this.#capabilities = capabilities;
        this.#affordances = affordances;
        this.#isMovable = isMovable;
        this.#props = props
    }

    public static createFromThingList(thingList:any) {
        // TODO: here, load in my thing data, which I edit not sure how yet
    }


} 