import { progressions } from "@/data/levelTemplates";
import { LevelProperty, type LevelTemplate } from "@/types";
import { getLevelTemplateByID } from "@/utils/levelUtils";
import { reactive } from "vue";

export const levelStore = reactive({
    currentLevel: undefined as LevelTemplate | undefined,
    currentProgression: progressions[0],
    levelIndexWithinProgression: 0,
    currentLevelRepetitionCounter: 0,
    levelLoadedAt: Date.now(),

    loadNextLevel() {
        // if no currentLevel, set to initial:
        if (this.currentLevel === undefined) {
            this._load()
        }
        // if current level, check if we're to repeat it
        if (this.currentLevel?.props?.includes(LevelProperty.RepeatOnce)) {
            if (this.currentLevelRepetitionCounter == 0) {
                console.log('repeating level once')
                this.repeatCurrentLevel()
                return
            }
        }
        if (this.currentLevel?.props?.includes(LevelProperty.RepeatFourTimes)) {
            if (this.currentLevelRepetitionCounter < 3) {
                console.log('repeating 4 times')
                this.repeatCurrentLevel()
                return
            }
        }
        // for now, simply loop last level of progression if out of levels
        if (this.levelIndexWithinProgression < this.currentProgression.length - 1) {
            this.levelIndexWithinProgression += 1
            this.currentLevelRepetitionCounter = 0
            this._load()
            return
        } else {
            this.repeatCurrentLevel()
            return
        }
    },

    _load() {
        const nextLevel = getLevelTemplateByID(this.currentProgression[this.levelIndexWithinProgression])
        this.currentLevel = nextLevel
        this.levelLoadedAt = Date.now()
    },

    repeatCurrentLevel() {
        if (this.currentLevel !== undefined) {
            this.currentLevelRepetitionCounter += 1
            this._load()
        } else {
            this.loadNextLevel()
        }
    }
})