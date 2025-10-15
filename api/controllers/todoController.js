import Todo from "../models/Todo.js";

// Simulation d'une base de données
let todos = [
  new Todo(1, "Exemple de tâche", 1, false),
  new Todo(2, "Autre tâche", 2, true),
];

let nextId = 3;

// ========================================
// CONTRÔLEURS - Logique métier
// ========================================


class TodoController {
    getAllTodos = (req, res) => {
        try {
            res.json({
                success: true,
                data: todos,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                error: "Erreur lors de la récupération des tâches",
                message: error.message,
            });
        }
    };

    getTodoById = (req, res) => {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    error: "ID invalide",
                    message: "L'ID doit être un nombre entier",
                });
            }

            const todo = todos.find((t) => t.id === id);

            if (!todo) {
                return res.status(404).json({
                    success: false,
                    error: "Tâche non trouvée",
                });
            }

            res.json({
                success: true,
                data: todo,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: "Erreur lors de la récupération de la tâche",
                message: error.message,
            });
        }
    };

    createTodo = (req, res) => {
        try {
            const { name, priority, done } = req.body;

            const newTodo = new Todo(nextId++, name, priority, done);
            todos.push(newTodo);

            res.status(201).json({
                success: true,
                data: newTodo,
                message: "Tâche ajoutée avec succès",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                error: "Erreur lors de l'ajout de la tâche",
                message: error.message,
            });
        }
    };

    replaceTodo = (req, res) => {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    error: "ID invalide",
                    message: "L'ID doit être un nombre entier",
                });
            }

            const index = todos.findIndex((t) => t.id === id);

            if (index === -1) {
                return res.status(404).json({
                    success: false,
                    error: "Tâche non trouvée",
                });
            }

            const { name, priority, done } = req.body;
            todos[index] = new Todo(id, name, priority, done);

            res.json({
                success: true,
                data: todos[index],
                message: "Tâche remplacée avec succès",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                error: "Erreur lors du remplacement de la tâche",
                message: error.message,
            });
        }
    };

    updateTodo = (req, res) => {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    error: "ID invalide",
                    message: "L'ID doit être un nombre entier",
                });
            }

            const todo = todos.find((t) => t.id === id);

            if (!todo) {
                return res.status(404).json({
                    success: false,
                    error: "Tâche non trouvée",
                });
            }

            const { name, priority, done } = req.body;
            todo.update({ name, priority, done });

            res.json({
                success: true,
                data: todo,
                message: "Tâche modifiée avec succès",
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                error: "Erreur lors de la modification de la tâche",
                message: error.message,
            });
        }
    };

    deleteTodo = (req, res) => {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    error: "ID invalide",
                    message: "L'ID doit être un nombre entier",
                });
            }

            const index = todos.findIndex((t) => t.id === id);

            if (index === -1) {
                return res.status(404).json({
                    success: false,
                    error: "Tâche non trouvée",
                });
            }

            todos.splice(index, 1);

            res.json({
                success: true,
                message: "Tâche supprimée avec succès",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                error: "Erreur lors de la suppression de la tâche",
                message: error.message,
            });
        }
    };
}

export default TodoController;