import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getPublicGroups = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const publicGroups = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      // retorna grupo publico que o usuario atual nao está
      where: {
        users: {
          none: {
            id: currentUser.id,
          },
        },

        isGroup: true,
        isPublic: true,
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return publicGroups;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};

export default getPublicGroups;
