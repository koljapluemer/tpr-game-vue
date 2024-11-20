<template>
  <div id="level" class="m-auto">
    <h2 class="font-bold text-2xl text-center text-slate-800 p-2">
      Pack die Melone ins Auto!
    </h2>

    <GridRenderer :initialGrid="grid"></GridRenderer>
  </div>
</template>

<script setup lang="ts">
import { getGridFromLevelTemplate } from "@/utils/gridUtils";
import GridRenderer from "./GridRenderer.vue";
import type { LevelTemplate } from "@/types";

const props = defineProps<{
  levelTemplate: LevelTemplate;
}>();
console.log("rendering level", props.levelTemplate);

const grid = getGridFromLevelTemplate(props.levelTemplate);
console.log("generated grid", grid);
</script>
