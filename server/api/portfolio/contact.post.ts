// server/api/portfolio/contact.post.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  try {
    const contact = await prisma.contact.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
      },
    });
    return { success: true, contact };
  } catch (error) {
    return { error: 'Database error', details: error };
  }
});
