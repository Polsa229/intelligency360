<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Alert Message -->
      <AlertMessage v-model="showError" variant="error" closable @close="handleCloseError">
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
        <InputField v-model="formData.email" label="Email" type="email" placeholder="didi.franck@example.com" required
          autocomplete="email" :error="errors.email" />

        <!-- Password Field -->
        <InputField v-model="formData.password" label="Mot de passe" type="password" placeholder="h472by6364_dg77"
          required autocomplete="current-password" :error="errors.password" />

        <!-- Legal Notice -->
        <p class="legal-notice">
          En continuant, vous acceptez notre
          <a href="#" class="link-secondary">Politique de confidentialité</a>
          ainsi que notre utilisation des
          <a href="#" class="link-secondary">Cookies</a>.
        </p>

        <div>
          <!-- Submit Button -->
          <PrimaryButton variant="success" size="medium" block :loading="isLoading" @click="handleSubmit">
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
import "./styles/LoginView.css";
import { useRouter } from "vue-router";
// State
const navigation = useRouter();

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

  // Option 1: Remplir automatiquement avec les valeurs par défaut si les champs sont vides
  if (!formData.email && !formData.password) {
    formData.email = "didi.franck@example.com";
    formData.password = "didi.franck@example.com";
  }

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
    // console.log("Form submitted:", formData);
    navigation.push('/dashboard'); // Redirect to dashboard after successful login
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
