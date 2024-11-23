import type { ItemName } from '@/data/items'
import { FieldPropertyName, type Card, type Field, type Grid, type Item, type LevelTemplate, type LevelTemplateGridRowField } from '@/types'
import { getItemByID } from './itemUtils'
import { useArrayUtils } from '@/composables/useArrayUtils'

const { pickRandom } = useArrayUtils()

export function getGridFromLevelTemplate(levelTemplate: LevelTemplate): Grid {
  const levelGrid: Grid = []
  const itemsAlreadyInPlay: ItemName[] = []
  let rowCounter = 0
  levelTemplate.grid.forEach((row) => {
    const levelGridRow: Field[] = []
    row.forEach((cell) => {
      let cellCounter = 0

      // see if field is filled or not
      let card: Card | undefined = undefined
      if (cell[0].length > 0) {
        let itemsThatCanBeSpawned = cell[0]
        if (doesFieldHaveProperty(cell, FieldPropertyName.ForceUniqueItem)) {
          console.log('forcing unique item for this field')
          itemsThatCanBeSpawned = itemsThatCanBeSpawned.filter(item => {
            return !itemsAlreadyInPlay.includes(item)
          })
          console.log('items that can be spawned after redux', itemsThatCanBeSpawned)
        }
        const randomItemName = pickRandom(itemsThatCanBeSpawned)
        if (randomItemName !== undefined) {
        const randomItem = getItemByID(randomItemName)
        if (randomItem !== undefined) {
          itemsAlreadyInPlay.push(randomItemName)
          const randomImage =
            randomItem.images[Math.floor(Math.random() * randomItem.images.length)]
          card = {
            item: randomItem,
            images: [
              {
                name: randomImage,
                zIndex: 1,
              },
            ],
          }
        }
      }
      }
      const levelGridField: Field = {
        card: card,
        identifiers: [],
        fieldProperties: cell[1]
      }
      levelGridRow.push(levelGridField)
      cellCounter += 1
    })
    levelGrid.push(levelGridRow)
    rowCounter += 1
  })
  return levelGrid
}


export function doesFieldHaveProperty(field:LevelTemplateGridRowField, property:FieldPropertyName):boolean|undefined {
  return field[1]?.some(prop => {
    return prop.name == property
  })
}