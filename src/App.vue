<script setup lang="ts">
import Header from "./components/misc/Header.vue";
import Footer from "./components/misc/Footer.vue";


</script>

<template>
  <Header />

  <main class="grow m-auto">
    <RouterView />
  </main>

  <Footer />
</template>

<style scoped></style>
