import type { ItemName } from '@/data/items'
import type { Card, Field, Grid, LevelTemplate } from '@/types'
import { getItemByID } from './itemUtils'

export function getGridFromLevelTemplate(levelTemplate: LevelTemplate): Grid {
  const levelGrid: Grid = []
  let rowCounter = 0
  levelTemplate.grid.forEach((row) => {
    const levelGridRow: Field[] = []
    row.forEach((cell) => {
      let cellCounter = 0

      // see if field is filled or not
      let card: Card | undefined = undefined
      if (cell[0].length > 0) {
        const randomItemName: ItemName = cell[0][Math.floor(Math.random() * cell[0].length)]
        const randomItem = getItemByID(randomItemName)
        if (typeof randomItem !== 'undefined') {
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
