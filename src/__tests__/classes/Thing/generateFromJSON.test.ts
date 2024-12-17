import { kiwiObject, kiwiTemplate } from "@/__tests__/data/kiwi"
import { knifeObject, knifeTemplate } from "@/__tests__/data/knife"
import { ThingParser } from "@/classes/ThingParser"
import { expect, test } from "vitest"


test('JSON generation of knife Thing: affordancePackages correctly parsed', () => {
    const thing = ThingParser.parseThingFromDict(knifeTemplate);
    expect(thing?.affordancePackages).toEqual(knifeObject.affordancePackages);
});

test('JSON generation of knife Thing: capabilities correctly parsed', () => {
    const thing = ThingParser.parseThingFromDict(knifeTemplate);
    expect(thing?.capabilities).toEqual(knifeObject.capabilities);
});

test('JSON generation of knife Thing: images correctly parsed', () => {
    const thing = ThingParser.parseThingFromDict(knifeTemplate);
    expect(thing?.images).toEqual(knifeObject.images);
});

test('JSON generation of knife Thing: isMovable correctly parsed', () => {
    const thing = ThingParser.parseThingFromDict(knifeTemplate);
    expect(thing?.isMovable).toEqual(knifeObject.isMovable);
});

test('JSON generation of knife Thing: key correctly parsed', () => {
    const thing = ThingParser.parseThingFromDict(knifeTemplate);
    expect(thing?.key).toEqual(knifeObject.key);
});

test('JSON generation of knife Thing: secondaryKeys correctly parsed', () => {
    const thing = ThingParser.parseThingFromDict(knifeTemplate);
    expect(thing?.secondaryKeys).toEqual(knifeObject.secondaryKeys);
});




test('JSON generation of kiwi Thing: affordancePackages correctly parsed', () => {
    const thing = ThingParser.parseThingFromDict(kiwiTemplate);
    expect(thing?.affordancePackages).toEqual(kiwiObject.affordancePackages);
});

test('JSON generation of kiwi Thing: capabilities correctly parsed', () => {
    const thing = ThingParser.parseThingFromDict(kiwiTemplate);
    expect(thing?.capabilities).toEqual(kiwiObject.capabilities);
});

test('JSON generation of kiwi Thing: images correctly parsed', () => {
    const thing = ThingParser.parseThingFromDict(kiwiTemplate);
    expect(thing?.images).toEqual(kiwiObject.images);
});

test('JSON generation of kiwi Thing: isMovable correctly parsed', () => {
    const thing = ThingParser.parseThingFromDict(kiwiTemplate);
    expect(thing?.isMovable).toEqual(kiwiObject.isMovable);
});

test('JSON generation of kiwi Thing: key correctly parsed', () => {
    const thing = ThingParser.parseThingFromDict(kiwiTemplate);
    expect(thing?.key).toEqual(kiwiObject.key);
});

test('JSON generation of kiwi Thing: secondaryKeys correctly parsed', () => {
    const thing = ThingParser.parseThingFromDict(kiwiTemplate);
    expect(thing?.secondaryKeys).toEqual(kiwiObject.secondaryKeys);
});
