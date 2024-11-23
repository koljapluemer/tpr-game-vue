<template>
  <div class="justify-center items-center flex gap-2 flex-row mt-20" v-if="isModePickingWhatToPlayNext">
    <button class="btn" @click="selectLevel">More of the same!</button>
    <button class="btn" @click="selectTopic">Something new!</button>
  </div>
  <LevelRenderer v-else :level="currentLevel" v-if="currentLevel" :key="levelRegenerationAt"
    @noMoreOpenQuests="onLevelHasNoMoreOpenQuests">
  </LevelRenderer>

</template>

<script setup lang="ts">
import useTopicDataStorage from '@/composables/learning_data/useTopicDataStorage';
import { useArrayUtils } from '@/composables/useArrayUtils';
import { topics } from '@/data/levelTemplates';
import type { LevelTemplate, Progression, Topic } from '@/types';
import { onMounted, ref } from 'vue';
import LevelRenderer from './LevelRenderer.vue';

const { pickRandom } = useArrayUtils()
const { getNextLevelForTopic, iterateTopicProgress } = useTopicDataStorage()


// const currentTopic = ref(undefined as Topic | undefined)

const currentTopic = ref(topics[3] as Topic | undefined)
const lastPlayedTopic = ref(undefined as Topic | undefined)

const currentLevel = ref(undefined as LevelTemplate | undefined)

const levelRegenerationAt = ref(Date.now())
const isModePickingWhatToPlayNext = ref(false)

function selectTopic() {
  const topicsWithoutLastPlayed = (topics.filter((topic) => topic.id !== lastPlayedTopic.value?.id))
  console.log('topics w/o last played', topicsWithoutLastPlayed, 'last played', lastPlayedTopic.value)
  currentTopic.value = pickRandom(topicsWithoutLastPlayed)
  console.log('picked topic', currentTopic)
  lastPlayedTopic.value = currentTopic.value
  selectLevel()
  isModePickingWhatToPlayNext.value = false

}


function selectLevel() {
  if (currentTopic.value !== undefined) {
    currentLevel.value = getNextLevelForTopic(currentTopic.value)
    levelRegenerationAt.value = Date.now()
    console.log('picked new level', currentLevel.value)
  }
  isModePickingWhatToPlayNext.value = false

}

function onLevelHasNoMoreOpenQuests() {
  console.log('out of quests')
  if (currentTopic.value !== undefined) {
    const isTimeForChoice = iterateTopicProgress(currentTopic.value)
    if (isTimeForChoice) {
      isModePickingWhatToPlayNext.value = true
    } else {
      selectLevel()
    }
  }
}

onMounted(() => {
  // selectTopic()
  selectLevel()
})

</script>
