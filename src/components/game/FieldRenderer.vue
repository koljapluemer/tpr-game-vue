<template>
    <div class="card p-2 bg-blue">
        cell
    </div>
</template>


<script setup lang="ts">
import type { Field } from '@/models_frontend/Field';



const props = defineProps<{
    field: Field,
    cellSize: string
}>();



</script>