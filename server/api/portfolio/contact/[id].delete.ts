import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);
  
  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID should be a number"
    });
  }

  try {
    // اول بررسی می‌کنیم که پیام وجود دارد یا نه
    const existingContact = await prisma.contact.findUnique({
      where: { id }
    });

    if (!existingContact) {
      throw createError({
        statusCode: 404,
        statusMessage: "Contact message not found"
      });
    }

    // حذف پیام
    await prisma.contact.delete({
      where: { id }
    });

    return { success: true };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Could not delete message"
    });
  }
});