<template></template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';


const isPlaying = ref(false)
let audio: HTMLAudioElement | null = null;
const successSrc = new URL('@/assets/sounds/success_short.mp3', import.meta.url).href;


onMounted(() => {
    // Initialize the audio object
    audio = new Audio(successSrc);

    // Reset the state when the sound ends
    audio.addEventListener('ended', () => {
        isPlaying.value = false;
    });
});

onUnmounted(() => {
    // Clean up the audio object
    if (audio) {
        audio.pause();
        audio = null;
    }
});

function playSound() {
    if (!audio) return;

    // Play the sound if not already playing
    audio.currentTime = 0;
    audio.play();
    isPlaying.value = true;
}

defineExpose({
    playSound
})

</script>