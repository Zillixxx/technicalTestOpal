/**
 * Configuration Swagger/OpenAPI complète
 */
module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Internship Management API',
      version: '1.0.0',
      description: 'API pour gérer les demandes de stage',
      contact: {
        name: 'Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development Server',
      },
      {
        url: 'http://localhost/api',
        description: 'Production (Docker via Nginx)',
      },
    ],
    components: {
      schemas: {
        Internship: {
          type: 'object',
          required: ['id', 'nom', 'prenom', 'email', 'service', 'dateDebut', 'dateFin', 'status', 'createdAt'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID unique de la demande',
              example: 1,
            },
            nom: {
              type: 'string',
              description: 'Nom de famille du candidat',
              example: 'Dupont',
            },
            prenom: {
              type: 'string',
              description: 'Prénom du candidat',
              example: 'Jean',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email du candidat',
              example: 'jean.dupont@example.com',
            },
            service: {
              type: 'string',
              description: 'Service demandé',
              example: 'IT',
            },
            dateDebut: {
              type: 'string',
              format: 'date-time',
              description: 'Date de début du stage',
              example: '2025-11-01T00:00:00Z',
            },
            dateFin: {
              type: 'string',
              format: 'date-time',
              description: 'Date de fin du stage',
              example: '2025-11-30T00:00:00Z',
            },
            motivation: {
              type: 'string',
              nullable: true,
              description: 'Lettre de motivation',
              example: 'Je suis intéressé par ce stage...',
            },
            status: {
              type: 'string',
              enum: ['PENDING', 'APPROVED', 'REJECTED'],
              description: 'Statut de la demande',
              example: 'PENDING',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date de création',
              example: '2025-10-30T10:00:00Z',
            },
          },
        },
        CreateInternship: {
          type: 'object',
          required: ['nom', 'prenom', 'email', 'service', 'dateDebut', 'dateFin'],
          properties: {
            nom: {
              type: 'string',
              description: 'Nom de famille du candidat',
              example: 'Dupont',
            },
            prenom: {
              type: 'string',
              description: 'Prénom du candidat',
              example: 'Jean',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email du candidat',
              example: 'jean.dupont@example.com',
            },
            service: {
              type: 'string',
              description: 'Service demandé',
              example: 'IT',
            },
            dateDebut: {
              type: 'string',
              format: 'date-time',
              description: 'Date de début du stage (format ISO 8601)',
              example: '2025-11-01T00:00:00Z',
            },
            dateFin: {
              type: 'string',
              format: 'date-time',
              description: 'Date de fin du stage (format ISO 8601)',
              example: '2025-11-30T00:00:00Z',
            },
            motivation: {
              type: 'string',
              nullable: true,
              description: 'Lettre de motivation (optionnel)',
              example: 'Je suis intéressé par ce stage...',
            },
          },
        },
        UpdateInternship: {
          type: 'object',
          properties: {
            nom: {
              type: 'string',
              description: 'Nom de famille',
              example: 'Dupont',
            },
            prenom: {
              type: 'string',
              description: 'Prénom',
              example: 'Jean',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email',
              example: 'jean.dupont@example.com',
            },
            service: {
              type: 'string',
              description: 'Service',
              example: 'IT',
            },
            dateDebut: {
              type: 'string',
              format: 'date-time',
              description: 'Date de début',
              example: '2025-11-01T00:00:00Z',
            },
            dateFin: {
              type: 'string',
              format: 'date-time',
              description: 'Date de fin',
              example: '2025-11-30T00:00:00Z',
            },
            motivation: {
              type: 'string',
              nullable: true,
              description: 'Motivation',
              example: 'Je suis intéressé par ce stage...',
            },
            status: {
              type: 'string',
              enum: ['PENDING', 'APPROVED', 'REJECTED'],
              description: 'Statut',
              example: 'APPROVED',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Message d\'erreur',
              example: 'Internship not found',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};
