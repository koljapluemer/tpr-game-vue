<template>
    <div class="card p-2 bg-blue">
        cell
    </div>
</template>


<script setup lang="ts">
import type { CardField } from '@/models_frontend/CardField';


const props = defineProps<{
    field: CardField,
    cellSize: string
}>();



</script>