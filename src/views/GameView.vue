<template>
  <div id="game" class="m-auto">
    <LevelRenderer v-if="currentLevel" :levelTemplate="currentLevel"></LevelRenderer>
  </div>
</template>

<script setup lang="ts">
import LevelRenderer from "@/components/LevelRenderer.vue";
import { LevelTemplateName } from "@/data/levelTemplates";
import { getLevelTemplateByID } from "@/utils/levelUtils";

let currentLevel = getLevelTemplateByID(LevelTemplateName.cut_fruit_1);
</script>
