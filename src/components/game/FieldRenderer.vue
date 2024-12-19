<template>
    <div class="bg-base-200 p-1 aspect-square" @dragover.prevent @drop="onDrop($event)" :style="{
        height: cellSize,
        width: cellSize
    }">

        <div class="grow relative h-full w-full card rounded shadow-md bg-base-100" v-if="field.thing" :style="isBeingDragged
            ? 'transform: translateX(-9999px); transition: 0.01s; background-color: transparent'
            : ''
            " draggable="true" @dragstart="onDragStart($event)" style='touch-action: none;'>
            <img v-for="img of field.images" :key="img.name" :src="'/assets/items/' + img.name + '.webp'"
                class="object-contain absolute" :style="getImageStyle(img)" alt="" draggable="false" />
        </div>

    </div>
</template>


<script setup lang="ts">
import type { CardImage } from '@/models_frontend/CardImage';
import type { Field } from '@/models_frontend/Field';
import { computed, ref } from 'vue';

// const emit = defineEmits<{
//     startedDraggingFromField: [field: Field],
//     droppedOnField: [field: Field]
// }>();


const props = defineProps<{
    field: Field,
    cellSize: string,
    coords: [number, number]
}>();

const emit = defineEmits(['startedDraggingFromField', 'droppedOnField'])


function getImageStyle(img: CardImage): string {

    let styleString = `max-width: 100%; max-height: 100%;left: 50%;top: 50%;`
    let transformString = 'transform: translate(-50%, -50%) '
    if (img.scale != undefined) {
        // TODO: this check doesn't work but nevermind for now
        transformString += ` scale(${img.scale}) `;
    }
    if (img.rotation != undefined) {
        transformString += `rotate(${img.rotation}deg)`
    }
    styleString += transformString + ';'
    return styleString
}

const isBeingDragged = ref(false)


function onDragStart(event: any) {
    console.info('field registered drag start')
    isBeingDragged.value = true
    if (typeof props.field != "undefined") {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        emit("startedDraggingFromField", props.field, props.coords);
    }
}

function onDrop(event: any) {
    console.info('field registered drop')
    isBeingDragged.value = false
    emit("droppedOnField", props.field, props.coords)
}



</script>