<template>
    <div id="grid" class="flex items-center justify-center mt-10">
        <div class="flex flex-col gap-1 bg-white p-2 bg-slate-400">
            <div class="flex flex-row gap-1" v-for="row in grid">
                <FieldRenderer @startedDraggingFromField="onDragStart(field)" @droppedOnField="onDropOn(field)"
                    :field="field" v-for="field of row"></FieldRenderer>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import FieldRenderer from "./FieldRenderer.vue";
import { type Card, type Field, type Grid } from "@/types";
import { handleDropInteraction } from "@/utils/alchemyUtils";
import { setIdentifiersForFields } from "@/utils/identifierUtils";
import { getActionableActionsOnGrid } from "@/utils/actionUtils";

const props = defineProps<{
    initialGrid: Grid;
}>();

const grid = ref(props.initialGrid)
let fieldWhereMovementStartedFrom: Field | undefined = undefined

function onDragStart(field: Field) {
    console.log("child field started drag", field);
    if (typeof field.card !== "undefined") {
        fieldWhereMovementStartedFrom = field
    }
}

function onDropOn(field: Field) {
    handleDropInteraction(fieldWhereMovementStartedFrom, field)
}

watch(grid, (newGrid, oldGrid) => {
    console.log('grid changed from', oldGrid, 'to', newGrid)
    setIdentifiersForFields(grid.value)
    const availableActions = getActionableActionsOnGrid(grid.value)
    console.log('available', availableActions)
}, { immediate: true })

// TODO: gen some sweet keys
</script>
