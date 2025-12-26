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

intelligency360/
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── auth/           # Composants d'authentification
│   │   ├── certification/  # Composants liés aux certifications
│   │   ├── ui/             # Composants d'interface génériques
│   │   └── __tests__/      # Tests unitaires des composants
│   ├── layouts/            # Layouts principaux
│   ├── router/             # Configuration du routage
│   ├── stores/             # Gestion d'état avec Pinia
│   ├── views/              # Pages principales
│   │   └── styles/         # Styles spécifiques aux vues
│   ├── assets/             # Ressources statiques
│   ├── App.vue             # Composant racine
│   └── main.js             # Point d'entrée de l'application

## Installation et démarrage rapide

# 1. Cloner le projet
git clone https://github.com/Polsa229/intelligency360.git
cd intelligency360

# 2. Installer les dépendances
npm install
# ou
yarn install
# ou
pnpm install

# 3. Lancer en développement
npm run dev

# 4. Construire pour la production
npm run build

# 5. Prévisualiser la build
npm run preview