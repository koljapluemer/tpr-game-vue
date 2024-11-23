
import type { Field, Grid, Item } from "@/types";

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

    if (generateRelativePositions){
        grid.forEach((row, rowIndex) => {
            row.forEach((field, colIndex) => {
            if (field.card && field.card.item) {
                const key = field.card.item.primaryKey
                // AT_FRONT, AT_BACK
                if(keyCount[key] == 2) {
                    const fieldBelow = getFieldAtPosition(grid, rowIndex + 1, colIndex)
                    if (fieldBelow !== undefined) {
                        const key = 'THE__' + field.card.item.primaryKey + '__AT_BACK'
                        field.identifiers.push(key)
                        identifiers.push(key)
                    }
                    const fieldAbove = getFieldAtPosition(grid, rowIndex - 1, colIndex)
                    if (fieldAbove !== undefined) {
                        const key = 'THE__' + field.card.item.primaryKey + '__AT_FRONT'
                        field.identifiers.push(key)
                        identifiers.push(key)
                    }
                }
             }
        })
        })
    }

    return identifiers
}

function getFieldAtPosition(grid:Grid, row: number, col:number):Field |undefined {
    if (grid[row] === undefined) {
        return undefined
    } else {
        if ( grid[row][col] === undefined) {
        return undefined
        }
 else {
        return grid[row][col]
    }
}

}