<template>
  <div id="level" class="m-auto" v-if="gameStarted">
    <LevelRenderer :key="levelChangedAt" :level="currentLevel" v-if="currentLevel"
      @noMoreOpenQuests="onLevelHasNoMoreOpenQuests">
    </LevelRenderer>
  </div>
  <div v-else class="flex h-full w-full justify-center items-center p-20">
    <button class="btn btn-accent btn-circle m-auto btn-lg shadow-xl" @click="gameStarted = true">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="h-16 w-16">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
      </svg>

    </button>

  </div>

</template>

<script setup lang="ts">
import LevelRenderer from "./LevelRenderer.vue";
import { LevelTemplateName, progressions } from "@/data/levelTemplates";
import { LevelProperty } from "@/types";
import { getLevelTemplateByID } from "@/utils/levelUtils";
import { computed, ref } from "vue";

const gameStarted = ref(false)

let currentProgression = progressions[0]
let levelIndexWithinProgression = ref(0)
const currentLevelRepetitionCounter = ref(0)

const levelChangedAt = ref(Date.now())

const currentLevel = computed(() => {
  console.log('current level changed, getting lvl', levelIndexWithinProgression.value)
  return getLevelTemplateByID(currentProgression[levelIndexWithinProgression.value])
})

function onLevelHasNoMoreOpenQuests() {
  if (currentLevel.value?.props?.includes(LevelProperty.RepeatOnce)) {
    if (currentLevelRepetitionCounter.value == 0) {
      console.log('repeating level once')
      repeatCurrentLevel()
      return
    }
  }
  if (currentLevel.value?.props?.includes(LevelProperty.RepeatFourTimes)) {
    if (currentLevelRepetitionCounter.value < 3) {
      console.log('repeating 4 times')
      repeatCurrentLevel()
      return
    }
  }
  // for now, simply loop last level of progression if out of levels
  if (levelIndexWithinProgression.value < currentProgression.length - 1) {
    levelIndexWithinProgression.value += 1
    currentLevelRepetitionCounter.value = 0
    loadNewLevel()
  } else {
    repeatCurrentLevel()
  }



}

function repeatCurrentLevel() {
  currentLevelRepetitionCounter.value += 1
  loadNewLevel()
}

function loadNewLevel() {
  // as of now, this resets the key that triggers reload of the LevelRenderer component
  // dumb, but leave in this structure for fancy future level loading algos
  levelChangedAt.value = Date.now()

}

</script>
