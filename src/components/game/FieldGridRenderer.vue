<template>
    <div class="flex flex-col items-center w-full h-full max-h-full max-w-full">

        <div id="grid"
            class="flex flex-col items-center justify-center mt-10 gap-2 p-2 max-h-full max-w-full bg-base-300 ">
            <div class="flex flex-row gap-2 justify-center" v-for="(row, rowIndex) in grid">
                <FieldRenderer v-for="(cell, colIndex) in row" :field="cell" :cell-size="cellSize" :coords="[rowIndex, colIndex]"
                    @startedDraggingFromField="onDragStart" @droppedOnField="onDropOn"></FieldRenderer>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import FieldRenderer from "./FieldRenderer.vue";
import type { Level } from "@/models_frontend/Level";
import { changeFieldAccordingToActivatedAffordance, getInteractionsGeneratedByDroppingFieldOnField, type Field } from "@/models_frontend/Field";
import { LevelTemplateCell } from "@/models_backend/LevelTemplateCell";


const props = defineProps<{
    level: Level;
}>();

const grid = ref(props.level.grid)


const fieldBeingDragged = ref(undefined as (Field | undefined))
const fieldBeingDraggedCoords = ref(undefined as ([number, number] | undefined))

const onDragStart = (field: Field, coords: [number, number]) => {
    fieldBeingDragged.value = field
    fieldBeingDraggedCoords.value = coords
}

const onDropOn = (field: Field, coords: [number, number]) => {
    if (!fieldBeingDragged.value || !fieldBeingDraggedCoords.value) { console.warn('drag registered but no dragged field'); return; }
    console.info('level registered drop', fieldBeingDragged.value, 'on', field)
    if (!field.thing) {
        console.info('drop on empty field')
        field = fieldBeingDragged.value
        props.level.grid[coords[0]][coords[1]]! = fieldBeingDragged.value
    
        props.level.grid[fieldBeingDraggedCoords.value[0]][fieldBeingDraggedCoords.value[1]] = LevelTemplateCell.generateEmptyField()
    } else {
        console.info('drop on occupied')
        const interactions = getInteractionsGeneratedByDroppingFieldOnField(fieldBeingDragged.value, field)
        interactions.forEach(interaction => {
            changeFieldAccordingToActivatedAffordance(field, interaction.affordance)
        })
    }

}


const cellSize = computed(() => {
    let size = 300
    let maxWidth = 100000
    let maxHeight = 100000
    if (props.level.grid[0].length !== undefined) {
        maxWidth = (window.screen.width / props.level.grid[0]?.length) * 0.85;
    }
    if (props.level.grid.length !== undefined) {
        maxHeight = (window.screen.height / props.level.grid.length) - 170 * 0.7;
    }
    size = Math.min(size, maxWidth, maxHeight)
    return `${size}px`
})


</script>

<style>
.flash-yellow {
    animation: flashYellow 1s ease-in-out;
}

@keyframes flashYellow {
    0% {
        background-color: rgba(219, 39, 39, 0.6)
    }

    100% {
        background-color: transparent;
    }
}

.green-shine {
    animation: greenShine 1.1s ease-in-out;
}

@keyframes greenShine {
    0% {
        background-color: #d4edda;
        /* Soft green */
        box-shadow: 0 0 10px 5px rgba(72, 239, 128, 0.8);
    }

    50% {
        background-color: #c3e6cb;
        /* Slightly brighter green */
        box-shadow: 0 0 15px 10px rgba(72, 239, 128, 0.6);
    }

    100% {
        background-color: transparent;
        box-shadow: none;
    }
}
</style>