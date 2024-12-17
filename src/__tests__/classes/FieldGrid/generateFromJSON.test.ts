import { CardField } from "@/classes/CardField"
import { FieldGrid } from "@/classes/FieldGrid"
import { FieldGridWrangler } from "@/classes/FieldGridWrangler"
import { expect, test } from "vitest"

const simpleKiwiKnifeLevel = {
    "grid": [
        [
            [["KIWI", "KNIFE"]], [["KIWI", "KNIFE"], "force-unique"]
        ]
    ],
    "props": []
} as const

const simpleKiwiKnifeGridExampleResult = new FieldGrid(
    [
        [
            // new CardField()
        ]
    ]
)

test('JSON generation of FieldGrid | simple kiwi level: grid has 1 row', () => {
    const fieldGrid = FieldGridWrangler.parseThingFromDict(simpleKiwiKnifeLevel)
    expect(fieldGrid?.rows.length).toEqual(1)
})