import { kiwiObject } from "@/__tests__/data/kiwi"
import { knifeObject } from "@/__tests__/data/knife"
import { CardField } from "@/classes/CardField"
import { FieldGrid } from "@/classes/FieldGrid"
import { LevelTemplate } from "@/classes/templates/LevelTemplate"
import { LevelTemplateCell } from "@/classes/templates/LevelTemplateCell"
import { LevelTemplateParser } from "@/classes/templates/LevelTemplateParser"
import { expect, test } from "vitest"

const simpleKiwiKnifeLevel = {
    "name": "cut-the-kiwi",
    "grid": [
        [
            [["KNIFE"]], [["KIWI"]]
        ]
    ],
    "props": []
} as const

const knifeCell = new LevelTemplateCell(
    [knifeObject], []
)

const kiwiCell = new LevelTemplateCell(
    [kiwiObject], []
)

const simpleKnifeLevelTemplate = new LevelTemplate(
    "cut-the-kiwi",
    [
        [knifeCell, kiwiCell]
    ],
    []
)


test('JSON generation of FieldGrid | simple kiwi level: correct template generates', () => {
    const levelTemplate = LevelTemplateParser.parseFromDict(simpleKiwiKnifeLevel)
    expect(levelTemplate).toEqual(simpleKnifeLevelTemplate)
})