const express = require('express');
const router = express.Router();
const internshipService = require('../services/internship');

router.get('/', async (req, res, next) => {
  try {
    const internships = await internshipService.getAllInternships();
    res.json(internships);
  } catch (error) {
    next(error);
  } 
});

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

router.post('/', async (req, res, next) => {
  try {
    const newInternship = await internshipService.createInternship(req.body);
    res.status(201).json(newInternship);
    } catch (error) {
    next(error);
    }
});

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