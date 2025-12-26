<template>
  <div id="app">
    <nav class="app-nav">
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/dashboard">Dashboard</RouterLink>
    </nav>

    <main class="app-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
  .app { 
     background-color: red;
}

.app-nav {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #f5f5f5;
}

.app-nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.app-nav a.router-link-active {
  color: #42b883;
}

.app-content {
  padding: 2rem;
}
</style>
