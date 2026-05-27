import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // In production we reuse the same client across invocations
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
} else {
  // In development we ensure a new client for hot reloading
  prisma = new PrismaClient();
}

export default prisma;
