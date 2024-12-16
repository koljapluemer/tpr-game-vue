import { Thing } from "@/classes/Thing"
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
    const thing = Thing.createFromJsonSourcedDict(kiwiTemplate)
    expect(thing?.key).toEqual("KIWI")
})