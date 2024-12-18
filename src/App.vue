<script setup lang="ts">
import Header from "./components/misc/Header.vue";
import Footer from "./components/misc/Footer.vue";
import { onBeforeMount, onMounted } from "vue";
import { GameLoader } from "./classes/GameLoader";
import { ThingTemplate } from "./classes/templates/ThingTemplate";

onBeforeMount(() => {
  GameLoader.loadFromDataSources()
  GameLoader.createGameData()

  console.info('things are now', ThingTemplate.getAll())
})

</script>

<template>
  <Header />

  <main class="grow m-auto">
    <RouterView />
  </main>

  <Footer />
</template>

<style scoped></style>
