
import { FieldPropertyName, LevelProperty, type Field, type Grid, type Item } from "@/types";

export function setIdentifiersForFields(grid: Grid, levelProps?: LevelProperty[]):string[] {
    const generateRelativePositions = levelProps?.includes(LevelProperty.GenerateRelativePositions)

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

    // position relative to something (BEHIND__HOUSE)
    grid.forEach((row, rowIndex) => {
        row.forEach((field, colIndex) => {
            const relativeRelationProp = field.fieldProperties?.find(prop => {
                return prop.name == FieldPropertyName.IdentifyPositionInRelationToCoordinate
            })
            if (relativeRelationProp) {
                if (field.card && field.card.item) {
                    const key = field.card.item.primaryKey
                    const rowOfInterest = relativeRelationProp.data!.row 
                    const colOfInterest = relativeRelationProp.data!.col
                    const fieldOfInterest = getFieldAtPosition(grid, rowOfInterest , colOfInterest ) 
                    if (fieldOfInterest) {
                        // left of thing
                        if (rowOfInterest === rowIndex && colOfInterest - colIndex === 1) {
                            fieldOfInterest.identifiers.forEach(targetIdentifier => {
                                const newIdentifier = 'THE__' + key + '__LEFT_OF__' + targetIdentifier
                                field.identifiers.push(newIdentifier)
                                identifiers.push(newIdentifier)
                            })
                        }
                        // right of thing
                        if (rowOfInterest === rowIndex && colOfInterest - colIndex === -1) {
                            fieldOfInterest.identifiers.forEach(targetIdentifier => {
                                const newIdentifier = 'THE__' + key + '__RIGHT_OF__' + targetIdentifier
                                field.identifiers.push(newIdentifier)
                                identifiers.push(newIdentifier)
                            })
                        }
                        // top of thing
                        if (rowOfInterest - rowIndex === 1 && colOfInterest === colIndex ) {
                            fieldOfInterest.identifiers.forEach(targetIdentifier => {
                                const newIdentifier = 'THE__' + key + '__BEHIND/TOP_OF__' + targetIdentifier
                                field.identifiers.push(newIdentifier)
                                identifiers.push(newIdentifier)
                            })
                        }
                        // under thing
                        if (rowOfInterest - rowIndex === -1 && colOfInterest === colIndex ) {
                            fieldOfInterest.identifiers.forEach(targetIdentifier => {
                                const newIdentifier = 'THE__' + key + '__BELOW/INFRONT_OF__' + targetIdentifier
                                field.identifiers.push(newIdentifier)
                                identifiers.push(newIdentifier)
                            })
                        }
                    }
                }
            }
        })
    })


    if (generateRelativePositions){
        grid.forEach((row, rowIndex) => {
            row.forEach((field, colIndex) => {
            if (field.card && field.card.item) {
                const key = field.card.item.primaryKey
                // AT_FRONT, AT_BACK
                if(keyCount[key] === 2) {
                    const fieldBelow = getFieldAtPosition(grid, rowIndex + 1, colIndex)
                    if (fieldBelow && areFieldsSameItem(fieldBelow, field)) {
                        const key = 'THE__' + field.card.item.primaryKey + '__AT_BACK'
                        field.identifiers.push(key)
                        identifiers.push(key)
                    }
                    const fieldAbove = getFieldAtPosition(grid, rowIndex - 1, colIndex)
                    if (fieldAbove && areFieldsSameItem(fieldAbove, field)) {
                        const key = 'THE__' + field.card.item.primaryKey + '__AT_FRONT'
                        field.identifiers.push(key)
                        identifiers.push(key)
                    }
                }
                // AT_FRONT, AT_BACK, AT_MIDDLE
                if(keyCount[key] === 3) {
                    const fieldBelow = getFieldAtPosition(grid, rowIndex + 1, colIndex)
                    const fieldFarBelow = getFieldAtPosition(grid, rowIndex + 2, colIndex)
                    const fieldAbove = getFieldAtPosition(grid, rowIndex - 1, colIndex)
                    const fieldFarAbove = getFieldAtPosition(grid, rowIndex - 2, colIndex)

                    // are we at front?
                    if (fieldAbove && fieldFarAbove && areFieldsSameItem(fieldAbove, field) && areFieldsSameItem(fieldFarAbove, field)) {
                        const key = 'THE__' + field.card.item.primaryKey + '__AT_FRONT'
                        field.identifiers.push(key)
                        identifiers.push(key) 
                    }
                    // are we in the middle?
                    if (fieldAbove && fieldBelow && areFieldsSameItem(fieldAbove, field) && areFieldsSameItem(fieldBelow, field)) {
                        const key = 'THE__' + field.card.item.primaryKey + '__IN_MIDDLE'
                        field.identifiers.push(key)
                        identifiers.push(key) 
                    }
                    // are we at back?
                    if (fieldFarBelow && fieldBelow && areFieldsSameItem(fieldFarBelow, field) && areFieldsSameItem(fieldBelow, field)) {
                        const key = 'THE__' + field.card.item.primaryKey + '__AT_BACK'
                        field.identifiers.push(key)
                        identifiers.push(key) 
                    }

                }
             }
        })
        })
    }

    console.log('identifiers', identifiers)

    return identifiers
}

function areFieldsSameItem(fieldA: Field, fieldB:Field):boolean {
    return (fieldA?.card?.item.primaryKey === fieldB?.card?.item.primaryKey)
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