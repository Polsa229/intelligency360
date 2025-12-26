<template>
  <div class="certification-dashboard">
    <!-- Header -->
    <Header />

    <!-- Summary Section -->
    <section class="summary-section">
      <div class="summary-content">
        <h2 class="summary-title">Résumé de la certification</h2>
        <p class="summary-description">
          Retrouvez les détails de votre progression et les informations
          essentielles.
        </p>
      </div>

      <div class="summary-actions">
        <PrimaryButton variant="outline-secondary" @click="handleViewCertificate">
          <Eye class="btn-icon" />
          Voir le certificat
        </PrimaryButton>

        <PrimaryButton variant="success" @click="handleDownload">
          <ArrowDownToLine class="btn-icon" />
          Télécharger
        </PrimaryButton>
      </div>
    </section>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <StatCard class="col-span-2" title="Progression" variant="progress" value="80%" label="3/12 modules"
        :show-progress="true" :progress="80" />
      <StatCard title="100%" variant="success" label="Cyberscore de certification" />
      <StatCard title="100%" variant="success" label="Score moyen des quiz" />
    </div>

    <!-- Accordion Section with Modules -->
    <AccordionSection  title="Détails de la progression"
      subtitle="Votre progression détaillée, étape après étape.">
      <div class="accordion-content-wrapper">
        <!-- État de chargement -->
        <div v-if="postStore.isLoading" class="loading-state">
          <div class="skeleton-grid">
            <div v-for="i in 4" :key="i" class="skeleton-card"></div>
          </div>
        </div>

        <!-- État d'erreur -->
        <div v-else-if="postStore.error" class="error-state">
          <p class="error-message">Erreur de chargement: {{ postStore.error }}</p>
          <PrimaryButton @click="postStore.fetchPosts" variant="outline">
            Réessayer
          </PrimaryButton>
        </div>

        <!-- Contenu normal -->
        <div v-else>
          <div class="modules-grid">
            <ModuleCard v-for="(module, index) in postStore.displayedPosts" :key="module.id" :id="module.id"
              :number="(index + 1).toString().padStart(2, '0')" :title="module.title"
              :description="module.body.substring(0, 120) + '...'" :image="getModuleImage(index)"
              :duration="Math.floor(Math.random() * 20) + 10" :progress="Math.floor(Math.random() * 100)"
              :completed-modules="Math.floor(Math.random() * 12) + 1" :total-modules="12"
              :status="getModuleStatus(index)" @click="handleModuleClick(module.id)" />
          </div>

          <!-- Bouton Voir Tous -->
          <div class="view-all-container">
            <PrimaryButton variant="outline" @click="showModal = true">
              <Eye class="btn-icon" />
              Voir tous les contenus ({{ postStore.posts.length }})
            </PrimaryButton>
          </div>
        </div>
      </div>
    </AccordionSection>

    <!-- Modal Component -->
    <PostModal :show="showModal" @close="showModal = false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Header from "@/components/ui/Header.vue";
import StatCard from "@/components/ui/StatCard.vue";
import AccordionSection from "@/components/ui/AccordionSection.vue";
import ModuleCard from "@/components/ui/ModuleCard.vue";
import PrimaryButton from "@/components/ui/PrimaryButton.vue";
import PostModal from "@/components/ui/PostModal.vue";

import { Eye, ArrowDownToLine } from 'lucide-vue-next';

import { usePostStore } from '@/stores/postStore';
import "./styles/CertificationDashboard.css";

// State
const isProgressDetailsOpen = ref(true);
const showModal = ref(false);

// ✅ CORRECTION: Utiliser le store directement sans déstructuration
const postStore = usePostStore();

// Charger les données au montage
onMounted(() => {
  postStore.fetchPosts();
});

// Images pour les modules
const getModuleImage = (index) => {
  const images = [
    new URL('@/assets/img/post/image-1.jpg', import.meta.url).href,
    new URL('@/assets/img/post/image-2.jpg', import.meta.url).href,
    new URL('@/assets/img/post/image-3.jpg', import.meta.url).href,
    new URL('@/assets/img/post/image-4.jpg', import.meta.url).href
  ];
  return images[index % images.length];
};

const getModuleStatus = (index) => {
  if (index === 0) return "in-progress";
  if (index === 1) return "completed";
  return null;
};

// Méthodes
const handleViewCertificate = () => {
  console.log("View certificate");
};

const handleDownload = () => {
  console.log("Download certificate");
};

const handleModuleClick = (moduleId) => {
  console.log("Module clicked:", moduleId);
};
</script>