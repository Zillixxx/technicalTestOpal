const { PrismaClient } = require('./generated/prisma/client');
const prisma = new PrismaClient();

async function main() {
  const internships = await prisma.internship.createMany({
    data: [
      {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        service: 'IT',
        dateDebut: new Date('2025-11-01'),
        dateFin: new Date('2025-11-30'),
        motivation: 'Stage d’observation en informatique',
        status: 'pending',
      },
      {
        nom: 'Martin',
        prenom: 'Sophie',
        email: 'sophie.martin@example.com',
        service: 'Marketing',
        dateDebut: new Date('2025-12-01'),
        dateFin: new Date('2025-12-20'),
        motivation: 'Découvrir le marketing digital',
        status: 'pending',
      },
      {
        nom: 'Bernard',
        prenom: 'Lucas',
        email: 'lucas.bernard@example.com',
        service: 'Finance',
        dateDebut: new Date('2025-10-15'),
        dateFin: new Date('2025-11-15'),
        motivation: 'Stage pratique en analyse financière',
        status: 'pending',
      },
    ],
  });

  console.log(`Inserted ${internships.count} internships`);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
