
import type { Grid, Item } from "@/types";

export function setIdentifiersForFields(grid: Grid, generateRelativePositions = false):string[] {
    const keyCount: { [key: string]: number } = {}
    let identifiers = [] as string[]

    grid.forEach(row => {
        row.forEach(field => {
            if (field.card && field.card.item) {
                const key = field.card.item.primaryKey
                if (key in keyCount) {
                    keyCount[key] += 1
                } else {
                    keyCount[key] = 1
                }
            }
        })
    })

    grid.forEach(row => {
        row.forEach(field => {
            if (field.card && field.card.item) {
                const key = field.card.item.primaryKey
                if (keyCount[key] == 1) {
                    field.identifiers = ['THE__' + field.card.item.primaryKey]
                } else {
                    field.identifiers = ['A__' + field.card.item.primaryKey]
                }
            }
            identifiers = identifiers.concat(field.identifiers)
        })
    })

    return identifiers
}