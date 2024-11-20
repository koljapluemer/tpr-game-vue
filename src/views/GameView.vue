<template>
  <LevelRenderer :levelTemplate="currentLevel"></LevelRenderer>
</template>

<script setup lang="ts">
import LevelRenderer from "@/components/LevelRenderer.vue";
import { LevelTemplateName } from "@/data/levelTemplates";
import { getLevelTemplateByID } from "@/utils/levelUtils";

let currentLevel = getLevelTemplateByID(LevelTemplateName.cut_fruit_1);
</script>
