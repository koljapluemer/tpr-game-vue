<template>
  <div id="grid" class="flex items-center justify-center mt-10">
    <div class="flex flex-col gap-1 bg-white p-2 bg-slate-300">
      <div class="flex flex-row gap-1" v-for="row in grid">
        <FieldRenderer
          @startedDraggingFromField="onDragStart(field)"
          @droppedOnField="onDropOn(field)"
          :field="field"
          v-for="field in row"
        ></FieldRenderer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FieldRenderer from "./FieldRenderer.vue";
import type { Field, Grid } from "@/types";

defineProps<{
  grid: Grid;
}>();

function onDragStart(field: Field) {
  console.log("child field started drag", field);
}

function onDropOn(field: Field) {
  console.log("was dropped on", field);
}
</script>
