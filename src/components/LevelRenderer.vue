<template>
    <div class="flex flex-col items-center ">
        <div class="">
            <div class="min-h-24 h-24">
                <QuestRenderer :quest="currentQuest" v-if="currentQuest"></QuestRenderer>
            </div>

            <div id="grid" class="flex items-center justify-center " v-if="grid">
                <div class="flex flex-col gap-1 bg-base-200 shadow-xl p-2 my-2 card">
                    <div class="flex flex-row gap-1" v-for="row in grid">
                        <FieldRenderer @startedDraggingFromField="onDragStart(field)" @droppedOnField="onDropOn(field)"
                            :field="field" v-for="field of row"></FieldRenderer>
                    </div>
                </div>
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
import { actionFulfilledQuest, getAvailableQuestsBasedOnLevel } from "@/utils/questUtils";
import { getGridFromLevelTemplate } from "@/utils/gridUtils";
import { executeActionEffects, executeMoveToField } from "@/utils/affordanceBespokeUtils";
import SoundEffectPlayer from "./SoundEffectPlayer.vue";
import QuestRenderer from "./QuestRenderer.vue";



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
            for (const action of actionsThatHappenend) {
                if (currentQuest.value) {
                    const questWasDone = actionFulfilledQuest(action, currentQuest.value)
                    if (questWasDone) {
                        endCurrentQuest(true)
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
        availableQuests.value = getAvailableQuestsBasedOnLevel(props.level, grid.value, false)
    }
}


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
    if (soundEffectPlayer.value !== undefined) {
        soundEffectPlayer.value.playSound()
    }
}


</script>
