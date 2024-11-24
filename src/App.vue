<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { translationStore } from "./stores/translationStore";
import { LanguageCode, type LanguageCodeType } from "./types";


const languageSelected = ref()

function requestLangChange(event: any) {
  translationStore.changeLangCode(languageSelected.value)
}

onMounted(()=> {
  // logRequiredTranslationKeysForGame()
})


</script>

<template>
  <main class="grow">
    <RouterView />
  </main>

  <footer class="footer p-2">
    <select class="select select-bordered w-full max-w-xs" v-model="languageSelected"
      @change="requestLangChange($event)">
      <option v-for="(code, lang) in LanguageCode" :value="code">{{ lang }}</option>
    </select>
    <small>v.2024-11-24.2</small>
  </footer>
</template>

<style scoped></style>
