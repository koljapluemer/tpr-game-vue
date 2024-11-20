import type { ItemName } from '@/data/items'
import type { Card, Field, Grid, LevelTemplate } from '@/types'
import { getItemByID } from './itemUtils'

export function getGridFromLevelTemplate(levelTemplate: LevelTemplate): Grid {
  const levelGrid: Grid = []
  levelTemplate.grid.forEach((row) => {
    const levelGridRow: Field[] = []
    row.forEach((cell) => {
      // see if field is filled or not
      let card: Card | null = null
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
        card,
      }
      levelGridRow.push(levelGridField)
    })
    levelGrid.push(levelGridRow)
  })
  return levelGrid
}
