import { pickRandom } from "@/utils/arrayUtils";
import { ThingTemplate } from "./ThingTemplate";
import type { Field } from "@/models_frontend/Field";
import { createDefaultCardImage } from "@/models_frontend/CardImage";


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

    public generateFieldBasedOnMe(): Field {
        switch (this.randomThing) {
            case undefined:
                return this.generateEmptyField()
            default:
                return this.generateFieldWithThing()
        }
    }

    private generateEmptyField(): Field {
        return {
            thing: undefined,
            images: [],
            keys: []
        }
    }

    private generateFieldWithThing(): Field {
        if (!this.randomThing) return this.generateEmptyField()
        const randomThing = this.randomThing
        const randomImageName = randomThing.randomImage
        if (!randomImageName) {
            console.warn('thing has no images', randomThing)
            return this.generateEmptyField()
        }
        return {
            thing: randomThing,
            images: [createDefaultCardImage(randomImageName)],
            keys: []
        }
    }

}