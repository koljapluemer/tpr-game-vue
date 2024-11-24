<template>
    <div class="flex flex-col items-center w-full h-full max-h-full max-w-full">
        <div class="min-h-20 h-20">
            <QuestRenderer :quest="currentQuest" v-if="currentQuest"></QuestRenderer>
        </div>

        <div id="grid"
            class="flex flex-col items-center justify-center mt-10 gap-2 p-2 max-h-full max-w-full bg-base-300 "
            v-if="grid">
            <div class="flex flex-row gap-2 justify-center" v-for="row in grid">
                <FieldRenderer @startedDraggingFromField="onDragStart(field)" @droppedOnField="onDropOn(field)"
                    :field="field" :cellSize="cellSize" v-for="field of row"></FieldRenderer>
            </div>

        </div>
    </div>

    <SoundEffectPlayer ref="soundEffectPlayer"></SoundEffectPlayer>

</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import FieldRenderer from "./FieldRenderer.vue";
import { LevelProperty, type AlchemyAction, type Card, type Field, type Grid, type LevelTemplate, type Quest } from "@/types";
import { setIdentifiersForFields } from "@/utils/identifierUtils";
import { getActionableActionsOnGrid, getActionsForWhenFieldIsDroppedOnField } from "@/utils/alchemyUtils";
import { actionFulfilledQuest, getAvailableQuestsBasedOnLevel, getQuestKey, isQuestStillPossible } from "@/utils/questUtils";
import { getGridFromLevelTemplate } from "@/utils/gridUtils";
import { executeActionEffects, executeMoveToField } from "@/utils/affordanceBespokeUtils";
import SoundEffectPlayer from "./SoundEffectPlayer.vue";
import QuestRenderer from "./QuestRenderer.vue";
import { StandardSound } from "@/data/standardSounds";



const props = defineProps<{
    level: LevelTemplate;
}>();

const emit = defineEmits(['noMoreOpenQuests'])

const grid = ref(undefined as Grid | undefined)

const currentQuest = ref(undefined as Quest | undefined)
const lastQuestKey = ref(undefined as string | undefined)

const soundEffectPlayer = ref<InstanceType<typeof SoundEffectPlayer>>()

const timeoutId = ref(undefined as number | undefined)

const maximumQuestsToBePlayedInThisLevel = ref(5)
const questsPlayedInThisLevel = ref(0)


let fieldWhereMovementStartedFrom: Field | undefined = undefined

onMounted(() => {
    grid.value = getGridFromLevelTemplate(props.level)
    startRandomQuestFromList()

})

function onDragStart(field: Field) {
    if (typeof field.card !== "undefined") {
        fieldWhereMovementStartedFrom = field
    }
}

function onDropOn(field: Field) {
    // not sure how there would ever be a drop on without the movement field set
    if (fieldWhereMovementStartedFrom) {
        const simplyMovedToEmptyField = executeMoveToField(fieldWhereMovementStartedFrom, field)
        if (!simplyMovedToEmptyField) {
            const actionsThatHappenend = getActionsForWhenFieldIsDroppedOnField(fieldWhereMovementStartedFrom, field)
            actionsThatHappenend.forEach(action => {
                executeActionEffects(action)
            })
            let questWasDone = false
            if (currentQuest.value && grid.value) {

                for (const action of actionsThatHappenend) {
                    questWasDone = actionFulfilledQuest(action, currentQuest.value)
                    if (questWasDone) {
                        endCurrentQuest(true)
                        return
                    }

                }
                if (!questWasDone) {
                    setIdentifiersForFields(grid.value, props.level.props)
                    requestPlayStandard(StandardSound.Wrong)

                    if (!isQuestStillPossible(currentQuest.value, grid.value)) {
                        endCurrentQuest(false)
                    }
                }
            }
        }
    } else {
        console.warn('drop interaction registered but no starting field was ever set')
    }

}


const flatGrid = computed((): Field[] => {
    const flatGrid: Field[] = []
    grid.value?.forEach(row => {
        row.forEach(cell => {
            flatGrid.push(cell)
        })
    })
    return flatGrid
})

function startRandomQuestFromList() {
    questsPlayedInThisLevel.value += 1
    console.log('quests played', questsPlayedInThisLevel.value)
    if (grid.value !== undefined) {
        setIdentifiersForFields(grid.value, props.level.props)

    const availableQuests = getAvailableQuestsBasedOnLevel(props.level, grid.value, false)
    const questsWithoutLast = availableQuests.filter(quest => getQuestKey(quest) !== lastQuestKey.value)
    if (questsWithoutLast.length > 0 &&  questsPlayedInThisLevel.value < maximumQuestsToBePlayedInThisLevel.value ) {
        currentQuest.value = questsWithoutLast[Math.floor((Math.random() * questsWithoutLast.length))]
        lastQuestKey.value = getQuestKey(currentQuest.value)
    } else {
        // TODO: rename this maybe, since it's also triggered when max quests per level are exceeded
        emit("noMoreOpenQuests")
    }
} else {
    console.warn('level grid undefined, this should never happen')
}
}

function endCurrentQuest(questWasSuccessful: boolean) {
    if (questWasSuccessful) {
        handleSuccess()
    }
    currentQuest.value = undefined
    if (timeoutId !== undefined) {
        clearTimeout(timeoutId.value)
    }
    timeoutId.value  = setTimeout(startRandomQuestFromList, 1000);
}



function handleSuccess() {
    requestPlayStandard(StandardSound.Success)
}

function requestPlayStandard(sound: StandardSound) {
    if (soundEffectPlayer.value !== undefined) {
        soundEffectPlayer.value.playStandardSound(sound)
    }
}

const cellSize = computed(() => {
    let size = 300
    let maxWidth = 100000
    let maxHeight = 100000
    if (props.level.grid[0].length !== undefined) {
        maxWidth = (window.screen.width / props.level.grid[0]?.length) * 0.85;
    }
    if (props.level.grid.length !== undefined) {
        maxHeight = (window.screen.height / props.level.grid.length) - 170 * 0.7;
    }
    size = Math.min(size, maxWidth, maxHeight)
    return `${size}px`
})


</script>
