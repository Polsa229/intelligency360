<template>
  <div v-if="show" class="modal-overlay" @click.self="onClose">
    <div class="modal-container">
      <div class="modal-header">
        <h2>Tous les contenus</h2>
        <button class="close-button" @click="onClose">
          <X size="24" />
        </button>
      </div>
      <!-- Barre de recherche -->
      <div class="search-container">
        <input type="text" :value="searchQuery" @input="(e) => setSearchQuery(e.target.value)"
          placeholder="Rechercher un contenu..." class="search-input" />
        <Search class="search-icon" />
      </div>
      <div class="modal-content">


        <!-- État de chargement -->
        <div v-if="isLoading" class="loading-container">
          <div class="spinner"></div>
          <p>Chargement des contenus...</p>
        </div>

        <!-- État d'erreur -->
        <div v-else-if="error" class="error-container">
          <p class="error-message">Erreur: {{ error }}</p>
          <PrimaryButton @click="fetchPosts" variant="outline">
            Réessayer
          </PrimaryButton>
        </div>

        <!-- Liste des contenus -->
        <div v-else class="content-list">
          <div v-for="post in filteredPosts" :key="post.id" class="content-item">
            <div class="content-info">
              <h3>{{ post.title }}</h3>
              <p>{{ post.body.substring(0, 150) }}...</p>
              <div class="content-tags">
                <span v-for="tag in post.tags" :key="tag" class="tag">
                  {{ tag }}
                </span>
              </div>
              <div class="content-stats">
                <span>
                  <ThumbsUp /> {{ post.reactions.likes }}
                </span>
                <span>
                  <ThumbsDown />{{ post.reactions.dislikes }}
                </span>
                <span>
                  <Eye /> {{ post.views }} vues
                </span>
              </div>
            </div>
          </div>

          <!-- Message si aucun résultat -->
          <div v-if="filteredPosts.length === 0" class="no-results">
            <p>Aucun contenu trouvé pour "{{ searchQuery }}"</p>
          </div>
        </div>

      </div>
      <!-- Pagination -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button">
          &laquo; Précédent
        </button>

        <span class="page-info">
          Page {{ currentPage }} sur {{ totalPages }}
        </span>

        <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">
          Suivant &raquo;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Search, X, Eye, ThumbsUp, ThumbsDown } from 'lucide-vue-next';
import PrimaryButton from './PrimaryButton.vue';
import { usePostStore } from '@/stores/postStore';
import { watch } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close']);

const onClose = () => {
  emit('close');
};

// Utilisation du store Zustand
const {
  posts,
  isLoading,
  error,
  searchQuery,
  currentPage,
  fetchPosts,
  setSearchQuery,
  setCurrentPage,
  filteredPosts,
  totalPages,
} = usePostStore();

// Computed values
// Méthodes de pagination
const nextPage = () => {
  if (currentPage < totalPages.value) {
    setCurrentPage(currentPage + 1);
  }
};

const prevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

// Charger les posts si le modal s'ouvre
watch(() => props.show, (newVal) => {
  if (newVal && posts.length === 0) {
    fetchPosts();
  }
});
</script>

<style scoped>
/* Les styles restent les mêmes que précédemment */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
}

.modal-container {
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-content {
  background-color: white;
  /* border-radius: 12px; */
  width: 100%;
  max-width: 1200px;
  max-height: 70vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f4f6;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Error State */
.error-container {
  text-align: center;
  padding: 40px;
}

.error-message {
  color: #ef4444;
  margin-bottom: 20px;
  font-weight: 500;
}

/* No Results */
.no-results {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}

/* Reste des styles (identique à la version précédente) */
</style>