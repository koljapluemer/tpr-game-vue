import { ThingTemplate, type ThingPropertyDict } from "./ThingTemplate";
import type { AffordancePackage } from "../AffordancePackage";
import { getEnumValueIfValid, isArrayOfStrings, isRecordOfStrings, isTupleOfNumberAndNumberOrJustOneString, isTupleOfOneOrTwoStrings, isTupleOfTwoStrings } from "@/utils/parsingUtils";
import { Capability } from "../capabilities/Capability";
import { Affordance } from "../Affordance";
import { CapabilityFactory } from "../capabilities/CapabilityFactory";


export class ThingTemplateParser {
    public static parseThingFromDict(dict: Record<string, any>): ThingTemplate | undefined {
        const parsedKey = this.parseKey(dict)
        const parsedSecondaryKeys = this.parseSecondaryKeys(dict)
        const parsedCapabilities = this.parseCapabilities(dict)

        const parsedAffordancePackages = this.parseAffordancePackages(dict)
        const parsedIsMovable = this.parseIsMovable(dict)
        const parsedProps = this.parseProps(dict)
        const parsedImages = this.parseImages(dict)

        if (!parsedKey || parsedImages.length === 0) {
            console.warn('cannot create Thing from string because required props missing', dict)
            return undefined
        }

        return new ThingTemplate(
            parsedKey,
            parsedSecondaryKeys,
            parsedCapabilities,
            parsedAffordancePackages,
            parsedIsMovable,
            parsedProps,
            parsedImages
        )
    }


    private static parseKey(dict: Record<string, any>): string | undefined {
        return dict["key"]
    }

    private static parseIsMovable(dict: Record<string, any>): boolean {
        return dict["isMovable"]
    }

    private static parseSecondaryKeys(dict: Record<string, any>): string[] {
        if (dict["secondaryKeys"] && isArrayOfStrings(dict["secondaryKeys"])) return dict["secondaryKeys"]
        return []
    }

    private static parseCapabilities(dict: Record<string, any>): Capability[] {
        if (!isArrayOfStrings(dict["capabilities"])) {
            console.warn('capabilities string has wrong shape:', dict["capabilties"])
            return []
        }

        const capabilities: Capability[] = []
        dict["capabilities"].forEach((possibleCapabilityName: string) => {
            const capability = this.createCapabilityIfValid(possibleCapabilityName)
            if (capability) capabilities.push(capability)
        });
        return capabilities
    }

    private static createCapabilityIfValid(key: string): Capability | undefined {
        const capability = CapabilityFactory.createBasedOnKey(key)
        if (capability) {
            return capability
        } else {
            console.warn('invalid capability:', key)
        }
    }

    private static parseImages(dict: Record<string, any>): string[] {
        if (dict["images"] && isArrayOfStrings(dict["images"])) return dict["images"]
        return []
    }

    private static parseAffordancePackages(dict: Record<string, any>): AffordancePackage[] {
        const packages: AffordancePackage[] = []
        if (Array.isArray(dict["affordances"])) {
            dict["affordances"].forEach(potentialPackage => {
                if (isTupleOfNumberAndNumberOrJustOneString(potentialPackage) && Affordance[potentialPackage[0]]) {
                    packages.push(
                        {
                            affordance: potentialPackage[0],
                            keyOfThingToChangeTo: potentialPackage[1]
                        }
                    )
                } else {
                    console.warn('invalid affordance package string:', potentialPackage)
                }
            })
        }
        return packages
    }


    private static parseProps(dict: Record<string, any>): ThingPropertyDict {
        return {}
    }

}

