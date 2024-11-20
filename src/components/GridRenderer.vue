<template>
    <div id="grid" class="flex items-center justify-center mt-10">
        <div class="flex flex-col gap-1 bg-white p-2 bg-slate-300">
            <div class="flex flex-row gap-1" v-for="row in grid">
                <FieldRenderer @startedDraggingFromField="onDragStart(field)" @droppedOnField="onDropOn(field)"
                    :field="field" v-for="field of row"></FieldRenderer>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FieldRenderer from "./FieldRenderer.vue";
import { type Card, type Field, type Grid } from "@/types";
import { ActiveAffordance, PassiveAffordance } from "@/data/affordances";
import { getItemByID } from "@/utils/itemUtils";

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

    const senderField = fieldWhereMovementStartedFrom
    const receiverField = field

    // handle drop on empty
    if (field.card === undefined && typeof fieldWhereMovementStartedFrom !== "undefined") {
        console.log('dropping on empty')
        field.card = fieldWhereMovementStartedFrom.card
        fieldWhereMovementStartedFrom.card = undefined

    }


    //   ALCHEMY
    if (field.card !== undefined && fieldWhereMovementStartedFrom !== undefined) {
        const sender = fieldWhereMovementStartedFrom.card
        const receiver = field.card


        //   cutting
        if (sender?.item.activeAffordances !== undefined && receiver.item.passiveAffordances !== undefined && ActiveAffordance.CUTS in sender?.item.activeAffordances && PassiveAffordance.CUTTABLE in receiver.item.passiveAffordances) {
            if (receiver.item.load_when_cut) {
                const newItem = getItemByID(receiver.item.load_when_cut)
                console.log('cut img found:', newItem)
                if (newItem) {
                    receiverField.card = {
                        item: newItem,
                        images: [{
                            name: newItem.images[0],
                            zIndex: 0
                        }
                        ]
                    }
                }
            }
        }

        fieldWhereMovementStartedFrom = undefined;
    }
}
</script>
