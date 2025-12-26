<template>
  <div class="dashboard-layout">
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
}

.content {
  padding: 2rem;
}
</style>
