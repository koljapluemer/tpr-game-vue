<template>

    <div class="flex flex-col gap-2 mt-10">
        <router-link :to="'/topic/' + topic.name + '/play'" v-for="topic in topics">
            <button class="btn btn-lg">{{ topic.name }}</button>
        </router-link>
    </div>

</template>

<script setup lang="ts">
import { GameLoader } from '@/classes/GameLoader';
import { Topic } from '@/classes/Topic';
import { onMounted, ref } from 'vue';

const topics = ref<Topic[]>([])

onMounted(() => {
    topics.value = Topic.getAll()
})

</script>