<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Alert Message -->
      <AlertMessage
        v-model="showError"
        variant="error"
        closable
        @close="handleCloseError"
      >
        Connexion impossible. Vérifiez vos identifiants et réessayez.
      </AlertMessage>

      <!-- Header -->
      <h1 class="login-title">Bienvenu sur Spectorly!</h1>

      <p class="login-subtitle">
        Vous n'avez pas de compte ?
        <a href="#" class="link-primary">Créez votre compte</a> ou
        connectez-vous avec votre
        <a href="#" class="link-primary">code</a> entreprise.
      </p>

      <!-- Form -->
      <div class="login-form">
        <!-- Email Field -->
        <InputField
          v-model="formData.email"
          label="Email"
          type="email"
          placeholder="didi.franck@example.com"
          required
          autocomplete="email"
          :error="errors.email"
        />

        <!-- Password Field -->
        <InputField
          v-model="formData.password"
          label="Mot de passe"
          type="password"
          placeholder="h472by6364_dg77"
          required
          autocomplete="current-password"
          :error="errors.password"
        />

        <!-- Legal Notice -->
        <p class="legal-notice">
          En continuant, vous acceptez notre
          <a href="#" class="link-secondary">Politique de confidentialité</a>
          ainsi que notre utilisation des
          <a href="#" class="link-secondary">Cookies</a>.
        </p>

        <div>
          <!-- Submit Button -->
          <PrimaryButton
            variant="success"
            size="medium"
            block
            :loading="isLoading"
            @click="handleSubmit"
          >
            Connexion
          </PrimaryButton>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import AlertMessage from "@/components/ui/AlertMessage.vue";
import InputField from "@/components/ui/InputField.vue";
import PrimaryButton from "@/components/ui/PrimaryButton.vue";

// State
const showError = ref(true);
const isLoading = ref(false);

const formData = reactive({
  email: "",
  password: "",
});

const errors = reactive({
  email: "",
  password: "",
});

// Events
const emit = defineEmits(["submit"]);

// Methods
const validateForm = () => {
  let isValid = true;

  // Reset errors
  errors.email = "";
  errors.password = "";

  // Validate email
  if (!formData.email) {
    errors.email = "L'email est requis";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "L'email n'est pas valide";
    isValid = false;
  }

  // Validate password
  if (!formData.password) {
    errors.password = "Le mot de passe est requis";
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = "Le mot de passe doit contenir au moins 6 caractères";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    showError.value = true;
    return;
  }

  try {
    isLoading.value = true;
    showError.value = false;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    emit("submit", { ...formData });
    console.log("Form submitted:", formData);
  } catch (error) {
    showError.value = true;
    console.error("Login error:", error);
  } finally {
    isLoading.value = false;
  }
};

const handleCloseError = () => {
  showError.value = false;
};
</script>

<style scoped>
.login-container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}

.login-card {
  flex-flow: column;
  background: white;
  border-radius: 8px;
  padding: 40px;
  width: 100%;
  max-width: 554px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Header */
.login-title {
  font-size: 28px;
  font-weight: 600;
  color: #1f2937;
  margin-top: 32px;
  margin-bottom: 12px;
  line-height: 1.3;
}

.login-subtitle {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 32px;
}

/* Links */
.link-primary {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.link-primary:hover {
  text-decoration: underline;
}

.link-secondary {
  color: #3b82f6;
  text-decoration: none;
}

.link-secondary:hover {
  text-decoration: underline;
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
}

/* Legal Notice */
.legal-notice {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 24px;
}

/* Responsive */
@media (max-width: 640px) {
  .login-card {
    padding: 24px;
  }

  .login-title {
    font-size: 24px;
  }

  .login-subtitle {
    font-size: 13px;
  }
}
</style>
