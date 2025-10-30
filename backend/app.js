const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const internshipRouter = require('./routes/internship');

const app = express();

/**
 * 🔒 Configuration CORS
 * Autorise les requêtes depuis ton frontend (Vite en dev ou Nginx en prod)
 */
const allowedOrigins = [
  'http://localhost:5173', // Frontend en mode développement (Vite)
  'http://localhost',      // Frontend servi par Nginx dans Docker
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Autoriser les requêtes sans origin (comme Postman) ou depuis les origins listés
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed for this origin'));
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  })
);

/**
 * 🧩 Middlewares globaux
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 🚏 Routes principales
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/internship', internshipRouter); // <-- /api ajouté pour correspondre à Nginx

/**
 * ⚠️ 404 - Route non trouvée
 */
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
