<template>
  <div class="div border-1">
    <div class="" v-for="row in grid">
      <div class="" v-for="field in row">
        <FieldRenderer :field="field"></FieldRenderer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FieldRenderer from "./FieldRenderer.vue";
import type { Grid } from "@/types";

defineProps<{
  grid: Grid;
}>();
</script>
