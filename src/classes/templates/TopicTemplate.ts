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
        TopicTemplate.instances.push(this)
    }

    private static instances: TopicTemplate[] = []

    public static getAll(): TopicTemplate[] {
        return this.instances
    }

    public static getThingByName(name: string): TopicTemplate | undefined {
        // WARNING: this fails with a === comparison
        // if have not the slightest idea why
        const topic = this.getAll().find(topic => topic.name == name)
        return topic
    }
}