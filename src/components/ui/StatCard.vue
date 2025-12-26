<template>
  <div
    class="stat-card"
    :class="{ 'stat-card-clickable': clickable }"
    @click="handleClick"
  >
    <div class="stat-header">
      <h3 class="stat-title">{{ title }}</h3>

      <div v-if="icon" class="stat-icon-wrapper">
        <slot name="icon">
          <component :is="icon" :class="`stat-icon stat-icon-${variant}`" />
        </slot>
      </div>

      <!-- Default Icons -->
      <svg
        v-else-if="variant === 'progress'"
        class="stat-icon stat-icon-progress"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
        <path
          d="M12 6V12L16 14"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>

      <svg
        v-else-if="variant === 'success'"
        class="stat-icon stat-icon-success"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
        <path
          d="M8 12L11 15L16 9"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <div v-if="value" class="stat-value">{{ value }}</div>

    <div class="stat-label">
      <slot>{{ label }}</slot>
    </div>

    <!-- Progress Bar -->
    <div v-if="showProgress" class="stat-progress">
      <slot name="progress">
        <ProgressBar :value="progress" :color="progressColor" />
      </slot>
    </div>

    <!-- Footer Slot -->
    <div v-if="$slots.footer" class="stat-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import ProgressBar from "./ProgressBar.vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  value: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "default",
    validator: (value) =>
      ["default", "progress", "success", "warning", "error"].includes(value),
  },
  icon: {
    type: [String, Object],
    default: null,
  },
  showProgress: {
    type: Boolean,
    default: false,
  },
  progress: {
    type: Number,
    default: 0,
  },
  progressColor: {
    type: String,
    default: "#10b981",
  },
  clickable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const handleClick = () => {
  if (props.clickable) {
    emit("click");
  }
};
</script>

<style scoped>
.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.stat-card-clickable {
  cursor: pointer;
}

.stat-card-clickable:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.stat-title {
  font-size: 16px;
  font-weight: 500;
  color: #111827;
}

.stat-icon-wrapper {
  flex-shrink: 0;
}

.stat-icon {
  flex-shrink: 0;
}

.stat-icon-progress {
  color: #3b82f6;
}

.stat-icon-success {
  color: #10b981;
}

.stat-icon-warning {
  color: #f59e0b;
}

.stat-icon-error {
  color: #ef4444;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
  line-height: 1;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
}

.stat-progress {
  margin-top: 16px;
}

.stat-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

/* Responsive */
@media (max-width: 640px) {
  .stat-card {
    padding: 20px;
  }

  .stat-value {
    font-size: 28px;
  }
}
</style>
