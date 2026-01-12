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

// POST /api/todos - Créer une nouvelle tâche (Protégé)
router.post("/", controller.verifyToken, controller.createTodo);

// PUT /api/todos/:id - Remplacer complètement une tâche (Protégé)
router.put("/:id", controller.verifyToken, controller.replaceTodo);

// PATCH /api/todos/:id - Modifier partiellement une tâche (Protégé)
router.patch("/:id", controller.verifyToken, controller.updateTodo);

// DELETE /api/todos/:id - Supprimer une tâche (Protégé)
router.delete("/:id", controller.verifyToken, controller.deleteTodo);

// Login
router.post("/login", controller.login);

export default router;
