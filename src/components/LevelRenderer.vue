<template>
    <h2 class="font-bold text-2xl text-center text-slate-800 p-2">
        <span v-if="currentQuest">
            {{ questKey }}
        </span>
    </h2>

    <div id="grid" class="flex items-center justify-center mt-10 " v-if="grid">
        <div class="flex flex-col gap-1 p-2 bg-slate-400">
            <div class="flex flex-row gap-1" v-for="row in grid">
                <FieldRenderer @startedDraggingFromField="onDragStart(field)" @droppedOnField="onDropOn(field)"
                    :field="field" v-for="field of row"></FieldRenderer>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import FieldRenderer from "./FieldRenderer.vue";
import { type AlchemyAction, type Card, type Field, type Grid, type LevelTemplate, type Quest } from "@/types";
import { handleDropInteraction } from "@/utils/alchemyUtils";
import { setIdentifiersForFields } from "@/utils/identifierUtils";
import { getActionableActionsOnGrid } from "@/utils/actionUtils";
import { actionFulfilledQuest, getAvailableQuestsBasedonActionList, getQuestKey } from "@/utils/questUtils";
import { getGridFromLevelTemplate } from "@/utils/gridUtils";

const props = defineProps<{
    level: LevelTemplate;
}>();

const grid = ref(undefined as Grid | undefined)
const availableActions = ref([] as AlchemyAction[])
const availableQuests = ref([] as Quest[])

const currentQuest = ref(undefined as Quest | undefined)
const lastQuest = ref(undefined as Quest | undefined)

grid.value = getGridFromLevelTemplate(props.level)
updateGrid()
startRandomQuestFromList()

let fieldWhereMovementStartedFrom: Field | undefined = undefined

function onDragStart(field: Field) {
    console.log("child field started drag", field);
    if (typeof field.card !== "undefined") {
        fieldWhereMovementStartedFrom = field
    }
}

function onDropOn(field: Field) {
    const actionThatHappenend = handleDropInteraction(fieldWhereMovementStartedFrom, field)
    if (actionThatHappenend) {
        console.log('look, an action:', actionThatHappenend)
        if (currentQuest.value) {
            const questWasDone = actionFulfilledQuest(actionThatHappenend, currentQuest.value)
            if (questWasDone) {
                endCurrentQuest(true)
            }
        }
    }
    updateGrid()

}

function updateGrid() {
    if (grid.value) {
        setIdentifiersForFields(grid.value)
        availableActions.value = getActionableActionsOnGrid(grid.value)
        availableQuests.value = getAvailableQuestsBasedonActionList(availableActions.value)
        console.log('quests', availableQuests.value)
    }
}

const questKey = computed(() => {
    if (currentQuest.value) {
        return getQuestKey(currentQuest.value)
    } else {
        return undefined
    }
})

function startRandomQuestFromList() {
    const questsWithoutLast = availableQuests.value.filter(quest => quest != lastQuest.value)
    if (questsWithoutLast.length > 0) {
        currentQuest.value = questsWithoutLast[Math.floor((Math.random() * questsWithoutLast.length))]
        lastQuest.value = currentQuest.value
    }
}

function endCurrentQuest(questWasSuccessful: boolean) {
    currentQuest.value = undefined
    startRandomQuestFromList()
}


</script>
