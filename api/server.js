import express from "express";
import cors from "cors";
import todoRouter from "./routes/todoRouter.js";

const app = express();
const PORT = 3000;

// ========================================
// MIDDLEWARES
// ========================================

app.use(cors());
app.use(express.json());

// ========================================
// ROUTE DE DOCUMENTATION
// ========================================

app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue sur l'API de gestion des tâches",
    version: "2.0.0",
    architecture: "MVC (Model-View-Controller)",
    endpoints: {
      "GET /api/todos": "Récupérer toutes les tâches",
      "GET /api/todos/:id": "Récupérer une tâche spécifique",
      "POST /api/todos": "Créer une nouvelle tâche",
      "PUT /api/todos/:id": "Remplacer complètement une tâche",
      "PATCH /api/todos/:id": "Modifier partiellement une tâche",
      "DELETE /api/todos/:id": "Supprimer une tâche",
    },
    examples: {
      todo: {
        id: 1,
        name: "Ma tâche",
        priority: 1,
        done: false,
      },
    },
  });
});

// ========================================
// MONTAGE DES ROUTEURS
// ========================================

// Toutes les routes /api/todos sont gérées par todoRouter
app.use("/api/todos", todoRouter);

// ========================================
// DÉMARRAGE DU SERVEUR
// ========================================

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📚 Documentation disponible sur http://localhost:${PORT}/`);
});

export default app;
