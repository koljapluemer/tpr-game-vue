import { TopicTemplate } from "@/classes/templates/TopicTemplate";
import { TopicTemplateParser } from "@/classes/templates/TopicTemplateParser";
import { expect, test } from "vitest";
import { simpleKnifeLevelTemplate } from "./LevelTemplateParser.test";
import { knifeObject } from "@/__tests__/data/knife";
import { kiwiObject } from "@/__tests__/data/kiwi";

const basicTopicDict = {
    "name": "topic-1",
    "progressions": [
        [
            "cut-kiwi-demo"
        ]
    ],
    "finalRotation": ["cut-kiwi-demo"]
}

const basicTopic = new TopicTemplate (
    "topic-1",
    [[simpleKnifeLevelTemplate]],
    [simpleKnifeLevelTemplate]

)

test('basic template parsing works: comparing name', () => {
    const topic = TopicTemplateParser.parseFromDict(basicTopicDict)
    expect(topic?.name).toEqual(basicTopic.name)
})

test('basic template parsing works: comparing progressions prop', () => {
    const topic = TopicTemplateParser.parseFromDict(basicTopicDict)
    expect(topic?.progressions).toEqual(basicTopic.progressions)
})

test('basic template parsing works: comparing finalRotation prop', () => {
    const topic = TopicTemplateParser.parseFromDict(basicTopicDict)
    expect(topic?.finalRotation).toEqual(basicTopic.finalRotation)
})