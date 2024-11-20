import { items, type ItemName } from '@/data/items'
import type { Item } from '@/types'

export function getItemByID(id: ItemName): Item | undefined {
  return items.find((item) => item.id === id)
}
