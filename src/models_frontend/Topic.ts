import type { TopicTemplate } from "@/models_backend/TopicTemplate"

export type Topic = {
    name: string,
    progressions: string[][],
    finalRotation: string[]
}

export function createTopicsFromBackendClassObjectList(templates: TopicTemplate[]): Topic[] {
    return templates.map(template => createTopicFromBackendClassObject(template))
}

function createTopicFromBackendClassObject(template: TopicTemplate): Topic {
    // getting progressions
    const progressions: string[][] = []
    template.progressions.forEach(progressionTemplate => {
        const progression: string[] = []
        progressionTemplate.forEach(levelTemplate => {
            progression.push(levelTemplate.name)
        })
        progressions.push(progression)
    })
    // getting final rotation
    const rotation: string[] = template.finalRotation.map(levelTemplate => levelTemplate.name)
    // making object
    return {
        name: template.name,
        progressions: progressions,
        finalRotation: rotation
    }

} 