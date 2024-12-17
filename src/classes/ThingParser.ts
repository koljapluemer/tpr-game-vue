import { Thing } from "./Thing";
import type { AffordancePackage } from "./AffordancePackage";
import { isValidAffordanceName } from "./Affordance";
import { getEnumValueIfValid, isArrayOfStrings, isRecordOfStrings, isTupleOfOneOrTwoStrings, isTupleOfTwoStrings } from "@/utils/parsingUtils";
import type { Capability } from "./capabilities/Capability";
import type { ThingPropertyDict } from "./ThingProperty";


export class ThingParser {
    public static parseThingFromDict(dict: Record<string, any>): Thing | undefined {
        const parsedKey = this.parseKey(dict)
        const parsedSecondaryKeys = this.parseSecondaryKeys(dict)
        const parsedCapabilities = this.parseCapabilities(dict)

        const parsedAffordancePackages = this.parseAffordancePackages(dict)
        const parsedIsMovable = this.parseIsMovable(dict)
        const parsedProps = this.parseProps(dict)
        const parsedImages = this.parseImages(dict)

        if (!parsedKey || parsedImages.length === 0) {
            console.log('cannot create Thing from string because its incomplete', dict)
            return undefined
        }

        return new Thing(
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
        return []
    }

    private static parseImages(dict: Record<string, any>): string[] {
        if (dict["images"] && isArrayOfStrings(dict["images"])) return dict["images"]
        return []
    }

    private static parseAffordancePackages(dict: Record<string, any>): AffordancePackage[] {
        console.log('packages...', dict["affordances"])
        const packages: AffordancePackage[] = []
        if (Array.isArray(dict["affordances"])) {
            console.log('is array')
            dict["affordances"].forEach(potentialPackage => {
                console.log('checking package')
                if (isTupleOfOneOrTwoStrings(potentialPackage) && isValidAffordanceName(potentialPackage[0])) {
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