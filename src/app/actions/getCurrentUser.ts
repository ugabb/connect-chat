import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { User } from "@prisma/client";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      }
    });

    if (!currentUser) {
      return null;
    }

    return currentUser as User;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;