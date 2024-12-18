import { GameLoader } from "@/classes/GameLoader"
import { expect, test } from "vitest"

test('GameDataParser runs', () => {
    const hasRun = GameLoader.loadFromDataSources()

    expect(hasRun).toBeTruthy()
})