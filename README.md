# Vue 3 + Vite

# Intelligency360 – Test Technique Frontend

## 📌 Contexte
Ce projet a été réalisé dans le cadre d’un test technique Frontend.
L’objectif est d’intégrer des interfaces issues de maquettes Figma en Vue 3,
tout en respectant les bonnes pratiques de développement, d’architecture et d’accessibilité.

---

## 🛠️ Stack technique

- **Framework** : Vue 3 (Composition API)
- **Bundler** : Vite
- **Gestion d’état** : Pinia (utilisé dans ce projet)
- **Routing** : Vue Router
- **HTTP Client** : Fetch / Axios
- **Tests unitaires** : Vitest
- **Linting & Formatage** : ESLint + Prettier

---

## 📁 Structure du projet

```txt
├─ src/
│  ├─ assets/
│  │  ├─ img/
│  │  │  ├─ post/
│  │  │  │  ├─ image-1.jpg
│  │  │  │  ├─ image-2.jpg
│  │  │  │  ├─ image-3.jpg
│  │  │  │  └─ image-4.jpg
│  │  │  └─ didi-franck.jpg
│  │  └─ vue.svg
│  ├─ components/
│  │  ├─ __tests__/
│  │  │  ├─ HelloWorld.spec.js
│  │  │  └─ PrimaryButton.spec.js
│  │  ├─ auth/
│  │  │  └─ LoginForm.vue
│  │  ├─ certification/
│  │  ├─ ui/
│  │  │  ├─ AccordionSection.vue
│  │  │  ├─ AlertMessage.vue
│  │  │  ├─ Header.vue
│  │  │  ├─ InputField.vue
│  │  │  ├─ ModuleCard.vue
│  │  │  ├─ PostModal.vue
│  │  │  ├─ PrimaryButton.vue
│  │  │  ├─ ProgressBar.vue
│  │  │  ├─ StatCard.vue
│  │  │  └─ UserProfile.vue
│  │  └─ HelloWorld.vue
│  ├─ layouts/
│  │  ├─ AuthLayout.vue
│  │  └─ DashboardLayout.vue
│  ├─ router/
│  │  └─ index.js
│  ├─ stores/
│  │  ├─ index.js
│  │  └─ postStore.js
│  ├─ views/
│  │  ├─ styles/
│  │  │  ├─ CertificationDashboard.css
│  │  │  └─ LoginView.css
│  │  ├─ CertificationDashboard copy.vue
│  │  ├─ CertificationDashboard.vue
│  │  └─ LoginView.vue
│  ├─ App copy.vue
│  ├─ App.vue
│  ├─ main.js
│  └─ style.css

