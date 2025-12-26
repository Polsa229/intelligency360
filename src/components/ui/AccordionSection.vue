<template>
  <div class="accordion-section" :class="{ 'accordion-open': isOpen }">
    <button
      class="accordion-header"
      @click="toggle"
      :aria-expanded="isOpen"
      :aria-controls="`accordion-content-${uid}`"
    >
      <div class="accordion-header-content">
        <slot name="header">
          <div>
            <h3 class="accordion-title">{{ title }}</h3>
            <p v-if="subtitle" class="accordion-subtitle">{{ subtitle }}</p>
          </div>
        </slot>
      </div>

      <div class="accordion-icon-wrapper">
        <slot name="icon">
          <svg
            class="accordion-icon"
            :class="{ 'accordion-icon-rotated': isOpen }"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </slot>
      </div>
    </button>

    <transition
      name="accordion"
      @enter="startTransition"
      @after-enter="endTransition"
      @before-leave="startTransition"
      @after-leave="endTransition"
    >
      <div
        v-show="isOpen"
        :id="`accordion-content-${uid}`"
        class="accordion-content"
        :style="contentStyle"
      >
        <div class="accordion-body" ref="bodyRef">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  defaultOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "toggle"]);

// Generate unique ID for accessibility
const uid = Math.random().toString(36).substr(2, 9);

const isOpen = ref(props.modelValue || props.defaultOpen);
const bodyRef = ref(null);
const contentHeight = ref("auto");

const contentStyle = computed(() => ({
  maxHeight: contentHeight.value,
}));

watch(
  () => props.modelValue,
  (newVal) => {
    isOpen.value = newVal;
  }
);

const toggle = () => {
  isOpen.value = !isOpen.value;
  emit("update:modelValue", isOpen.value);
  emit("toggle", isOpen.value);
};

const startTransition = (el) => {
  el.style.height = el.scrollHeight + "px";
};

const endTransition = (el) => {
  el.style.height = "";
};

onMounted(() => {
  if (bodyRef.value) {
    contentHeight.value = isOpen.value
      ? `${bodyRef.value.scrollHeight}px`
      : "0px";
  }
});
</script>

<style scoped>
.accordion-section {
  width:100%;
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.accordion-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s;
  gap: 16px;
}

.accordion-header:hover {
  background-color: #f9fafb;
}

.accordion-header:focus {
  outline: 2px solid #3b82f6;
  outline-offset: -2px;
}

.accordion-header-content {
  flex: 1;
}

.accordion-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
}

.accordion-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.accordion-icon-wrapper {
  flex-shrink: 0;
}

.accordion-icon {
  color: #6b7280;
  transition: transform 0.3s ease;
}

.accordion-icon-rotated {
  transform: rotate(180deg);
}

.accordion-content {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion-body {
  padding: 0 24px 24px;
}

/* Transition Classes */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Alternative Styles */
.accordion-section.bordered {
  border: 1px solid #e5e7eb;
  box-shadow: none;
}

.accordion-section.flat {
  background: transparent;
  box-shadow: none;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 0;
}

.accordion-section.flat:last-child {
  border-bottom: none;
}

/* Responsive */
@media (max-width: 640px) {
  .accordion-header {
    padding: 20px 16px;
  }

  .accordion-body {
    padding: 0 16px 20px;
  }

  .accordion-title {
    font-size: 16px;
  }

  .accordion-subtitle {
    font-size: 13px;
  }
}
</style>
