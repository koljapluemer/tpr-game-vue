import { kiwiObject } from "@/__tests__/data/kiwi"
import { knifeObject } from "@/__tests__/data/knife"
import { CardField } from "@/models_frontend/CardField"
import { LevelTemplate } from "@/classes/templates/LevelTemplate"
import { LevelTemplateCell } from "@/classes/templates/LevelTemplateCell"
import { LevelTemplateParser } from "@/classes/templates/LevelTemplateParser"
import { expect, test } from "vitest"

const simpleKiwiKnifeLevel = {
    "name": "cut-kiwi-demo",
    "grid": [
        [
            [["KNIFE"]], [["KIWI"]]
        ]
    ],
    "props": []
} as const

const knifeCell = new LevelTemplateCell(
    [knifeObject]
)

const kiwiCell = new LevelTemplateCell(
    [kiwiObject]
)

export const simpleKnifeLevelTemplate = new LevelTemplate(
    "cut-kiwi-demo",
    [
        [knifeCell, kiwiCell]
    ],
    []
)


test('JSON generation of LevelTemplate | simple kiwi level: correct name', () => {
    const levelTemplate = LevelTemplateParser.parseFromDict(simpleKiwiKnifeLevel)
    expect(levelTemplate?.name).toEqual(simpleKnifeLevelTemplate.name)
})


test('JSON generation of LevelTemplate | simple kiwi level: correct grid row count', () => {
    const levelTemplate = LevelTemplateParser.parseFromDict(simpleKiwiKnifeLevel)
    expect(levelTemplate?.gridData.length).toEqual(1)
})

test('JSON generation of LevelTemplate | simple kiwi level: correct count of cells in 1st row', () => {
    const levelTemplate = LevelTemplateParser.parseFromDict(simpleKiwiKnifeLevel)
    expect(levelTemplate?.gridData[0].length).toEqual(2)
})

test('JSON generation of LevelTemplate | simple kiwi level: field cell comparison', () => {
    const levelTemplate = LevelTemplateParser.parseFromDict(simpleKiwiKnifeLevel)
    expect(levelTemplate?.gridData[0][0]).toEqual(knifeCell)
    expect(levelTemplate?.gridData[0][1]).toEqual(kiwiCell)
})