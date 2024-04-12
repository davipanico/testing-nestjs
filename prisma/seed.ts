import { PrismaClient } from '@prisma/client';

// initialize the Prisma Client
const prisma = new PrismaClient();

async function main() {
  const game1 = await prisma.game.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'test',
    },
  });

  const game2 = await prisma.game.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'test 2',
    },
  });

  console.log({ game1, game2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });