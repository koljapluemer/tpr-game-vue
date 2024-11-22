<template>
  <div id="level" class="m-auto">
    <LevelRenderer :key="levelChangedAt" :level="currentLevel" v-if="currentLevel"
      @noMoreOpenQuests="onLevelHasNoMoreOpenQuests">
    </LevelRenderer>
  </div>
</template>

<script setup lang="ts">
import LevelRenderer from "./LevelRenderer.vue";
import { LevelTemplateName, progressions } from "@/data/levelTemplates";
import { LevelProperty } from "@/types";
import { getLevelTemplateByID } from "@/utils/levelUtils";
import { computed, ref } from "vue";

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
