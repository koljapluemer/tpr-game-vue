// STATIC DATA

import type { Capability } from '../src/classes/capabilities/Capability'
import type { CapabilityPartnered, PassiveAffordance } from './data/affordances'
import { ItemName } from './data/items'
import type { LevelTemplateName } from './data/levelTemplates'

 const LanguageCode = {
  "German": "de", "Arabic": "ar", "Estonian": "et"
}

 type LanguageCodeType = (typeof LanguageCode)[keyof typeof LanguageCode]




 type Item = {
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

 enum FieldPropertyName {
  DisableMovementQuests,
  IdentifyPositionInRelationToCoordinate,
  ForceUniqueItem

}

 enum LevelProperty {
  DisableMovementQuests,
  DisableSecondaryKeyUsage,
  GenerateRelativePositions,
  AllowColorIdentifiersEvenIfOnlyItemOfType,
  OnlyAllowRelationalIDsIfTheyExist,
  IsIntroTutorial
}

 type FieldProperty = {
  name: FieldPropertyName,
  data?: any
}

 type LevelTemplateGridRowField = [
  possibleKeys: ItemName[],
  fieldProperties?: FieldProperty[],
]
 type LevelTemplateGridRow = LevelTemplateGridRowField[]
 type LevelTemplateGrid = LevelTemplateGridRow[]

 type LevelTemplate = {
  id: LevelTemplateName // Unique identifier for the level
  grid: LevelTemplateGrid
  props?: LevelProperty[]
  prerequisites?: LevelTemplateName[]
}

// GAME PLAY/GRID UI

 type Level = {
  grid: Grid
}

// 2D Grid composed of fields
 type Grid = Field[][]

// Field that may contain a card
 type Field = {
  card: Card | undefined
  identifiers: string[]
  fieldProperties?: FieldProperty[]
}

// Card interface with mutable state
 type Card = {
  item: Item
  images: CardImage[]
}

 type CardImage = {
  name: string
  zIndex: number
  scale?: number
  offset?: [number, number]
  rotation? : number
}

// QUESTS, ACTIONS, AFFORDANCES

type AlchemyAction = {
  sender: Field
  affordance: CapabilityPartnered
  senderKeys: string[]
  receiver: Field
  receiverKeys: string[]
}


type Quest = {
  requiredAffordance: CapabilityPartnered
  requiredSenderKey?: string
  requiredReceiverKey?: string
}

// LEVEL ORGA

type Progression = LevelTemplateName[]
type Topic = {
  id: string,
  progressions: Progression[],
  finalPracticeRotation: LevelTemplateName[]
}

// LEARNING DATA

enum RotationMode {
  ClimbingProgressions,
  FinalRotation
}

type LearningDataForTopic = {
  topicId: string,
  lastSeenAt?: Date,
  indexOfCurrentProgression: number,
  indexOfCurrentLevel: number,
  rotationMode: RotationMode
}