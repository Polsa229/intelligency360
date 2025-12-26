<template>
  <div class="user-profile" @click="toggleMenu">
    <img :src="avatar" :alt="name" class="user-avatar" />

    <div class="user-info">
      <div class="user-name-role">
        <div class="user-name">{{ name }}</div>
        <div v-if="role" class="user-role">{{ role }}</div>
      </div>
      <div class="user-email">{{ email }}</div>
    </div>

    <button
      class="user-menu-btn"
      aria-label="Menu utilisateur"
      :aria-expanded="isMenuOpen"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <div v-if="isMenuOpen && showMenu" class="user-menu">
      <slot name="menu">
        <button class="menu-item" @click="handleProfile">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 10C12.21 10 14 8.21 14 6C14 3.79 12.21 2 10 2C7.79 2 6 3.79 6 6C6 8.21 7.79 10 10 10ZM10 12C7.33 12 2 13.34 2 16V18H18V16C18 13.34 12.67 12 10 12Z"
              fill="currentColor"
            />
          </svg>
          Mon profil
        </button>

        <button class="menu-item" @click="handleSettings">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path
              d="M17.43 10.98C17.47 10.66 17.5 10.34 17.5 10C17.5 9.66 17.47 9.34 17.43 9.02L19.54 7.37C19.73 7.22 19.78 6.95 19.66 6.73L17.66 3.27C17.54 3.05 17.27 2.97 17.05 3.05L14.56 4.05C14.04 3.65 13.48 3.32 12.87 3.07L12.49 0.42C12.46 0.18 12.25 0 12 0H8C7.75 0 7.54 0.18 7.51 0.42L7.13 3.07C6.52 3.32 5.96 3.66 5.44 4.05L2.95 3.05C2.72 2.96 2.46 3.05 2.34 3.27L0.34 6.73C0.21 6.95 0.27 7.22 0.46 7.37L2.57 9.02C2.53 9.34 2.5 9.67 2.5 10C2.5 10.33 2.53 10.66 2.57 10.98L0.46 12.63C0.27 12.78 0.22 13.05 0.34 13.27L2.34 16.73C2.46 16.95 2.73 17.03 2.95 16.95L5.44 15.95C5.96 16.35 6.52 16.68 7.13 16.93L7.51 19.58C7.54 19.82 7.75 20 8 20H12C12.25 20 12.46 19.82 12.49 19.58L12.87 16.93C13.48 16.68 14.04 16.34 14.56 15.95L17.05 16.95C17.28 17.04 17.54 16.95 17.66 16.73L19.66 13.27C19.78 13.05 19.73 12.78 19.54 12.63L17.43 10.98ZM10 13.5C8.07 13.5 6.5 11.93 6.5 10C6.5 8.07 8.07 6.5 10 6.5C11.93 6.5 13.5 8.07 13.5 10C13.5 11.93 11.93 13.5 10 13.5Z"
              fill="currentColor"
            />
          </svg>
          Paramètres
        </button>

        <div class="menu-divider"></div>

        <button class="menu-item menu-item-danger" @click="handleLogout">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path
              d="M7.59 13.41L6.17 12L2.17 16L6.17 20L7.59 18.59L5.99 17H14V15H5.99L7.59 13.41ZM16 0H4C2.89 0 2 0.9 2 2V7H4V2H16V18H4V13H2V18C2 19.1 2.89 20 4 20H16C17.1 20 18 19.1 18 18V2C18 0.9 17.1 0 16 0Z"
              fill="currentColor"
            />
          </svg>
          Déconnexion
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "@/assets/img/didi.franck.jpg",
  },
  showMenu: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["profile", "settings", "logout", "menu-toggle"]);

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  emit("menu-toggle", isMenuOpen.value);
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const handleProfile = () => {
  emit("profile");
  closeMenu();
};

const handleSettings = () => {
  emit("settings");
  closeMenu();
};

const handleLogout = () => {
  emit("logout");
  closeMenu();
};

// Close menu when clicking outside
const handleClickOutside = (event) => {
  const profile = event.target.closest(".user-profile");
  if (!profile && isMenuOpen.value) {
    closeMenu();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>

.user-profile {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user-name-role {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.user-role {
  display: inline-block;
  font-size: 11px;
  color: #6b7280;
  background-color: #D6F5F7;
  padding: 2px 8px;
  border-radius: 4px;
  margin: 2px 0;
}

.user-email {
  font-size: 13px;
  color: #6b7280;
}

.user-menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.user-menu-btn:hover {
  color: #374151;
}

/* Dropdown Menu */
.user-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  min-width: 200px;
  padding: 8px;
  z-index: 50;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  font-size: 14px;
  color: #374151;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: left;
}

.menu-item:hover {
  background-color: #f3f4f6;
}

.menu-item svg {
  flex-shrink: 0;
  color: #6b7280;
}

.menu-item-danger {
  color: #dc2626;
}

.menu-item-danger svg {
  color: #dc2626;
}

.menu-item-danger:hover {
  background-color: #fef2f2;
}

.menu-divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 8px 0;
}

/* Responsive */
@media (max-width: 640px) {
  .user-email {
    display: none;
  }

  .user-menu {
    right: auto;
    left: 0;
  }
}
</style>
