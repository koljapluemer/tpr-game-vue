import { CapabilityCut } from "@/classes/capabilities/CapabilityCut"
import { ThingTemplate } from "@/classes/templates/ThingTemplate"


export const knifeTemplate = {
    "key": "KNIFE",
    "images": ["knife"],
    "capabilities": ["CUT"],
    "isMovable": true,
    "props": {
        "SIZE": "LARGE"
    }
}

export const knifeObject = new ThingTemplate(
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

