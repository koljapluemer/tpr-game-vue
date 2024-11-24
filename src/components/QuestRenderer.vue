<template>
    <div class="flex flex-row gap-2 items-center card bg-base-200 shadow-xl p-2 my-2">
        <button class="btn btn-circle btn-sm btn-secondary" @click="playQuestAudio">
            <svg v-if="!questSoundPlaying" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="h-6 w-6 playing-speaker">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>

        </button>
        <div class="card-title text-3xl">
            {{ questPrompt }}
        </div>
    </div>

    <audio class="audio" v-if="questAudio" id="prompt-audio" @ended="questSoundPlaying = false">
        <source :src="questAudio" type=" audio/mpeg">
        Your browser does not support the audio tag.
    </audio>

    <!-- <small>{{ getQuestKey(props.quest) }}</small> -->
</template>

<script setup lang="ts">

import { translationStore } from '@/stores/translationStore';
import type { Quest } from '@/types';
import { getQuestKey } from '@/utils/questUtils';
import { getTranslationForKey } from '@/utils/translationUtils';
import { computed, ref, watch } from 'vue';

const questSoundPlaying = ref(false)


const props = defineProps<{
    quest: Quest
}>();


function playQuestAudio() {
    const audioPlayer = document.getElementById('prompt-audio')
    if (audioPlayer !== null) {
        // @ts-ignore: let's trust that this is in fact an audio player
        audioPlayer.play();
        questSoundPlaying.value = true;
    }
}

watch(props.quest, () => {
    setTimeout(playQuestAudio, 500)
    playQuestAudio()
}, { immediate: true })


const questPrompt = computed(() => {
    if (props.quest) {
        return getTranslationForKey(getQuestKey(props.quest))
    } else {
        return undefined
    }
})

const questAudio = computed(() => {
    if (questPrompt.value) {
        return 'assets/speech/' + questPrompt.value + '.mp3'
    } else {
        return undefined
    }
})


</script>

<style scoped>
.playing-speaker {
    animation: pulse 1s infinite ease-in-out;
}

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }
}
</style>