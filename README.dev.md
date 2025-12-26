# README (détails développeur)

Ce fichier contient les instructions d'installation, choix techniques, tests et limitations pour les développeurs.

## 🔧 Installation

Prérequis:
- Node.js 18+ (ou LTS récente) #20.19.4
- npm (ou yarn / pnpm) #11.6.0

Étapes:
1. Cloner le dépôt
   ```bash
   git clone https://github.com/Polsa229/intelligency360.git
   cd intelligency360
   ```
2. Installer les dépendances
   ```bash
   npm install
   # ou yarn install
   # ou pnpm install
   ```
3. Lancer en développement
   ```bash
   npm run dev
   ```
4. Construire pour la production
   ```bash
   npm run build
   ```

---

## 🛠️ Stack technique & choix

- **Framework** : Vue 3 (Composition API)
- **Bundler** : Vite
- **Gestion d’état** : Pinia
- **Routing** : Vue Router
- **HTTP Client** : Fetch / Axios (selon le besoin)
- **Tests unitaires** : Vitest + @vue/test-utils

---

## 🧪 Tests unitaires

Configuration et exemples fournis :

- Lancer tous les tests : `npm run test`
- Mode watch : `npm run test:watch`

Tests fournis :
- `src/components/__tests__/PrimaryButton.spec.js`
- `src/components/__tests__/HelloWorld.spec.js`

Conseils :
- Pour tester Pinia, utilisez `createTestingPinia` ou instanciez le store dans le test.
- Pour tester le router, montez un router minimal dans le test.

---

## ⚠️ Limitations connues

- Couverture de tests minimale : seuls quelques tests de composants existent (démarrage rapide).
- Pas de configuration CI fournie dans le dépôt — prévoir d'ajouter GitHub Actions / GitLab CI selon vos besoins.
- Tests DOM simples : si vous avez des dépendances lourdes sur les APIs du navigateur, il peut être nécessaire d'ajouter des mocks ou d'ajuster l'environnement jsdom.
- Pas de tests E2E (cypress/playwright) dans la configuration actuelle.

---

## 🛠️ Propositions d'améliorations

- Ajouter des tests pour Pinia (store) et le routage.
- Ajouter une intégration CI et un rapport de couverture.
- Ajouter ESLint / Prettier et hooks Git (husky) si souhaité.

---

Si vous voulez, je peux :
- Ajouter la configuration de couverture (c8/istanbul) ;
- Ajouter un job GitHub Actions pour exécuter les tests sur chaque PR ;
- Écrire davantage de tests (stores, vues, composants complexes).
