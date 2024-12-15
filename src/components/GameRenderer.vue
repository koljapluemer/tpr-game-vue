<template>
  <div class="mt-20 flex flex-col items-center" v-if="isModePickingWhatToPlayNext">
    <h2 class="text-xl">Good Progress!</h2>
    <div class="flex flex-row justify-center gap-2 my-10">
      <div class="aspect-square w-16 cover card rounded shadow-md bg-base-100"
        v-for="(img, index) in globalDataStore.levelDemoImages.slice(-3)">
        <img :src="'/assets/items/' + img + '.webp'" alt="" class="object-contain max-h-full max-w-full">
      </div>
    </div>
    <div class="justify-center items-center flex gap-2 flex-col ">
      <button class="btn btn-lg  w-full" @click="selectLevel">
        <span>More of the same!</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="h-8 w-8">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
        </svg>

      </button>
      <button class="btn btn-lg btn-secondary w-full" @click="selectTopic">
        <span>Something new!</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="h-8 w-8">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />

        </svg>

      </button>
    </div>
  </div>
  <LevelRenderer v-else :level="currentLevel" v-if="currentLevel" :key="levelRegenerationAt"
    @noMoreOpenQuests="onLevelHasNoMoreOpenQuests">
  </LevelRenderer>

</template>

<script setup lang="ts">
import useTopicDataStorage from '@/composables/learning_data/useTopicDataStorage';
import { useArrayUtils } from '@/composables/useArrayUtils';
import { topics } from '@/data/levelTemplates';
import { LevelProperty, type LevelTemplate, type Progression, type Topic } from '@/types';
import { onMounted, ref } from 'vue';
import LevelRenderer from './LevelRenderer.vue';
import { globalDataStore } from '@/stores/globalData';
import { loadSpecificTopicWithIndex, skipWritingToFirebase } from '@/debugSettings';
import { useFirestore } from '@/composables/useFireStore';
import { useLocalStorage } from '@/composables/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

const { pickRandom } = useArrayUtils()
const { getNextLevelForTopic, iterateTopicProgress } = useTopicDataStorage()

const { writeToCollection } = useFirestore();

const currentTopic = ref(topics[0] as Topic | undefined)

const lastPlayedTopic = ref(undefined as Topic | undefined)

const currentLevel = ref(undefined as LevelTemplate | undefined)
const userId = ref(undefined as string | undefined)


const levelRegenerationAt = ref(Date.now())
const isModePickingWhatToPlayNext = ref(false)


function selectTopic() {
  const topicsWithoutLastPlayed = (topics.filter((topic) => topic.id !== lastPlayedTopic.value?.id))
  currentTopic.value = pickRandom(topicsWithoutLastPlayed)
  lastPlayedTopic.value = currentTopic.value
  selectLevel()
  isModePickingWhatToPlayNext.value = false
  globalDataStore.levelDemoImages = []
}


function selectLevel() {
  if (currentTopic.value !== undefined) {
    currentLevel.value = getNextLevelForTopic(currentTopic.value)
    if (currentLevel.value === undefined) {
      // cope with broken levels (or tutorial topic, which just has one) by selecting a new topic
      selectTopic()
      return
    }
    levelRegenerationAt.value = Date.now()

    if (!skipWritingToFirebase) writeToCollection('learning-data', {
      type: 'level-started',
      timestamp: Date.now(),
      level: currentLevel.value?.id,
      topic: currentTopic.value.id,
      userId: userId.value
    })

  }
  isModePickingWhatToPlayNext.value = false

}

function onLevelHasNoMoreOpenQuests() {
  console.log('no more quests')
  if (currentTopic.value !== undefined) {
    const isTimeForChoice = iterateTopicProgress(currentTopic.value)
    if (isTimeForChoice && !currentLevel.value?.props?.includes(LevelProperty.IsIntroTutorial)) {
      console.log('setting topic choice')
      isModePickingWhatToPlayNext.value = true
    } else {
      console.log('setting next lvl')
      selectLevel()
    }
  }
}

onMounted(() => {
  // user id
  const storedValue = localStorage.getItem('userid');
  userId.value = storedValue ? storedValue : uuidv4();
  localStorage.setItem('userid', userId.value!)


  if (loadSpecificTopicWithIndex !== undefined) {
    currentTopic.value = topics[loadSpecificTopicWithIndex]
  } else {
    // this was the old approach, but as of now, we're just autoloading
    // feed dog, and if it was played already on the device, simply skip it
    // selectTopic()
  }
  selectLevel()
})

</script>
