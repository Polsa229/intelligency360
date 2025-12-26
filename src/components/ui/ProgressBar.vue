<template>
  <div class="progress-container">
    <div v-if="showLabel" class="progress-header">
      <span v-if="label" class="progress-label">{{ label }}</span>
      <span v-if="showPercentage" class="progress-percentage"
        >{{ value }}%</span
      >
    </div>

    <div
      class="progress-bar"
      :class="[
        `progress-${size}`,
        { 'progress-striped': striped, 'progress-animated': animated },
      ]"
      role="progressbar"
      :aria-valuenow="value"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div class="progress-fill" :style="progressStyle">
        <span v-if="showInnerLabel" class="progress-inner-label">
          {{ value }}%
        </span>
      </div>
    </div>

    <div v-if="$slots.footer" class="progress-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  value: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 100,
  },
  color: {
    type: String,
    default: "#10b981",
  },
  backgroundColor: {
    type: String,
    default: "#e5e7eb",
  },
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
  label: {
    type: String,
    default: "",
  },
  showLabel: {
    type: Boolean,
    default: false,
  },
  showPercentage: {
    type: Boolean,
    default: false,
  },
  showInnerLabel: {
    type: Boolean,
    default: false,
  },
  striped: {
    type: Boolean,
    default: false,
  },
  animated: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: true,
  },
});

const progressStyle = computed(() => ({
  width: `${props.value}%`,
  backgroundColor: props.color,
  borderRadius: props.rounded ? "4px" : "0",
}));
</script>

<style scoped>
.progress-container {
  width: 100%;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.progress-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.progress-percentage {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.progress-bar {
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-small {
  height: 6px;
}

.progress-medium {
  height: 8px;
}

.progress-large {
  height: 12px;
}

.progress-fill {
  height: 100%;
  background-color: #10b981;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.progress-inner-label {
  font-size: 11px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Striped Effect */
.progress-striped .progress-fill {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

/* Animated Stripes */
.progress-animated .progress-fill {
  animation: progress-stripes 1s linear infinite;
}

@keyframes progress-stripes {
  0% {
    background-position: 1rem 0;
  }
  100% {
    background-position: 0 0;
  }
}

.progress-footer {
  margin-top: 8px;
  font-size: 13px;
  color: #6b7280;
}

/* Variants */
.progress-fill.success {
  background-color: #10b981;
}

.progress-fill.warning {
  background-color: #f59e0b;
}

.progress-fill.error {
  background-color: #ef4444;
}

.progress-fill.info {
  background-color: #3b82f6;
}
</style>
