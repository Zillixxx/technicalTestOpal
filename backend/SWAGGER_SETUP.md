# 📚 Configuration Swagger/OpenAPI Documentation

## 🚀 Installation des dépendances

### Étape 1: Installer les packages npm
```bash
cd backend
npm install swagger-jsdoc swagger-ui-express
```

### Étape 2: Vérifier que les fichiers sont en place
- ✅ `swagger.js` - Configuration OpenAPI
- ✅ `routes/internship.js` - Routes documentées
- ✅ `app.js` - Intégration Swagger UI

## 🌐 Accéder à la documentation

Une fois le serveur démarré, vous pouvez accéder à la documentation Swagger à :

### En développement (local)
- **http://localhost:3000/api/docs**

### En production (Docker)
- **http://localhost/api/docs**

## 📝 Structure de la documentation

Le fichier `swagger.js` contient :
- **Definition OpenAPI 3.0.0** : Spécification standard
- **Servers** : URLs de dev et production
- **Components/Schemas** : Modèles de données (Internship, CreateInternship, UpdateInternship)
- **Routes** : Commentaires JSDoc dans `routes/internship.js`

## 🔍 Endpoints documentés

### GET /api/internship
Récupère toutes les demandes de stage

### GET /api/internship/:id
Récupère une demande par ID

### POST /api/internship
Crée une nouvelle demande
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean@example.com",
  "service": "IT",
  "dateDebut": "2025-11-01T00:00:00Z",
  "dateFin": "2025-11-30T00:00:00Z",
  "motivation": "Je suis intéressé..."
}
```

### PATCH /api/internship/:id
Met à jour une demande (change de statut, par ex.)
```json
{
  "status": "APPROVED"
}
```

### DELETE /api/internship/:id
Supprime une demande

## 🛠️ Comment tester les endpoints

1. Ouvrir **http://localhost:3000/api/docs** dans le navigateur
2. Cliquer sur un endpoint
3. Cliquer sur **"Try it out"**
4. Remplir les paramètres/body
5. Cliquer sur **"Execute"**

## 📤 Exporter la documentation

Swagger UI permet d'exporter la spec OpenAPI en JSON :
- **http://localhost:3000/api-docs** (JSON spec)

## 🔧 Ajouter de nouveaux endpoints

1. Créer la route dans `routes/internship.js`
2. Ajouter le commentaire JSDoc avant la route :
```javascript
/**
 * @swagger
 * /api/internship/new:
 *   post:
 *     summary: Description de l'endpoint
 *     tags:
 *       - Internships
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateInternship'
 *     responses:
 *       201:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Internship'
 */
router.post('/new', async (req, res) => {
  // Votre code...
});
```

## ✅ Commandes pour démarrer

### Développement local
```bash
cd backend
npm install
npm run dev
# Ouvrir http://localhost:3000/api/docs
```

### Docker
```bash
docker compose up --build
# Ouvrir http://localhost/api/docs
```

## 🐛 Troubleshooting

### Swagger UI ne s'affiche pas
- Vérifier que `app.js` contient : `app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));`
- Vérifier que `swagger.js` existe et est importé
- Redémarrer le serveur

### Routes manquent de la documentation
- S'assurer que les commentaires JSDoc commencent par `@swagger`
- Vérifier le chemin dans `swagger.js` : `apis: ['./routes/*.js']`
- Redémarrer le serveur

### Erreur : "Cannot find module 'swagger-jsdoc'"
```bash
npm install swagger-jsdoc swagger-ui-express
```
