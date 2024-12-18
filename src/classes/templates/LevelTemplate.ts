import type { LevelProp } from "@/__tests__/classes/props/LevelProp"
import type { ThingTemplate } from "./ThingTemplate"
import type { LevelTemplateCell } from "./LevelTemplateCell"
import { FieldGrid } from "../FieldGrid"


export class LevelTemplate {
    constructor(
        public readonly name:string,
        private readonly grid: LevelTemplateCell[][],
        private readonly props: LevelProp[]
    ) {}

    get randomlyGeneratedFieldGrid():FieldGrid {
        // here we're going to use our template grid,
        // and our props
        // and pick random cells after the rules we have set,
        // giving a "definitive" actual grid back, which is then used
        // as a level
        return new FieldGrid([])
    }
}