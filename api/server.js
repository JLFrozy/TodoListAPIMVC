import express from "express";
import cors from "cors";
import todoRouter from "./routes/todoRouter.js";
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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


//

const PORT_HTTPS = 3001;
// Configuration SSL
const sslOptions = {
 key: fs.readFileSync(path.join(__dirname, 'ssl', 'private.key')),
 cert: fs.readFileSync(path.join(__dirname, 'ssl', 'certificate.crt'))
};


// ========================================
// DÉMARRAGE DU SERVEUR
// ========================================


// Serveur HTTPS (port 3001)
const httpsServer = https.createServer(sslOptions, app).listen(PORT_HTTPS, () => {
 console.log(` Serveur HTTPS démarré sur le port ${PORT_HTTPS}`);
});



app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📚 Documentation disponible sur http://localhost:${PORT}/`);
});

export default app;
