<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="Layout">
    <RouterView />
  </div>
</template>

<style scoped>
  #Layout {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    overflow: auto;
    background: #000800;
    color: #06ff06;
  }
</style>
