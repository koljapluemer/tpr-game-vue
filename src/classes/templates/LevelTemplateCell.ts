import { pickRandom } from "@/utils/arrayUtils";
import { ThingTemplate } from "./ThingTemplate";


export class LevelTemplateCell {
    constructor(
        public readonly possibleThings: ThingTemplate[],
        // public readonly props: []
    ) { }

    get randomThing(): ThingTemplate | undefined {
        return pickRandom(this.possibleThings)
    }

    public static createFromArrayOfThingNames(thingNames: string[]): LevelTemplateCell | undefined {
        const possibleThings: ThingTemplate[] = []
        thingNames.forEach(thingName => {
            const thing = ThingTemplate.getByKey(thingName)
            if (!thing) {
                console.warn('illegal/unknown thingname', thingName)
                return undefined
            } else {
                possibleThings.push(thing)
            }
        })
        return new LevelTemplateCell(possibleThings)
    }

}