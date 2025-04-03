/*
File: prisma.ts
Description: This creates a Prisma Client Instance and exports it.
Needed for development to prevent multiple instances of Prisma Client.
*/

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
