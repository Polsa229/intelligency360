<template>
  <main class="auth-layout">
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style scoped>
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.auth-layout {
  min-height: 100vh;
  width:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f7f7;
}
</style>
