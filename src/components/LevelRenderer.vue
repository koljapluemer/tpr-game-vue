<template>
    <div class="flex flex-col items-center w-full h-full max-h-full max-w-full">
        <div class="min-h-20 h-20">
            <QuestRenderer :quest="currentQuest" v-if="currentQuest"></QuestRenderer>
        </div>

        <div id="grid" class="flex flex-col items-center justify-center w-full h-full gap-1 p-1 max-h-full max-w-full"
            v-if="grid">
            <div class="flex flex-row gap-1 bg-base-300 p-1 justify-center" v-for="row in grid">
                <FieldRenderer @startedDraggingFromField="onDragStart(field)" @droppedOnField="onDropOn(field)"
                    :field="field" v-for="field of row"></FieldRenderer>
            </div>

        </div>
    </div>

    <SoundEffectPlayer ref="soundEffectPlayer"></SoundEffectPlayer>

</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import FieldRenderer from "./FieldRenderer.vue";
import { type AlchemyAction, type Card, type Field, type Grid, type LevelTemplate, type Quest } from "@/types";
import { setIdentifiersForFields } from "@/utils/identifierUtils";
import { getActionableActionsOnGrid, getActionsForWhenFieldIsDroppedOnField } from "@/utils/alchemyUtils";
import { actionFulfilledQuest, getAvailableQuestsBasedOnLevel, isQuestStillPossible } from "@/utils/questUtils";
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
const availableActions = ref([] as AlchemyAction[])
const availableQuests = ref([] as Quest[])

const currentQuest = ref(undefined as Quest | undefined)
const lastQuest = ref(undefined as Quest | undefined)

const soundEffectPlayer = ref<InstanceType<typeof SoundEffectPlayer>>()

const columns = ref(2)
const rows = ref(2)

grid.value = getGridFromLevelTemplate(props.level)
updateGrid()
startRandomQuestFromList()

let fieldWhereMovementStartedFrom: Field | undefined = undefined

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
                        console.log('quest succeeded by action, ending...')
                        endCurrentQuest(true)
                        break
                    }

                }
                if (!questWasDone) {
                    setIdentifiersForFields(grid.value)
                    if (!isQuestStillPossible(currentQuest.value, grid.value)) {
                        console.log('quest now impossible')
                        endCurrentQuest(false)
                        requestPlayStandard(StandardSound.Failure)
                    } else {
                        requestPlayStandard(StandardSound.Wrong)
                    }
                }
            }
        }
    } else {
        console.warn('drop interaction registered but no starting field was ever set')
    }
    updateGrid()

}

function updateGrid() {
    if (grid.value) {
        setIdentifiersForFields(grid.value)
        availableActions.value = getActionableActionsOnGrid(grid.value)
        availableQuests.value = getAvailableQuestsBasedOnLevel(props.level, grid.value, true)
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
    const questsWithoutLast = availableQuests.value.filter(quest => quest != lastQuest.value)
    if (questsWithoutLast.length > 0) {
        currentQuest.value = questsWithoutLast[Math.floor((Math.random() * questsWithoutLast.length))]
        lastQuest.value = currentQuest.value
    } else {
        emit("noMoreOpenQuests")
    }
}

function endCurrentQuest(questWasSuccessful: boolean) {
    if (questWasSuccessful) {
        handleSuccess()
    }
    currentQuest.value = undefined
    setTimeout(startRandomQuestFromList, 1000);
}



function handleSuccess() {
    requestPlayStandard(StandardSound.Success)
}

function requestPlayStandard(sound: StandardSound) {
    if (soundEffectPlayer.value !== undefined) {
        soundEffectPlayer.value.playStandardSound(sound)
    }
}


</script>
