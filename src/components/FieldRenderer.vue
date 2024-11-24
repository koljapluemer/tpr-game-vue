<template>
  <div class="bg-white p-1 aspect-square" @dragover.prevent @drop="onDrop($event)" v-if="field" :style="{
    height: cellSize,
    width: cellSize
  }">
    <div class="grow relative h-full w-full card rounded shadow-md bg-base-100" v-if="field.card" :style="isBeingDragged
      ? 'transform: translateX(-9999px); transition: 0.01s; background-color: transparent'
      : ''
      " :draggable="isMovable" @dragstart="onDragStart($event)" @dragend="isBeingDragged = false"
      style='touch-action: none;'>
      <img v-for="img of field.card.images" :key="img.name" :src="'/assets/items/' + img.name + '.webp'"
        class="object-contain absolute" :style="getImageStyle(img)" alt="" draggable="false" />
    </div>
  </div>
</template>


<script setup lang="ts">
import useTopicDataStorage from "@/composables/learning_data/useTopicDataStorage";
import { globalDataStore } from "@/stores/globalData";
import type { CardImage, Field } from "@/types";
import { computed, onMounted, ref } from "vue";


const emit = defineEmits<{
  startedDraggingFromField: Field,
  droppedOnField: Field
}>();


const props = defineProps<{
  field: Field,
  cellSize: string
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

  let style = `max-width: 100%; max-height: 100%;left: 50%;top: 50%;`
  if (img.scale != undefined) {
    // TODO: this check doesn't work but nevermind for now
    style += `transform: translate(-50%, -50%) scale(${img.scale});`;
  } else {
    style += `transform: translate(-50%, -50%);`
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

 onMounted(() => {
  const mainImg = props.field.card?.images[0]
  if (mainImg) {
    globalDataStore.levelDemoImages.push(mainImg.name)
  }
})
</script>
