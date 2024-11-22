// STATIC DATA

import type { CapabilityPartnered, PassiveAffordance } from './data/affordances'
import type { ItemName } from './data/items'
import type { LevelTemplateName } from './data/levelTemplates'

export interface Item {
  id: ItemName
  primaryKey: string
  images: string[]

  secondaryKeys?: string[]
  activeAffordances?: CapabilityPartnered[]
  passiveAffordances?: PassiveAffordance[]
  isMovable?: boolean
  load_when_cut?: ItemName
  color?: string
}

export enum FieldProperty {
  DisableMovementQuests,
}

export enum LevelProperty {
  DisableMovementQuests,
  DisableSecondaryKeyUsage,
  RepeatOnce,
  RepeatFourTimes,
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
  card: Card | undefined
  row: number
  col: number
  identifiers: string[]
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

export interface AlchemyAction {
  sender: Field
  affordance: CapabilityPartnered
  senderKeys: string[]
  receiver: Field
  receiverKeys: string[]
}


export interface Quest {
  requiredAffordance: CapabilityPartnered
  requiredSenderKey?: string
  requiredReceiverKey?: string
}
