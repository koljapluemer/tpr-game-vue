<template>
  <div id="level" class="m-auto">
    <LevelRenderer :level="currentLevel" v-if="currentLevel"></LevelRenderer>
  </div>
</template>

<script setup lang="ts">
import LevelRenderer from "./LevelRenderer.vue";
import { LevelTemplateName } from "@/data/levelTemplates";
import { getLevelTemplateByID } from "@/utils/levelUtils";
import { ref } from "vue";

const currentLevel = getLevelTemplateByID(LevelTemplateName.cut_fruit_1);



</script>
