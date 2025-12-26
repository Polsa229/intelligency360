<template>
  <div class="form-group">
    <label v-if="label" :for="inputId" class="form-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>

    <div class="input-wrapper">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :class="['form-input', { 'has-error': error, disabled: disabled }]"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <span v-if="type === 'password' && showToggle" class="password-toggle">
        <button
          type="button"
          @click="togglePasswordVisibility"
          aria-label="Afficher/Masquer le mot de passe"
        >
          <svg
            v-if="passwordVisible"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z"
              stroke="currentColor"
              stroke-width="2"
            />
            <circle
              cx="12"
              cy="12"
              r="3"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 3L21 21M12 5C5.63636 5 2 12 2 12C2 12 3.5 14.5 6 16.5M12 19C18.3636 19 22 12 22 12C22 12 20.5 9.5 18 7.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M9.9 9.9C9.33565 10.4644 9 11.2121 9 12C9 13.6569 10.3431 15 12 15C12.7879 15 13.5356 14.6644 14.1 14.1"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </span>
    </div>

    <span v-if="error" class="error-message">{{ error }}</span>
    <span v-else-if="hint" class="hint-message">{{ hint }}</span>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
  hint: {
    type: String,
    default: "",
  },
  autocomplete: {
    type: String,
    default: "off",
  },
  showToggle: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "blur", "focus"]);

// Generate unique ID for accessibility
const inputId = computed(
  () => `input-${Math.random().toString(36).substr(2, 9)}`
);

// Password visibility toggle
const passwordVisible = ref(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleInput = (event) => {
  emit("update:modelValue", event.target.value);
};

const handleBlur = (event) => {
  emit("blur", event);
};

const handleFocus = (event) => {
  emit("focus", event);
};
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.required {
  color: #dc2626;
  margin-left: 2px;
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  transition: all 0.2s;
  color: #1f2937;
  background-color: white;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

.form-input.has-error {
  border-color: #dc2626;
}

.form-input.has-error:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-input.disabled {
  background-color: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.password-toggle button {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: color 0.2s;
}

.password-toggle button:hover {
  color: #374151;
}

.error-message {
  display: block;
  font-size: 13px;
  color: #dc2626;
  margin-top: 6px;
}

.hint-message {
  display: block;
  font-size: 13px;
  color: #6b7280;
  margin-top: 6px;
}

/* Responsive */
@media (max-width: 640px) {
  .form-input {
    font-size: 16px; /* Prevents zoom on iOS */
  }
}
</style>
