<script setup lang="ts">
import { ref, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { translationStore } from "./stores/translationStore";
import { LanguageCode, type LanguageCodeType } from "./types";


const languageSelected = ref()

function requestLangChange(event: any) {
  console.log('select is now', languageSelected.value, 'event', event)
  translationStore.changeLangCode(languageSelected.value)
}

</script>

<template>
  <main class="grow">
    <RouterView />
  </main>

  <footer class="footer p-2">
    <select class="select select-bordered w-full max-w-xs" v-model="languageSelected"
      @change="requestLangChange($event)">
      <option v-for="(lang, code) in LanguageCode" :value="code">{{ lang }}</option>
    </select>
  </footer>
</template>

<style scoped></style>
