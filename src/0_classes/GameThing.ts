import type { ItemName } from "@/data/items"
import type { Capability } from "./capabilities/Capability"
import type { PassiveAffordance } from "@/data/affordances"
import type { ThingProperty } from "@/0_new_data/new_types"
import type { RefactorField } from "./RefactorField"
import type { ThingTemplate } from "@/0_new_data/thing_templates/things"

// mirrors Thing (the data) but represents an object actually in the game
// as such, some properties change, some or omitted
export class GameThing {
    images: string[] = []
    keys: string[] = []
  
    capabilities: Capability[]  = []
    affordances: PassiveAffordance[] = []
    properties: ThingProperty[] = []
    isMovable: boolean = false
    thingTemplate: ThingTemplate

    public static makeGameThingForField(field:RefactorField, thing:ThingTemplate) {
      // field may override some preps, e.g. allow or disallow secondary keys
      // TODO: do I need the grid here as well, for stuff like "behind the church"?
    }
  

  }
  