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
- **Gestion d’état** : Vuex
- **Routing** : Vue Router
- **HTTP Client** : Fetch / Axios
- **Tests unitaires** : Vitest
- **Linting & Formatage** : ESLint + Prettier

---

## 📁 Structure du projet

```txt
src/
├── assets/            # Images et ressources statiques
├── components/
│   ├── auth/          # Composants liés à l’authentification
│   ├── certification/ # Composants métiers
│   └── ui/             # Composants UI réutilisables
├── views/             # Pages (liées aux routes)
├── store/             # Vuex (état global)
├── router/            # Configuration des routes
├── App.vue
└── main.js
