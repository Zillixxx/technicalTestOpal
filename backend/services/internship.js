const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function toInt(id) {
  const n = Number(id);
  return Number.isNaN(n) ? null : Math.floor(n);
}

/**
 * Récupère tous les internships
 */
async function getAllInternships() {
  return prisma.internship.findMany({ orderBy: { id: 'asc' } });
}

/**
 * Récupère un internship par id (string ou number)
 */
async function getInternshipById(id) {
  const nid = toInt(id);
  if (nid === null) return null;
  return prisma.internship.findUnique({ where: { id: nid } });
}

/**
 * Crée un nouvel internship. body peut contenir les champs souhaités.
 */
async function createInternship(body) {
  const data = {
    nom: body.nom,
    prenom: body.prenom,
    email: body.email,
    service: body.service,
    dateDebut: body.dateDebut ? new Date(body.dateDebut) : undefined,
    dateFin: body.dateFin ? new Date(body.dateFin) : undefined,
    motivation: body.motivation ?? null,
    status: body.status ?? undefined,
  };
  return prisma.internship.create({ data });
}

/**
 * Met à jour un internship partiellement.
 * Retourne l'objet mis à jour ou null si non trouvé.
 */
async function updateInternship(id, partial) {
  const nid = toInt(id);
  if (nid === null) return null;

  // Vérifie si le stage existe
  const exists = await prisma.internship.findUnique({ where: { id: nid } });
  if (!exists) return null;

  // Préparer les données à mettre à jour
  const data = {};
  if (partial.nom !== undefined) data.nom = partial.nom;
  if (partial.prenom !== undefined) data.prenom = partial.prenom;
  if (partial.email !== undefined) data.email = partial.email;
  if (partial.service !== undefined) data.service = partial.service;
  if (partial.dateDebut !== undefined) data.dateDebut = partial.dateDebut ? new Date(partial.dateDebut) : null;
  if (partial.dateFin !== undefined) data.dateFin = partial.dateFin ? new Date(partial.dateFin) : null;
  if (partial.motivation !== undefined) data.motivation = partial.motivation;
  if (partial.status !== undefined) data.status = partial.status;

  return prisma.internship.update({ where: { id: nid }, data });
}

/**
 * Supprime un internship. Retourne true si supprimé, false sinon.
 */
async function deleteInternship(id) {
  const nid = toInt(id);
  if (nid === null) return false;
  const exists = await prisma.internship.findUnique({ where: { id: nid } });
  if (!exists) return false;
  await prisma.internship.delete({ where: { id: nid } });
  return true;
}

module.exports = {
  getAllInternships,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship
};