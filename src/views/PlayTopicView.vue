<template>
  <!-- thank you for not ignoring this anyways, ts. great. -->
  <!-- @vue-ignore -->
  <!-- @ts-ignore -->
  <LevelRenderer v-if="grid" :grid="grid"></LevelRenderer>
</template>

<script setup lang="ts">
import type { CardField } from '@/classes/CardField';
import { Level } from '@/classes/Level';
import { Topic } from '@/classes/Topic';
import LevelRenderer from '@/components/game/FieldGridRenderer.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Vue refs for reactivity
const topic = ref<Topic>();
const activeLevel = ref<Level | undefined>();
const grid = ref<CardField[][] | undefined>(undefined); // Reactive ref for grid

// Route data
const route = useRoute();
const topicName = route.params.name as string;

// Logic for initializing topic and level
onMounted(() => {
  // Retrieve the topic by name
  topic.value = Topic.getByName(topicName);

  // Get a random level template from the topic
  const randomLevelTemplate = topic.value?.getRandomRotationLevelTemplate();

  // If a template exists, create a level and extract the grid
  if (randomLevelTemplate) {
    const level = Level.createFromLevelTemplate(randomLevelTemplate);
    activeLevel.value = level; // Optional: Store the full level object
    grid.value = level.grid;  // Assign grid to the reactive ref
  } else {
    grid.value = undefined; // Fallback if no template is found
  }
});
</script>
