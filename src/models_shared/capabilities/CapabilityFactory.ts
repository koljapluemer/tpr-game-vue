import type { Capability } from "./Capability"
import { CapabilityCut } from "./CapabilityCut"

// a factory class, mostly to avoid circular imports
export class CapabilityFactory {
    public static createBasedOnKey(key:string):Capability | undefined {
        switch(key) {
            case (CapabilityCut.key):
                return new CapabilityCut()
        }
        console.error('No fitting capability found for key:', key)
        return 
    }
}