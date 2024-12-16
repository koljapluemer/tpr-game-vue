import { Thing } from "@/classes/Thing"
import { ThingParser } from "@/classes/ThingParser"
import { expect, test } from "vitest"

const kiwiTemplate = {
    "key": "KIWI",
    "secondaryKeys": [],
    "images": ["kiwi_uncut"],
    "capabilities": [],
    "affordances": [
        [0, "KIWI_HALVES"]
    ],
    "isMovable": true
}

test('JSON generation of kiwi Thing: called kiwi', () => {
    const thing = ThingParser.parseThingFromDict(kiwiTemplate)
    expect(thing?.key).toEqual("KIWI")
})