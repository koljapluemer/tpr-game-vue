<template>
  playing topic
  <br>
  picked level:
  <br>
  <small>
    {{  activeLevel }}

  </small>
  <LevelRenderer v-if="activeLevel" :level="activeLevel"></LevelRenderer>
</template>

<script setup lang="ts">
import LevelRenderer from '@/components/game/FieldGridRenderer.vue';
import { LevelTemplate } from '@/models_backend/LevelTemplate';
import type { Level } from '@/models_frontend/Level';
import type { Topic } from '@/models_frontend/Topic';
import { gameDataStore } from '@/stores/gameData';
import { pickRandom } from '@/utils/arrayUtils';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Vue refs for reactivity
const topic = ref<Topic>();
const activeLevel = ref<Level | undefined>();

// Route data
const route = useRoute();
const topicName = route.params.name as string;

// Logic for initializing topic and level
onMounted(() => {
  // TODO: I'm not sure where this chain should live, but not here
  // really blurring between "backend" and "frontend" here as well
  // `topic` is a frontend type, but then we're using `LevelTemplate` class functions :)
  const topic = gameDataStore.getTopicByName(topicName)
  console.log('yep, got topic again', topic)
  if (topic) {
    const randomLevelTemplateName = pickRandom(topic?.finalRotation)
    console.log('got a random level name')
    if (randomLevelTemplateName) {
      const levelTemplate = LevelTemplate.getByName(randomLevelTemplateName)
      console.log('got the level template as well', levelTemplate)
      if (levelTemplate) {
        const level = levelTemplate.createLevelBasedOnMe()
        console.log('and got a level!', level)
        if (level) {
          activeLevel.value = level
        }
      }
    }
  }
});
</script>
