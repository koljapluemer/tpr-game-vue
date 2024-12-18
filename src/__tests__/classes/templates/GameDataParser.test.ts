import { GameDataParser } from "@/classes/templates/GameDataParser"
import { expect, test } from "vitest"

test('GameDataParser runs', () => {
    const hasRun = GameDataParser.load()

    expect(hasRun).toBeTruthy()
})