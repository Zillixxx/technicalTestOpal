const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function main() {
  const internship = await prisma.internship.findMany();
  console.log(internship);
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });