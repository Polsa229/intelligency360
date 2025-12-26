<template>
  <div>
    <header class="dashboard-header">
      <h1 class="page-title">Mon certificat</h1>

      <UserProfile
        :name="user.name"
        :email="user.email"
        :role="user.role"
        :avatar="user.avatar"
        @profile="handleProfile"
        @settings="handleSettings"
        @logout="handleLogout"
      />
    </header>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import UserProfile from "@/components/ui/UserProfile.vue";

// User Data
const user = reactive({
  name: "Didi Franck",
  role: "Entreprise",
  email: "didi.franck@example.com",
  avatar: new URL('@/assets/img/didi-franck.jpg', import.meta.url).href,
});

// Methods
const handleProfile = () => {
  console.log("Navigate to profile");
};

const handleSettings = () => {
  console.log("Navigate to settings");
};

const handleLogout = () => {
  console.log("Logout user");
};
</script>

<style scoped>
/* Header */
.dashboard-header {
  display: flex;

  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  color: #111827;
}
</style>
