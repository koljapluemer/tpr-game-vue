import { pickRandom } from "@/utils/arrayUtils";
import type { LevelTemplate } from "./templates/LevelTemplate";
import type { TopicTemplate } from "./templates/TopicTemplate";

export class Topic {
    constructor(
        public readonly name: string,
        public readonly progressions: LevelTemplate[][],
        public readonly finalRotation: LevelTemplate[]
    ) {
        console.info('topic rotation', finalRotation)
        Topic.instances.push(this)
    }

    private static instances: Topic[] = []

    public static getAll(): Topic[] {
        return this.instances
    }

    public static getByName(name: string): Topic | undefined {
        const topic = this.getAll().find(topic => topic.name == name)
        return topic
    }

    public static doesExist(name: string): boolean {
        return this.getAll().some(topic => topic.name == name)
    }

    public static createFromTopicTemplate(template: TopicTemplate): Topic | undefined {
        // create every topic only once/name is unique
        // this is mostly here because in localhost every saves reruns the creation class
        // (maybe this is a bad smell, idk, TODO ?)
        if (Topic.doesExist(template.name)) return undefined
        return new Topic(
            template.name,
            template.progressions,
            template.finalRotation
        )
    }

    public getRandomRotationLevelTemplate(): LevelTemplate | undefined {
        if (!pickRandom(this.finalRotation)) {
            console.warn('cannot pick level from rotation, this should not happen!')
        }
        return pickRandom(this.finalRotation)
    }

}