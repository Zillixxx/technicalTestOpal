# technicalTestOpal Verhoest Arthur

## 🚀 Lancer l'application

1) Copier `.env.example` en `.env`
2) Remplir l'adresse de sa base de données
3) `docker compose up --build`
4) Prier 🙏


OU 

0) Copier `.env.example` en `.env`
0) Remplir l'adresse de sa base de données
1) cd frontend
2) npm run dev
3) cd ..
4) cd backend
5) npx prisma dev
6) npm run start

---


## 🛠️ Choix techniques

### **Frontend (React + Vite)**
- **React 19** : UI réactive, composants réutilisables
- **Vite** : Build rapide et HMR en développement
- **React Router** : Navigation SPA fluide (pages détail)
- **Ant Design** : Composants UI professionnels (Forms, Tables, Modals)

### **Backend (Node.js + Express)**
- **Express** : Framework minimaliste et éprouvé
- **Prisma** : ORM type-safe, migrations auto, intuitive
- **PostgreSQL** : DB relationnelle robuste pour ce use-case
- **CORS** : Autorise les requêtes du frontend

### **Infrastructure (Docker)**
- **Docker Compose** : Orchestration simple (DB + Backend + Frontend)
- **Nginx** : Reverse proxy + serveur statique frontend
- **Multistage Dockerfile** : Images optimisées et légères
- **Health checks** : Attendre la DB avant démarrer les services

### **Architecture**
- **API REST** : Endpoints simples et CRUD intuitifs
- **Validation Zod** : Type-safety au runtime
- **État local + API** : Recharger après création (UX directe)
- **Séparation des concerns** : Services, routes, composants

---

## 📋 Features

✅ Formulaire création demande de stage
✅ Liste avec filtres (statut, service)
✅ Page détail avec actions (accepter/refuser)
✅ Validation côté client et serveur
✅ Dockerisé avec base de données


Difficulté : 

bug sur prisma et la migration de prisma car je n'avais pas la bonne architecture de base.


