import { FieldGrid } from "@/classes/FieldGrid"
import { expect, test } from "vitest"

const simpleKiwiKnifeLevel = {
    "grid": [
        [
            [["KIWI", "KNIFE"]], [["KIWI", "KNIFE"], "force-unique"]
        ]
    ],
    "props": []
} as const

test('JSON generation of FieldGrid | simple kiwi level: grid has 1 row', () => {
    const fieldGrid = FieldGrid.createFromJsonSourcedDict(simpleKiwiKnifeLevel)
    expect(fieldGrid.rows.length).toEqual(1)
})