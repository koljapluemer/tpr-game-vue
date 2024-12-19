import type { Topic } from "@/models_frontend/Topic";
import type { LevelTemplate } from "./LevelTemplate";

// this structure is almost going to be copied, albeit not quite:
// the actual Topic also holds progress data, while this holds the pure template
// (at least that's the plan)
export class TopicTemplate {
    constructor(
        public readonly name: string,
        public readonly progressions: LevelTemplate[][],
        public readonly finalRotation: LevelTemplate[]
    ) {
        console.info('topic template rotation', finalRotation)
        TopicTemplate.instances.push(this)
    }

    private static instances: TopicTemplate[] = []

    public static getAll(): TopicTemplate[] {
        return this.instances
    }

    public static getByName(name: string): TopicTemplate | undefined {
        // WARNING: this fails with a === comparison
        // if have not the slightest idea why
        const topic = this.getAll().find(topic => topic.name == name)
        return topic
    }

    public static createTopicsFromBackendClassObjectList(templates: TopicTemplate[]): Topic[] {
        return templates.map(template => template.createTopicBasedOnMe())
    }

    public createTopicBasedOnMe(): Topic {
        // getting progressions
        const progressions: string[][] = []
        this.progressions.forEach(progressionTemplate => {
            const progression: string[] = []
            progressionTemplate.forEach(levelTemplate => {
                progression.push(levelTemplate.name)
            })
            progressions.push(progression)
        })
        // getting final rotation
        const rotation: string[] = this.finalRotation.map(levelTemplate => levelTemplate.name)
        // making object
        return {
            name: this.name,
            progressions: progressions,
            finalRotation: rotation
        }
    }




}