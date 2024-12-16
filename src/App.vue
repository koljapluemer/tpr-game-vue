<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { translationStore } from "./stores/translationStore";
import { LanguageCode, type LanguageCodeType } from "../_old/types";


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
    <small>Anonymous learning data is collected for research and to make this app better. No personal data and no device-related data is saved.</small>
    <select class="select select-bordered w-full max-w-xs" v-model="languageSelected"
      @change="requestLangChange($event)">
      <option v-for="(code, lang) in LanguageCode" :value="code" :selected="code == translationStore.activeLanguageCode">{{ lang }}</option>
    </select>
    <small>v.2024-11-26.1</small>
  </footer>
</template>

<style scoped></style>
