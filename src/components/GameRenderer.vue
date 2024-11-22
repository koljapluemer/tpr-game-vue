<template>
  <div id="level" class="m-auto">
    <LevelRenderer :key="levelIndexWithinProgression" :level="currentLevel" v-if="currentLevel"
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
let levelIndexWithinProgression = ref(0)

const currentLevel = computed(() => {
  console.log('current level changed, getting lvl', levelIndexWithinProgression.value)
  return getLevelTemplateByID(currentProgression[levelIndexWithinProgression.value])
})

function onLevelHasNoMoreOpenQuests() {
  console.log('level has no more quests')
  levelIndexWithinProgression.value += 1
}

</script>
