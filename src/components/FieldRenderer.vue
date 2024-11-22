<template>
  <div class="bg-white p-1 h-32 aspect-square" @dragover.prevent @drop="onDrop($event)" v-if="field">
    <div class="grow relative h-full w-full card rounded shadow-md bg-base-100" v-if="field.card" :style="isBeingDragged
      ? 'transform: translateX(-9999px); transition: 0.01s; background-color: transparent'
      : ''
      " :draggable="isMovable" @dragstart="onDragStart($event)" @dragend="isBeingDragged = false">
      <img v-for="img of field.card.images" :key="img.name" :src="'/assets/items/' + img.name + '.webp'"
        class="object-contain absolute" :style="getImageStyle(img)" alt="" draggable="false" />
    </div>
  </div>
</template>


<script setup lang="ts">
// w-24 h-24 absolute
import { levelStore } from "@/stores/levelStore";
import type { Card, CardImage, Field } from "@/types";
import { computed, ref, type PropType } from "vue";

const emit = defineEmits<{
  startedDraggingFromField: Field,
  droppedOnField: Field
}>();


const props = defineProps<{
  field: Field
}>();


const isBeingDragged = ref(false)
function onDragStart(event: any) {
  isBeingDragged.value = true
  if (typeof props.field != "undefined") {
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    // @ts-ignore: ts think that field is of type [Field] instead of Field (it isn't)
    emit("startedDraggingFromField", props.field);
  }
}

function onDrop(event: any) {
  isBeingDragged.value = false
  // @ts-ignore: ts think that field is of type [Field] instead of Field (it isn't)
  emit("droppedOnField", props.field)
}

function getImageStyle(img: CardImage): string {
  let maxWidth = '100%'
  console.log('grid stuff', levelStore.currentLevel?.grid[0]?.length)
  if (levelStore.currentLevel?.grid[0]?.length !== undefined) {
    maxWidth = `${window.screen.width / levelStore.currentLevel?.grid[0]?.length}px`;

  }
  let style = `max-width: ${maxWidth}; max-height: 100%;left: 50%;transform: translate(-50%, -50%);top: 50%;`
  if (img.scale != undefined && img.offset != undefined) {
    // TODO: everything after 1st is randomly ignored xD
    style += `transform: scale(${img.scale}); left: ${img.offset[0]} px; top: ${img.offset[1]} px;`;
  }
  return style
}

const isMovable = computed(() => {
  const isMovable = (props.field.card?.item.activeAffordances && props.field.card.item.isMovable)
  if (typeof isMovable !== "undefined") {
    return isMovable
  }
  return false

})
</script>
