import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' } 
    });

    return { success: true, contacts };
  } catch (error) {
    return { error: 'Database error', details: error };
  }
});
