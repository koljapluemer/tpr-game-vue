// STATIC DATA

import type { CapabilityPartnered, PassiveAffordance } from './data/affordances'
import { ItemName } from './data/items'
import type { LevelTemplateName } from './data/levelTemplates'

export const LanguageCode = {
  "German": "de", "Arabic": "ar", "Estonian": "et"
}

export type LanguageCodeType = (typeof LanguageCode)[keyof typeof LanguageCode]

export type Item = {
  id: ItemName
  primaryKey: string
  images: string[]

  secondaryKeys?: string[]
  activeAffordances?: CapabilityPartnered[]
  passiveAffordances?: PassiveAffordance[]
  isMovable?: boolean
  color?: string

  load_when_cut?: ItemName
  load_when_locked?: ItemName
  load_when_unlocked?: ItemName
  load_when_pushed?: ItemName
  load_when_pulled?: ItemName
}

export enum FieldPropertyName {
  DisableMovementQuests,
  IdentifyPositionInRelationToCoordinate,
  ForceUniqueItem

}

export enum LevelProperty {
  DisableMovementQuests,
  DisableSecondaryKeyUsage,
  GenerateRelativePositions,
  AllowColorIdentifiersEvenIfOnlyItemOfType,
  OnlyAllowRelationalIDsIfTheyExist
}

export type FieldProperty = {
  name: FieldPropertyName,
  data?: any
}

export type LevelTemplateGridRowField = [
  possibleKeys: ItemName[],
  fieldProperties?: FieldProperty[],
]
export type LevelTemplateGridRow = LevelTemplateGridRowField[]
export type LevelTemplateGrid = LevelTemplateGridRow[]

export type LevelTemplate = {
  id: LevelTemplateName // Unique identifier for the level
  grid: LevelTemplateGrid
  props?: LevelProperty[]
  prerequisites?: LevelTemplateName[]
}

// GAME PLAY/GRID UI

export type Level = {
  grid: Grid
}

// 2D Grid composed of fields
export type Grid = Field[][]

// Field that may contain a card
export type Field = {
  card: Card | undefined
  identifiers: string[]
  fieldProperties?: FieldProperty[]
}

// Card interface with mutable state
export type Card = {
  item: Item
  images: CardImage[]
}

export type CardImage = {
  name: string
  zIndex: number
  scale?: number
  offset?: [number, number]
  rotation? : number
}

// QUESTS, ACTIONS, AFFORDANCES

export type AlchemyAction = {
  sender: Field
  affordance: CapabilityPartnered
  senderKeys: string[]
  receiver: Field
  receiverKeys: string[]
}


export type Quest = {
  requiredAffordance: CapabilityPartnered
  requiredSenderKey?: string
  requiredReceiverKey?: string
}

// LEVEL ORGA

export type Progression = LevelTemplateName[]
export type Topic = {
  id: string,
  progressions: Progression[],
  finalPracticeRotation: LevelTemplateName[]
}

// LEARNING DATA

export enum RotationMode {
  ClimbingProgressions,
  FinalRotation
}

export type LearningDataForTopic = {
  topicId: string,
  lastSeenAt?: Date,
  indexOfCurrentProgression: number,
  indexOfCurrentLevel: number,
  rotationMode: RotationMode
}