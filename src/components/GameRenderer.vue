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
import { getLevelTemplateByID } from "@/utils/levelUtils";
import { computed, ref } from "vue";

let currentProgression = progressions[0]
let levelIndexWithinProgression = ref(6)

const levelChangedAt = ref(Date.now())

const currentLevel = computed(() => {
  console.log('current level changed, getting lvl', levelIndexWithinProgression.value)
  return getLevelTemplateByID(currentProgression[levelIndexWithinProgression.value])
})

function onLevelHasNoMoreOpenQuests() {
  // for now, simply loop last level of progression if out of levels
  if (levelIndexWithinProgression.value < currentProgression.length - 1) {
    levelIndexWithinProgression.value += 1
  }

  levelChangedAt.value = Date.now()
}

</script>
