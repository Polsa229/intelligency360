<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'btn',
      `btn-${variant}`,
      `btn-${size}`,
      { 'btn-loading': loading, 'btn-block': block },
    ]"
    @click="handleClick"
  >
    <span v-if="loading" class="btn-spinner">
      <svg
        class="spinner"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <circle
          cx="8"
          cy="8"
          r="6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="30"
          stroke-dashoffset="10"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 8 8"
            to="360 8 8"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </span>

    <span v-if="icon && iconPosition === 'left'" class="btn-icon btn-icon-left">
      <slot name="icon-left">
        <component :is="icon" />
      </slot>
    </span>

    <span class="btn-content">
      <slot>{{ label }}</slot>
    </span>

    <span
      v-if="icon && iconPosition === 'right'"
      class="btn-icon btn-icon-right"
    >
      <slot name="icon-right">
        <component :is="icon" />
      </slot>
    </span>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "button",
    validator: (value) => ["button", "submit", "reset"].includes(value),
  },
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      ["primary", "secondary", "success", "danger", "outline"].includes(value),
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
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: [String, Object],
    default: null,
  },
  iconPosition: {
    type: String,
    default: "left",
    validator: (value) => ["left", "right"].includes(value),
  },
});

const emit = defineEmits(["click"]);

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  position: relative;
  white-space: nowrap;
}

.btn:focus {
  outline: none;
}

.btn:active:not(:disabled) {
  transform: translateY(1px);
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Sizes */
.btn-small {
  padding: 8px 16px;
  font-size: 13px;
}

.btn-medium {
  padding: 12px 24px;
  font-size: 15px;
}

.btn-large {
  padding: 14px 28px;
  font-size: 16px;
}

/* Variants */
.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2563eb;
}

.btn-primary:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.btn-secondary {
  background-color: #6b7280;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #4b5563;
}

.btn-secondary:focus {
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.2);
}

.btn-success {
  background-color: #10b981;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background-color: #059669;
}

.btn-success:focus {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
}

.btn-danger {
  background-color: #dc2626;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background-color: #b91c1c;
}

.btn-danger:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
}

.btn-outline {
  background-color: transparent;
  color: #3b82f6;
  border: 1px solid #3b82f6;
}

.btn-outline:hover:not(:disabled) {
  background-color: #eff6ff;
}

.btn-outline:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Loading state */
.btn-loading {
  pointer-events: none;
}

.btn-spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-content {
  display: inline-flex;
  align-items: center;
}
</style>
