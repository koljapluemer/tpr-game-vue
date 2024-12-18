import type { LevelProp } from "@/__tests__/classes/props/LevelProp"
import type { ThingTemplate } from "./ThingTemplate"
import type { LevelTemplateCell } from "./LevelTemplateCell"
import { FieldGrid } from "../FieldGrid"


export class LevelTemplate {
    constructor(
        public readonly name:string,
        private readonly grid: LevelTemplateCell[][],
        private readonly props: LevelProp[]
    ) {
        LevelTemplate.instances.push(this)
    }

    private static instances: LevelTemplate[] = []

    private static getAllLevelTemplates(): LevelTemplate[] {
        return this.instances
    }

    public static getThingByName(name: string): LevelTemplate | undefined {
        // WARNING: this fails with a === comparison
        // if have not the slightest idea why
        const level = this.getAllLevelTemplates().find(level => level.name == name )
        return level
    }


    get randomlyGeneratedFieldGrid():FieldGrid {
        // here we're going to use our template grid,
        // and our props
        // and pick random cells after the rules we have set,
        // giving a "definitive" actual grid back, which is then used
        // as a level
        return new FieldGrid([])
    }

    // should be rarely needed, except for tests
    get gridData():LevelTemplateCell[][] {
        return this.grid
    }
}