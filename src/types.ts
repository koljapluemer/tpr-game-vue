// STATIC DATA

import type { ActiveAffordance, PassiveAffordance } from './data/affordances'
import type { ItemName } from './data/items'
import type { LevelTemplateName } from './data/levelTemplates'

export interface Item {
  id: ItemName
  primaryKey: string
  images: string[]

  secondaryKeys?: string[]
  activeAffordances?: ActiveAffordance[]
  passiveAffordances?: PassiveAffordance[]
  load_when_cut?: string
  color?: string
}

export enum FieldProperty {
  DisableMovementQuests,
}

export enum LevelProperty {
  DisableMovementQuests,
  DisableSecondaryKeyUsage,
}

export type LevelTemplateGridRowField = [
  possibleKeys: ItemName[],
  fieldProperties?: FieldProperty[],
]
export type LevelTemplateGridRow = LevelTemplateGridRowField[]
export type LevelTemplateGrid = LevelTemplateGridRow[]

export interface LevelTemplate {
  id: LevelTemplateName // Unique identifier for the level
  grid: LevelTemplateGrid
  props?: LevelProperty[]
  prerequisites?: LevelTemplateName[]
}

// GAME PLAY/GRID UI

export interface Level {
  grid: Grid
}

// 2D Grid composed of fields
export type Grid = Field[][]

// Field that may contain a card
export type Field = {
  card: Card | null
}

// Card interface with mutable state
export interface Card {
  item: Item
  images: CardImage[]
}

export interface CardImage {
  name: string
  zIndex: number
  scale?: number
  offset?: [number, number]
}

// QUESTS, ACTIONS, AFFORDANCES

interface Action {
  sender: Item
  receiver?: Item
  affordance: string
  senderKeys: string[]
  receiverKeys?: string[]
}

interface Quest {
  requiredAffordance: string
  requiredSenderKey?: string
  requiredReceiverKey?: string
}
