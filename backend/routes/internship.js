const express = require('express');
const router = express.Router();
const internshipService = require('../services/internship');

/**
 * @swagger
 * /api/internship:
 *   get:
 *     summary: Récupère toutes les demandes de stage
 *     tags:
 *       - Internships
 *     responses:
 *       200:
 *         description: Liste de toutes les demandes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Internship'
 *       500:
 *         description: Erreur serveur
 */
router.get('/', async (req, res, next) => {
  try {
    const internships = await internshipService.getAllInternships();
    res.json(internships);
  } catch (error) {
    next(error);
  } 
});

/**
 * @swagger
 * /api/internship/{id}:
 *   get:
 *     summary: Récupère une demande de stage par ID
 *     tags:
 *       - Internships
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la demande
 *     responses:
 *       200:
 *         description: Demande trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Internship'
 *       404:
 *         description: Demande non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', async (req, res, next) => {
  try {
    const internship = await internshipService.getInternshipById(req.params.id);    
    if (internship) {
      res.json(internship);
    } else {
      res.status(404).json({ message: 'Internship not found' });
    }
    } catch (error) {
    next(error);
    }
});

/**
 * @swagger
 * /api/internship:
 *   post:
 *     summary: Crée une nouvelle demande de stage
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
 *         description: Demande créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Internship'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post('/', async (req, res, next) => {
  try {
    const newInternship = await internshipService.createInternship(req.body);
    res.status(201).json(newInternship);
    } catch (error) {
    next(error);
    }
});

/**
 * @swagger
 * /api/internship/{id}:
 *   patch:
 *     summary: Met à jour une demande de stage
 *     tags:
 *       - Internships
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la demande
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateInternship'
 *     responses:
 *       200:
 *         description: Demande mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Internship'
 *       404:
 *         description: Demande non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const updatedInternship = await internshipService.updateInternship(req.params.id, req.body);
    if (updatedInternship) {
      res.json(updatedInternship);
    }
    else {
      res.status(404).json({ message: 'Internship not found' });
    }
    } catch (error) {
    next(error);
    }
});

/**
 * @swagger
 * /api/internship/{id}:
 *   delete:
 *     summary: Supprime une demande de stage
 *     tags:
 *       - Internships
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la demande
 *     responses:
 *       204:
 *         description: Demande supprimée avec succès
 *       404:
 *         description: Demande non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await internshipService.deleteInternship(req.params.id);
    if (deleted) {
      res.status(204).end();
    }
    else {
      res.status(404).json({ message: 'Internship not found' });
    }
    } catch (error) {
    next(error);
    }
});


module.exports = router;