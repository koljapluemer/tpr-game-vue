import type { LevelProp } from "@/__tests__/classes/props/LevelProp"
import type { LevelTemplateCell } from "./LevelTemplateCell"


export class LevelTemplate {
    constructor(
        public readonly name:string,
        private readonly grid: LevelTemplateCell[][],
        private readonly props: LevelProp[]
    ) {
        LevelTemplate.instances.push(this)
    }

    private static instances: LevelTemplate[] = []

    public static getAll(): LevelTemplate[] {
        return this.instances
    }

    public static getByName(name: string): LevelTemplate | undefined {
        // WARNING: this fails with a === comparison
        // if have not the slightest idea why
        const level = this.getAll().find(level => level.name == name )
        return level
    }


    // should be rarely needed, except for tests
    get gridData():LevelTemplateCell[][] {
        return this.grid
    }
}