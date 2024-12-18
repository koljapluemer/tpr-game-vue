import { pickRandom } from "@/utils/arrayUtils";
import type { ThingTemplate } from "./ThingTemplate";


export class LevelTemplateCell {
    constructor(
        public readonly possibleThings: ThingTemplate[],
        public readonly props: []
    ) { }

    get randomThing(): ThingTemplate | undefined {
        return pickRandom(this.possibleThings)
    }

}