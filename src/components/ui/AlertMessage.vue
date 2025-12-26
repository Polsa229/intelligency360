<template>
  <div v-if="modelValue" :class="['alert', `alert-${variant}`]" role="alert">
    <svg
      class="alert-icon"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        v-if="variant === 'error'"
        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z"
        fill="currentColor"
      />
      <path
        v-else-if="variant === 'success'"
        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
        fill="currentColor"
      />
      <path
        v-else-if="variant === 'warning'"
        d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z"
        fill="currentColor"
      />
      <path
        v-else
        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z"
        fill="currentColor"
      />
    </svg>

    <div class="alert-content">
      <slot>{{ message }}</slot>
    </div>

    <button
      v-if="closable"
      type="button"
      class="alert-close"
      @click="handleClose"
      aria-label="Fermer"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M12 4L4 12M4 4L12 12"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
  variant: {
    type: String,
    default: "error",
    validator: (value) =>
      ["error", "success", "warning", "info"].includes(value),
  },
  message: {
    type: String,
    default: "",
  },
  closable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "close"]);

const handleClose = () => {
  emit("update:modelValue", false);
  emit("close");
};
</script>

<style scoped>
  
.alert {
    display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid;
  position: relative;
}

.alert-icon {
  flex-shrink: 0;
  margin-top: 1px;
}

.alert-content {
  flex: 1;
}

.alert-close {
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: inherit;
  opacity: 0.6;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert-close:hover {
  opacity: 1;
}

/* Variants */
.alert-error {
  background-color: #fef2f2;
  border-color: #fecaca;
  color: #dc2626;
}

.alert-success {
  background-color: #f0fdf4;
  border-color: #bbf7d0;
  color: #16a34a;
}

.alert-warning {
  background-color: #fffbeb;
  border-color: #fde68a;
  color: #d97706;
}

.alert-info {
  background-color: #eff6ff;
  border-color: #bfdbfe;
  color: #2563eb;
}
</style>
