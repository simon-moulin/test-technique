# Test technique

Ce projet implémente un système de gestion de queue d'actions utilisant un modèle FIFO (First-In-First-Out) avec des crédits d'exécution pour chaque type d'action. Il est construit avec un backend en Express et Node.js, et un frontend en React. Le projet utilise TypeScript et intègre des WebSockets pour synchroniser les actions et les crédits en temps réel.

## Installation

### Cloner le projet
```
git clone https://github.com/simon-moulin/test-technique.git
cd test-technique
```
### Installer les dépendances
```
npm install
```

## Configuration
La configuration principale se trouve dans le fichier apps/backend/src/config.ts. Vous pouvez définir les différents types d'actions, la valeur maximale de leurs crédits ainsi que le temps des deux timers.

## Utilisation

### Démarrer le backend 
```
npx nx start backend
```
### Démarrer le frontend : 
```
npx nx start frontend
````

## Architecture

### Backend
- controllers/ : Tous les controlleurs REST
- models/ : Les différents modèles tels que ActionQueue et Credits
- routes/ : Les routes de l'API
- services/ : Les différents services
- config.ts : La configuration
- main.ts : Le point d'entrée

Utilisation d'injection de dépendances pour les services et controlleurs grâce à TypeDI.

### Frontend
- components/ : Contient les différents composants
- hooks/ : Les hooks personnalisés permettant notamment de gérer les sockets ou les appels API
- types/ : On y retrouve la définition des types utilisés dans ce projet

## API
### Endpoints backend:
- GET /action/types : Récupère la liste des types d'action
- POST /action : Ajoute une nouvelle action à la queue
- GET /credit : Permet de récupérer la liste de crédits

## Tests
Il y a trois fichier de tests:
- src/models/action.test.ts
- src/models/credit.test.ts
- src/services/action.service.test.ts

### Exécuter les tests : 
```
npx nx test backend
```

## Dépendances

### Backend
- Express : Framework web pour Node.js
- Cors : Middleware pour permettre les requêtes cross-origin
- Socket.io : Bibliothèque pour les WebSockets
- TypeDI : Outil pour l'injection de dépendances
- Jest : Framework de test

### Frontend
- React : Bibliothèque JavaScript pour construire des interfaces utilisateur
- Axios : Client HTTP pour effectuer des requêtes
- styled-components : Bibliothèque pour styliser les composants en utilisant le CSS-in-JS
- Socket.io-client : Client pour utiliser les WebSockets avec Socket.io

