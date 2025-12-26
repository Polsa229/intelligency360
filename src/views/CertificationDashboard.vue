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
        <PrimaryButton variant="outline" @click="handleViewCertificate">
          <template #icon-left>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 3C6.13 3 3 6.13 3 10C3 13.87 6.13 17 10 17C13.87 17 17 13.87 17 10C17 6.13 13.87 3 10 3ZM10 15C7.24 15 5 12.76 5 10C5 7.24 7.24 5 10 5C12.76 5 15 7.24 15 10C15 12.76 12.76 15 10 15ZM10.5 7H9V11L12.75 13.15L13.5 11.92L10.5 10.25V7Z"
                fill="currentColor"
              />
            </svg>
          </template>
          Voir le certicat
        </PrimaryButton>

        <PrimaryButton variant="success" @click="handleDownload">
          <template #icon-left>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M17 11V17H3V11H1V17C1 18.1 1.9 19 3 19H17C18.1 19 19 18.1 19 17V11H17ZM16 6L14.59 7.41L11 3.83V15H9V3.83L5.41 7.41L4 6L10 0L16 6Z"
                fill="currentColor"
              />
            </svg>
          </template>
          Télécharger
        </PrimaryButton>
      </div>
    </section>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <StatCard
        title="Progression"
        variant="progress"
        value="80%"
        label="3/12 modules"
        :show-progress="true"
        :progress="80"
      />

      <StatCard
        title="100%"
        variant="success"
        label="Cyberscore de certification"
      />

      <StatCard title="100%" variant="success" label="Score moyen des quiz" />
    </div>

    <!-- Accordion Section with Modules -->
    <AccordionSection
      v-model="isProgressDetailsOpen"
      title="Détails de la progression"
      subtitle="Votre progression détaillée, étape après étape."
    >
      <div class="modules-grid">
        <ModuleCard
          v-for="module in modules"
          :key="module.id"
          :id="module.id"
          :number="module.number"
          :title="module.title"
          :description="module.description"
          :image="module.image"
          :duration="module.duration"
          :progress="module.progress"
          :completed-modules="module.completedModules"
          :total-modules="module.totalModules"
          :status="module.status"
          @click="handleModuleClick"
        />
      </div>
    </AccordionSection>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Header from "@/components/ui/Header.vue";
import StatCard from "@/components/ui/StatCard.vue";
import AccordionSection from "@/components/ui/AccordionSection.vue";
import ModuleCard from "@/components/ui/ModuleCard.vue";
import PrimaryButton from "@/components/ui/PrimaryButton.vue";
import "./styles/CertificationDashboard.css";

// State
const isProgressDetailsOpen = ref(true);

// Modules Data
const modules = ref([
  {
    id: 1,
    number: "01",
    duration: 16,
    title: "Cybersécurité, comprendre les enjeux",
    description:
      "Surveillez et contrôlez vos accès pour éviter les intrusions et protéger vos données sensibles.",
    progress: 35,
    completedModules: 1,
    totalModules: 12,
    status: "in-progress",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    number: "02",
    duration: 16,
    title: "Cybersécurité, comprendre les enjeux",
    description:
      "Surveillez et contrôlez vos accès pour éviter les intrusions et protéger vos données sensibles.",
    progress: 0,
    completedModules: 2,
    totalModules: 12,
    status: null,
    image:
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    number: "03",
    duration: 16,
    title: "Sécurité des accès",
    description:
      "Surveillez et contrôlez vos accès pour éviter les intrusions et protéger vos données sensibles.",
    progress: 0,
    completedModules: 3,
    totalModules: 12,
    status: null,
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    number: "04",
    duration: 16,
    title: "Sécurité des accès",
    description:
      "Surveillez et contrôlez vos accès pour éviter les intrusions et protéger vos données sensibles.",
    progress: 0,
    completedModules: 4,
    totalModules: 12,
    status: null,
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop",
  },
]);

// Methods

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
