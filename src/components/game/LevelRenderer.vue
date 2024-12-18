<template>
    <div class="flex flex-col items-center w-full h-full max-h-full max-w-full">

        <div id="grid"
            class="flex flex-col items-center justify-center mt-10 gap-2 p-2 max-h-full max-w-full bg-base-300 ">
            Level Grid
            <!-- <div class="flex flex-row gap-2 justify-center" v-for="row in level.grid">
                Cell !
            </div> -->

        </div>
    </div>

</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { Level } from "@/classes/Level";
import type { CardField } from "@/classes/CardField";


const props = defineProps<{
    level: Level;
}>();

const onDragStart = (field:CardField) => {
    console.log('wow a drag')
}

const onDropOn = (field:CardField) => {
    console.log('wow drag stopped')
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