import type { ItemName } from "@/data/items"
import type { Capability } from "./capabilities/Capability"
import type { PassiveAffordance } from "@/data/affordances"

export type RefactorItem = {
    id: ItemName
    primaryKey: string
    images: string[]
  
    secondaryKeys?: string[]
    capabilities: Capability[] 
    affordances?: PassiveAffordance[]
    isMovable?: boolean
    color?: string
  
    // load_when_cut?: ItemName
    // load_when_locked?: ItemName
    // load_when_unlocked?: ItemName
    // load_when_pushed?: ItemName
    // load_when_pulled?: ItemName
  }
  