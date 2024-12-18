<template>
    playing {{ topic?.name }}

    <hr>

    {{ activeLevel }}
</template>

<script setup lang="ts">
import { Level } from '@/classes/Level';
import { Topic } from '@/classes/Topic';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const topic = ref<Topic>()
const activeLevel = ref<Level | undefined>()

onMounted(() => {
    const topicName = route.params.name as string
    topic.value = Topic.getByName(topicName)
    const randomLevelTemplate = topic.value?.getRandomRotationLevelTemplate()
    if (randomLevelTemplate) {
        activeLevel.value = Level.createFromLevelTemplate(randomLevelTemplate)
    }
})



</script>