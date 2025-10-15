import express from "express";
import TodoController from "../controllers/todoController.js";

const router = express.Router();
const controller = new TodoController();

// ========================================
// ROUTES - Définition des endpoints
// ========================================

// GET /api/todos - Récupérer toutes les tâches
router.get("/", controller.getAllTodos);

// GET /api/todos/:id - Récupérer une tâche spécifique
router.get("/:id", controller.getTodoById);

// POST /api/todos - Créer une nouvelle tâche
router.post("/", controller.createTodo);

// PUT /api/todos/:id - Remplacer complètement une tâche
router.put("/:id", controller.replaceTodo);

// PATCH /api/todos/:id - Modifier partiellement une tâche
router.patch("/:id", controller.updateTodo);

// DELETE /api/todos/:id - Supprimer une tâche
router.delete("/:id", controller.deleteTodo);

export default router;
