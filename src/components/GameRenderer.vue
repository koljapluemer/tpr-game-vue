<template>
  <div id="level" class="m-auto h-full w-full max-w-full max-h-full" v-if="gameStarted">
    <LevelRenderer :level="levelStore.currentLevel" v-if="levelStore.currentLevel" :key="levelStore.levelLoadedAt"
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
import { levelStore } from "@/stores/levelStore";
import { ref } from "vue";
import LevelRenderer from "./LevelRenderer.vue";


const gameStarted = ref(true)

function onLevelHasNoMoreOpenQuests() {
  levelStore.loadNextLevel()
}

levelStore.loadNextLevel()

</script>
