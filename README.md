# TodoListAPI2 - Architecture MVC

API REST de gestion de tâches avec architecture MVC (Model-View-Controller).

## 📁 Structure du projet

```
api/
├── models/
│   └── Todo.js              # Modèle - Classe Todo avec validation
├── controllers/
│   └── todoController.js    # Contrôleur - Logique métier
├── routes/
│   └── todoRouter.js        # Routeur - Définition des endpoints REST
├── server.js                # Point d'entrée - Configuration Express
├── package.json             # Configuration npm
└── README.md                # Documentation
```

## 🏗️ Architecture MVC

### **Model** (`models/Todo.js`)
- Classe `Todo` avec champs privés (#id, #name, #priority, #done)
- Getters/Setters avec validation
- Méthodes `toJSON()` et `update()`

### **Controller** (`controllers/todoController.js`)
- Logique métier séparée des routes
- Fonctions exportées : `getAllTodos`, `getTodoById`, `createTodo`, `replaceTodo`, `updateTodo`, `deleteTodo`
- Gestion des erreurs et validation des données

### **Router** (`routes/todoRouter.js`)
- Définition des routes REST
- Liaison entre endpoints et contrôleurs
- Routes montées sur `/api/todos`

### **Server** (`server.js`)
- Configuration Express (CORS, JSON parsing)
- Montage du routeur
- Route de documentation sur `/`

## 🚀 Démarrage

```bash
# Démarrer le serveur
npm start

# Mode développement (avec nodemon)
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

## 📚 Endpoints disponibles

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/todos` | Récupérer toutes les tâches |
| GET | `/api/todos/:id` | Récupérer une tâche par ID |
| POST | `/api/todos` | Créer une nouvelle tâche |
| PUT | `/api/todos/:id` | Remplacer complètement une tâche |
| PATCH | `/api/todos/:id` | Modifier partiellement une tâche |
| DELETE | `/api/todos/:id` | Supprimer une tâche |

## 🧪 Tests avec cURL

```bash
# Récupérer toutes les tâches
curl http://localhost:3000/api/todos

# Récupérer une tâche par ID
curl http://localhost:3000/api/todos/1

# Créer une tâche
curl -X POST http://localhost:3000/api/todos -H "Content-Type: application/json" -d "{\"name\":\"Nouvelle tâche\",\"priority\":2,\"done\":false}"

# Modifier partiellement une tâche
curl -X PATCH http://localhost:3000/api/todos/1 -H "Content-Type: application/json" -d "{\"done\":true}"

# Supprimer une tâche
curl -X DELETE http://localhost:3000/api/todos/1
```

## 🎯 Avantages de l'architecture MVC

1. **Séparation des responsabilités** : Chaque fichier a un rôle précis
2. **Maintenabilité** : Code plus facile à modifier et à tester
3. **Réutilisabilité** : Les contrôleurs peuvent être utilisés par plusieurs routes
4. **Scalabilité** : Facile d'ajouter de nouvelles fonctionnalités
5. **Testabilité** : Les contrôleurs peuvent être testés indépendamment
