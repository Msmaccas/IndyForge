import { PrismaClient } from '@prisma/client';

// Instantiate a single Prisma client for the whole application
// See https://www.prisma.io/docs/guides/faq/architectural#why-shouldn%27t-you-create-a-new-prismaclient-for-each-request for guidance
export const prisma = new PrismaClient();

// Optional: gracefully shutdown Prisma on process exit
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
});