<template></template>

<script lang="ts" setup>
import { StandardSound, StandardSoundFiles } from '@/data/standardSounds';
import { onMounted, onUnmounted, ref } from 'vue';


const isPlaying = ref(false)

function playStandardSound(standardSound: StandardSound) {
    const href = new URL(StandardSoundFiles[standardSound], import.meta.url).href
    _play(href)
}

function playSound(soundPath: string) {
    const href = new URL(soundPath, import.meta.url).href
    _play(href)
}

function _play(href: string) {
    let audio = new Audio(href) as HTMLAudioElement

    audio.addEventListener('ended', () => {
        isPlaying.value = false;
        audio.remove()
    });
    // Play the sound if not already playing
    audio.currentTime = 0;
    audio.play();
    audio.volume = 0.35;
    isPlaying.value = true;

}

defineExpose({
    playSound,
    playStandardSound
})

</script>