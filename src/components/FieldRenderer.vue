<template>
  <div class="bg-white p-1 min-h-32 min-w-32 w-32 h-32" @dragover.prevent @drop="onDrop($event)" v-if="field">
    <small>
    </small>
    <div class="card flex bg-slate-200 shadow-sm rounded w-full h-full justify-center items-center" v-if="field.card"
      :style="isBeingDragged
        ? 'transform: translateX(-9999px); transition: 0.01s; background-color: transparent'
        : ''
        " :draggable="isMovable" @dragstart="onDragStart($event)" @dragend="isBeingDragged = false">
      <img v-for="img of field.card.images" :key="img.name" :src="'/assets/items/' + img.name + '.webp'"
        class="object-contain w-24 h-24 absolute" :style="getImageStyle(img)" alt="" draggable="false" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ActiveAffordance } from "@/data/affordances";
import type { Card, CardImage, Field } from "@/types";
import { computed, ref, type PropType } from "vue";

const emit = defineEmits<{
  startedDraggingFromField: Field,
  droppedOnField: Field
}>();

// const props = defineProps({
//   field: Object as PropType<Field>,
// });

const props = defineProps<{
  field: Field
}>();


console.log('type of prop field', typeof props.field)
console.log('prop field', props.field)
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
  if (img.scale != undefined && img.offset != undefined) {
    // TODO: everything after 1st is randomly ignored xD
    return `transform: scale(${img.scale}); left: ${img.offset[0]} px; top: ${img.offset[1]} px;`;
  } else {
    return "";
  }
}

const isMovable = computed(() => {
  const isMovable = (props.field.card?.item.activeAffordances && props.field.card.item.activeAffordances.includes(ActiveAffordance.MOVABLE))
  if (typeof isMovable !== "undefined") {
    return isMovable
  }
  return false

})
</script>
