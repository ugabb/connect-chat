import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import getCurrentUser from "./getCurrentUser";

const getUserFriends = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const userWithFriends = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
      include: {
        friends: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    // Verifica se o usuário atual tem amigos
    if (!userWithFriends?.friends) {
      return [];
    }

    return userWithFriends.friends;
  } catch (error: any) {
    console.error(error);
    return [];
  }
};

export default getUserFriends;
