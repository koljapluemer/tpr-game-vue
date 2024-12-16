import { Thing } from "@/classes/Thing"
import { expect, test } from "vitest"

test('JSON generation of Thing: method return well formed', () => {
    const fieldGrid = Thing.createFromJSONDict({})
    expect(fieldGrid).toBeInstanceOf(Thing)
    
})