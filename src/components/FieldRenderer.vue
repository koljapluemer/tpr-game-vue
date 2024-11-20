<template>
  <div
    class="bg-white p-1 min-h-32 min-w-32 w-32 h-32"
    @dragover.prevent
    @drop="onDrop($event)"
  >
    <div
      class="card flex bg-slate-200 shadow-sm rounded w-full h-full justify-center items-center"
      v-if="field.card"
      :style="
        field.isBeingDragged
          ? 'transform: translateX(-9999px); transition: 0.01s; background-color: transparent'
          : ''
      "
      :draggable="field.card.item.activeAffordances.includes(ActiveAffordance.MOVABLE)"
      @dragstart="onDragStart($event)"
      @dragend="field.isBeingDragged = false"
    >
      <img
        v-for="img of field.card.images"
        :key="img.name"
        :src="'/assets/items/' + img.name + '.webp'"
        class="object-contain w-24 h-24 absolute"
        :style="getImageStyle(img)"
        alt=""
        draggable="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ActiveAffordance } from "@/data/affordances";
import type { CardImage, Field } from "@/types";

defineProps<{
  field: Field;
}>();

function onDragStart(event: any) {
  console.log(event);
}

function onDrop(event: any) {
  console.log(event);
}

function getImageStyle(img: CardImage): string {
  if (img.scale != undefined && img.offset != undefined) {
    // TODO: everything after 1st is randomly ignored xD
    return `transform: scale(${img.scale}); left: ${img.offset[0]} px; top: ${img.offset[1]} px;`;
  } else {
    return "";
  }
}
</script>
