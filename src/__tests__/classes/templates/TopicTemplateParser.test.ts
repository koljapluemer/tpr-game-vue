import { TopicTemplate } from "@/classes/templates/TopicTemplate";
import { TopicTemplateParser } from "@/classes/templates/TopicTemplateParser";
import { expect, test } from "vitest";
import { simpleKnifeLevelTemplate } from "./LevelTemplateParser.test";

const basicTopicDict = {
    "name": "cut-kiwi-demo",
    "progressions": [
        [
            "cut-kiwi-basic"
        ]
    ],
    "finalRotation": []
}

const basicTopic = new TopicTemplate (
    "cut-kiwi-demo",
    [[simpleKnifeLevelTemplate]],
    []

)

test('basic template parsing works', () => {
    const topic = TopicTemplateParser.parseFromDict({basicTopic: basicTopicDict})
    expect(topic).toEqual(basicTopic)
})