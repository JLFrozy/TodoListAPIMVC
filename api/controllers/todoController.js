import Todo from "../models/Todo.js";
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

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
    login = async (req, res) => {
        try {
            // Récupération et validation des données
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    error: "Veuillez fournir un nom d'utilisateur et un mot de passe.",
                });
            }

            // Note : Dans un cas réel, l'appel serait plutôt de la forme `await db.getUser(...)`
            if (username === "admin" && password === "azerty123") {
                // Authentification ok : Création du token
                const token = jwt.sign(
                    { id: 0, username: username },
                    process.env.SECRET,
                    { expiresIn: "1 hour" }
                );

                // puis réponse valide
                return res.json({
                    success: true,
                    data: { token }, // On encapsule le token dans "data" pour rester cohérent
                });
            } else {
                // réponse invalide dans les autres cas
                return res.status(401).json({
                    success: false,
                    error: "Identifiants incorrects.",
                });
            }
        } catch (error) {
            // Gestion des erreurs imprévues
            res.status(500).json({
                success: false,
                error: "Erreur lors de l'authentification",
                message: error.message,
            });
        }
    };

    verifyToken = (req, res, next) => {
        // Récupérer le token dans le header (forme 'Authorization: Bearer <token>')
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Accès refusé. Token manquant." });
        }

        // Vérification de la validité du token
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Token invalide ou expiré." });
            }
            req.user = user; // On attache l'utilisateur à la requête pour la suite
            next(); // On passe au contrôleur suivant (ex: afficher les todos)
        });
    };
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