import type { TopicTemplate } from "@/models_backend/TopicTemplate"

export type Topic = {
    name: string,
    progressions: string[][],
    finalRotation: string[]
}

export function createTopicsFromBackendClassObjectList(templates: TopicTemplate[]): Topic[] {
    return templates.map(template => template.createTopicBasedOnMe())
}

