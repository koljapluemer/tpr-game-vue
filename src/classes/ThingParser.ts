import { z } from "zod";
import { Thing } from "./Thing";

const stringScheme = z.string()

export class ThingParser {
    public static parseThingFromDict(dict:any): Thing | undefined {
        const key = stringScheme.safeParse(dict["key"])
        // console.log('key', key, dict) 
        if (key.success) {
            return new Thing(key.data, [], [], [], false, {}, [])
        } else {
            return undefined
        }
    }
}