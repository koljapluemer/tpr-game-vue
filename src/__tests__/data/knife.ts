import { CapabilityCut } from "@/classes/capabilities/CapabilityCut"
import { ThingTemplate } from "@/classes/Thing"


export const knifeTemplate = {
    "key": "KNIFE",
    "images": ["knife"],
    "capabilities": ["CUT"],
    "isMovable": true,
    "props": {
        "SIZE": "LARGE"
    }
}

export const knifeObject: ThingTemplate = new ThingTemplate(
    "KNIFE",
    [],
    [new CapabilityCut()],
    [],
    true,
    {
        "SIZE": "LARGE"
    },
    ["knife"]
)

