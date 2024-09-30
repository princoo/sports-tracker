import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const roles = [
    'USER',
    'ADMIN',
    'CEO',
    'HSO',
    'FOOTBALL_DIRECTOR',
    'TECHNITIAN',
    'COACH',
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { roleName: role },
      update: {},
      create: {
        roleName: role,
      },
    });
  }

  console.log('Roles seeded successfully.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('There was an error in seeding ---- \n ', e);
    await prisma.$disconnect();
    process.exit(1);
  });
