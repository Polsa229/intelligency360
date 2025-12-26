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
           <UserCircle/>
          Mon profil
        </button>

        <button class="menu-item" @click="handleSettings">
          <Settings />
          Paramètres
        </button>

        <div class="menu-divider"></div>

        <button class="menu-item menu-item-danger" @click="handleLogout">
          <LogOut />
          Déconnexion
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup>
  
  import { ref, onMounted, onUnmounted } from "vue";
  import { UserCircle, Settings, LogOut } from 'lucide-vue-next';
  
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
