<template>
  <div class="module-card" @click="handleClick">
    <!-- Image -->
    <div class="module-image-wrapper">
      <img :src="image" :alt="title" class="module-image" @error="handleImageError" />

      <!-- Badge Overlay -->
      <div v-if="badge" class="module-badge" :class="`badge-${badge.variant || 'default'}`">
        {{ badge.text }}
      </div>

      <!-- Status Overlay -->
      <div v-if="status" class="module-status">
        <svg v-if="status === 'completed'" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" fill="#10b981" />
          <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <svg v-else-if="status === 'in-progress'" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" fill="#3b82f6" />
          <path d="M10 6V10L13 12" stroke="white" stroke-width="2" stroke-linecap="round" />
        </svg>

        <svg v-else-if="status === 'locked'" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="4" y="9" width="12" height="9" rx="2" fill="#9ca3af" />
          <path d="M7 9V6C7 4.34315 8.34315 3 10 3V3C11.6569 3 13 4.34315 13 6V9" stroke="#9ca3af" stroke-width="2" />
        </svg>
      </div>
    </div>

    <!-- Content -->
    <div class="module-content">
      <!-- Meta Information -->
      <div class="module-meta">
        <span class="module-number">Module {{ number }}</span>
        <span class="module-separator">●</span>
        <span class="module-duration">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5" />
            <path d="M10 5V10L13 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
          {{ duration }} min
        </span>
      </div>

      <!-- Title -->
      <h4 class="module-title">{{ title }}</h4>

      <!-- Description -->
      <p v-if="description" class="module-description">{{ description }}</p>

      <!-- Tags -->
      <div v-if="tags && tags.length" class="module-tags">
        <span v-for="tag in tags" :key="tag" class="module-tag">
          {{ tag }}
        </span>
      </div>

      <!-- Footer with Progress -->
      <div class="module-footer">
        <div class="module-progress-info">
          <span class="module-progress-text">{{ progress }}%</span>
          <span class="module-progress-modules">
            {{ completedModules }}/{{ totalModules }} modules
          </span>
        </div>

        <ProgressBar :value="progress" size="small" :color="progressColor" />
      </div>

      <!-- Action Slot -->
      <div v-if="$slots.action" class="module-action">
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import ProgressBar from "./ProgressBar.vue";

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  number: {
    type: [String, Number],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 0,
  },
  progress: {
    type: Number,
    default: 0,
  },
  completedModules: {
    type: Number,
    default: 0,
  },
  totalModules: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: null,
    validator: (value) =>
      !value || ["completed", "in-progress", "locked", "new"].includes(value),
  },
  badge: {
    type: Object,
    default: null,
  },
  tags: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["click", "image-error"]);

const progressColor = computed(() => {
  if (props.progress === 100) return "#10b981";
  if (props.progress > 0) return "#3b82f6";
  return "#e5e7eb";
});

const handleClick = () => {
  emit("click", props.id);
};

const handleImageError = (event) => {
  event.target.src =
    "https://via.placeholder.com/400x300?text=Image+non+disponible";
  emit("image-error", props.id);
};
</script>

<style scoped>
.module-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.module-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* Image */
.module-image-wrapper {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  background-color: #f3f4f6;
}

.module-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.module-card:hover .module-image {
  transform: scale(1.05);
}

.module-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
}

.badge-new {
  background-color: #3b82f6;
  color: white;
}

.badge-popular {
  background-color: #f59e0b;
  color: white;
}

.module-status {
  position: absolute;
  top: 12px;
  right: 12px;
}

/* Content */
.module-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.module-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 12px;
}

.module-number {
  font-weight: 600;
}

.module-separator {
  font-size: 8px;
}

.module-duration {
  display: flex;
  align-items: center;
  gap: 4px;
}

.module-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.module-description {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.module-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.module-tag {
  display: inline-block;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 500;
  color: #374151;
  background-color: #f3f4f6;
  border-radius: 4px;
}

.module-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.module-progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.module-progress-text {
  font-weight: 600;
  color: #111827;
}

.module-progress-modules {
  color: #6b7280;
}

.module-action {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}

/* Responsive */
@media (max-width: 640px) {
  .module-image-wrapper {
    height: 160px;
  }
}
</style>
