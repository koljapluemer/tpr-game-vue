import type { CardImage, Item, RefactorItem } from "@/types"
import type { Capability } from "./capabilities/Capability"

export class RefactorCard  {
    item: RefactorItem
    images: CardImage[] 

    constructor(item: Item, images:CardImage[]) {
        this.item = item
        this.images = images
    }

    get capabilities():Capability[] {
        return this.item.ca
    }
}