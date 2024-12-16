import type { CardImage, Item, RefactorItem } from "@/types"
import type { Capability } from "./capabilities/Capability"
import type { Thing } from "@/0_new_data/thing_templates/things"

export class RefactorCard  {
    thing: RefactorItem
    images: CardImage[] 

    constructor(thing: Thing, images:CardImage[]) {
        this.thing = item
        this.images = images
    }

    get capabilities():Capability[] {
        return this.thing.capabilities
    }
}