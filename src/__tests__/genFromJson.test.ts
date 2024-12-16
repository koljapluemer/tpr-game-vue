import { FieldGrid } from "@/classes/FieldGrid"
import { expect, test } from "vitest"

test('JSON generation of FieldGrid: method return well formed', () => {
    const fieldGrid = FieldGrid.createFromJSONDict({})
    expect(fieldGrid).toBeInstanceOf(FieldGrid)
    
})