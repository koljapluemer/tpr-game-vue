<template>
    <div class="flex flex-col items-center w-full h-full max-h-full max-w-full">
        <div class="min-h-20 h-20">
            <div :class="'flex flex-row gap-2 items-center card  shadow-xl p-2 my-2 bg-base-200 ' + questFeedbackClass"
                v-if="currentQuest" :key="getQuestKey(currentQuest)">
                <QuestRenderer :quest="currentQuest"></QuestRenderer>
            </div>
        </div>

        <div id="grid"
            class="flex flex-col items-center justify-center mt-10 gap-2 p-2 max-h-full max-w-full bg-base-300 "
            :class="currentFeedbackState === FeedbackState.correct ? questFeedbackClass : ''" v-if="grid">
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
import { LevelProperty, type AlchemyAction, type Card, type Field, type Grid, type LevelTemplate, type Quest } from "_old/types";
import { setIdentifiersForFields } from "_old/utils/identifierUtils";
import { getActionableActionsOnGrid, getActionsForWhenFieldIsDroppedOnField } from "_old/utils/alchemyUtils";
import { actionFulfilledQuest, getAvailableQuestsBasedOnLevel, getQuestKey, isQuestStillPossible } from "_old/utils/questUtils";
import { getGridFromLevelTemplate } from "_old/utils/gridUtils";
import { executeActionEffects, executeMoveToField } from "_old/utils/affordanceBespokeUtils";
import SoundEffectPlayer from "./SoundEffectPlayer.vue";
import QuestRenderer from "./QuestRenderer.vue";
import { StandardSound } from "_old/data/standardSounds";
import { skipWritingToFirebase, useOnlyQuestsThatArePlayable } from "@/debugSettings";
import { globalDataStore } from "@/stores/globalData";

import { v4 as uuidv4 } from 'uuid';
import { useFirestore } from "@/composables/useFireStore";


const props = defineProps<{
    level: LevelTemplate;
}>();

const emit = defineEmits(['noMoreOpenQuests'])

const grid = ref(undefined as Grid | undefined)
const currentQuest = ref(undefined as Quest | undefined)
const soundEffectPlayer = ref<InstanceType<typeof SoundEffectPlayer>>()

const maximumQuestsToBePlayedInThisLevel = ref(5)
const questsPlayedInThisLevel = ref(0)

const userId = ref(undefined as undefined | string)

const { writeToCollection } = useFirestore();
const levelStats = ref({
    questCount: 0,
    actionCount: 0,
    wrongActionCount: 0
})


enum FeedbackState {
    neutral,
    error,
    correct
}

const currentFeedbackState = ref(FeedbackState.neutral)

const questFeedbackClass = computed((): string => {
    if (currentFeedbackState.value == FeedbackState.error) {
        return "flash-yellow"
    } else if (currentFeedbackState.value == FeedbackState.correct) {
        return "green-shine"
    } else {
        return ""
    }
})

let fieldWhereMovementStartedFrom: Field | undefined = undefined

onMounted(() => {
    const storedValue = localStorage.getItem('userid');
    userId.value = storedValue ? storedValue : uuidv4();
    localStorage.setItem('userid', userId.value!)
    grid.value = getGridFromLevelTemplate(props.level)
    startRandomQuest()
})

function onDragStart(field: Field) {
    if (typeof field.card !== "undefined") {
        fieldWhereMovementStartedFrom = field
    }
}

function onDropOn(field: Field) {
    // not sure how there would ever be a drop on without the movement field set
    if (fieldWhereMovementStartedFrom) {
        levelStats.value.actionCount += 1
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
                    currentFeedbackState.value = FeedbackState.error
                    setIdentifiersForFields(grid.value, props.level.props)
                    requestPlayStandard(StandardSound.Wrong)
                    console.log('wrong action')
                    levelStats.value.wrongActionCount += 1
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

function startRandomQuest() {
    currentQuest.value = undefined
    questsPlayedInThisLevel.value += 1
    levelStats.value.questCount += 1
    if (grid.value !== undefined) {
        setIdentifiersForFields(grid.value, props.level.props)

        const availableQuests = getAvailableQuestsBasedOnLevel(props.level, grid.value, useOnlyQuestsThatArePlayable)
        const questsWithoutLast = availableQuests.filter(quest => getQuestKey(quest) !== globalDataStore.lastQuestKey)
        if (questsWithoutLast.length > 0 && questsPlayedInThisLevel.value < maximumQuestsToBePlayedInThisLevel.value) {
            currentQuest.value = questsWithoutLast[Math.floor((Math.random() * questsWithoutLast.length))]
            currentFeedbackState.value = FeedbackState.neutral
            globalDataStore.lastQuestKey = getQuestKey(currentQuest.value)
        } else {
            if (!skipWritingToFirebase) writeToCollection('learning-data', {
                level: props.level.id,
                userId: userId.value,
                stats: levelStats.value,
                timestamp: Date.now()
            })
            // TODO: rename this maybe, since it's also triggered when max quests per level are exceeded
            emit("noMoreOpenQuests")
        }
    } else {
        console.warn('level grid undefined, this should never happen')
    }
}

function endCurrentQuest(questWasSuccessful: boolean) {
    if (questWasSuccessful) {
        currentFeedbackState.value = FeedbackState.correct
        handleSuccess()
    }
    setTimeout(startRandomQuest, 1000);
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

<style>
.flash-yellow {
    animation: flashYellow 1s ease-in-out;
}

@keyframes flashYellow {
    0% {
        background-color: rgba(219, 39, 39, 0.6)
    }

    100% {
        background-color: transparent;
    }
}

.green-shine {
    animation: greenShine 1.1s ease-in-out;
}

@keyframes greenShine {
    0% {
        background-color: #d4edda;
        /* Soft green */
        box-shadow: 0 0 10px 5px rgba(72, 239, 128, 0.8);
    }

    50% {
        background-color: #c3e6cb;
        /* Slightly brighter green */
        box-shadow: 0 0 15px 10px rgba(72, 239, 128, 0.6);
    }

    100% {
        background-color: transparent;
        box-shadow: none;
    }
}
</style>