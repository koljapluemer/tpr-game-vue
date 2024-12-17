import { AffordanceName } from "@/classes/Affordance"
import type { AffordancePackage } from "@/classes/AffordancePackage"
import { Thing } from "@/classes/Thing"
import { ThingParser } from "@/classes/ThingParser"
import { expect, test } from "vitest"

const kiwiTemplate = {
    "key": "KIWI",
    "secondaryKeys": ["FRUIT"],
    "images": ["kiwi_uncut"],
    "capabilities": [],
    "affordances": [
        ["IsCuttable", "KIWI_HALVES"]
    ],
    "isMovable": true
}


const kiwiCutObject = new Thing("KIWI_HALVES", [], [], [], true, {}, ["kiwi_cut"])

const kiwiAffordancePackage: AffordancePackage = {
    affordance: "IsCuttable",
    keyOfThingToChangeTo: kiwiCutObject.key
}

const kiwiObj = new Thing("KIWI", ["FRUIT"], [], [kiwiAffordancePackage], true, {}, ["kiwi_uncut"])


test('JSON generation of kiwi Thing: affordancePackages correctly parsed', () => {
    const thing = ThingParser.parseThingFromDict(kiwiTemplate);
    expect(thing?.affordancePackages).toEqual(kiwiObj.affordancePackages);
});

test('JSON generation of kiwi Thing: capabilities correctly parsed', () => {
    const thing = ThingParser.parseThingFromDict(kiwiTemplate);
    expect(thing?.capabilities).toEqual(kiwiObj.capabilities);
});

test('JSON generation of kiwi Thing: images correctly parsed', () => {
    const thing = ThingParser.parseThingFromDict(kiwiTemplate);
    expect(thing?.images).toEqual(kiwiObj.images);
});

test('JSON generation of kiwi Thing: isMovable correctly parsed', () => {
    const thing = ThingParser.parseThingFromDict(kiwiTemplate);
    expect(thing?.isMovable).toEqual(kiwiObj.isMovable);
});

test('JSON generation of kiwi Thing: key correctly parsed', () => {
    const thing = ThingParser.parseThingFromDict(kiwiTemplate);
    expect(thing?.key).toEqual(kiwiObj.key);
});

test('JSON generation of kiwi Thing: secondaryKeys correctly parsed', () => {
    const thing = ThingParser.parseThingFromDict(kiwiTemplate);
    expect(thing?.secondaryKeys).toEqual(kiwiObj.secondaryKeys);
});
