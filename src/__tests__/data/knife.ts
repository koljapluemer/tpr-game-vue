import { CapabilityCut } from "@/classes/capabilities/CapabilityCut"
import { Thing } from "@/classes/Thing"


export const knifeTemplate = {
    "key": "KNIFE",
    "images": ["knife"],
    "capabilities": ["CUT"],
    "isMovable": true,
    "props": {
        "SIZE": "LARGE"
    }
}

export const knifeObject: Thing = new Thing(
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

