import { kiwiObject } from "@/__tests__/data/kiwi"
import { knifeObject } from "@/__tests__/data/knife"
import { CardField } from "@/classes/CardField"
import { FieldGrid } from "@/classes/FieldGrid"
import { LevelTemplate } from "@/classes/templates/LevelTemplate"
import { LevelTemplateParser } from "@/classes/templates/LevelTemplateParser"
import { expect, test } from "vitest"

const simpleKiwiKnifeLevel = {
    "name": "cut-the-kiwi",
    "grid": [
        [
            [["KIWI", "KNIFE"]], [["KIWI", "KNIFE"], "force-unique"]
        ]
    ],
    "props": []
} as const

const simpleKnifeLevelTemplate = new LevelTemplate (


)
test('JSON generation of FieldGrid | simple kiwi level: grid has 1 row', () => {
    const fieldGrid = LevelTemplateParser.parseFromDict(simpleKiwiKnifeLevel)
    expect(fieldGrid?.rows.length).toEqual(1)
})