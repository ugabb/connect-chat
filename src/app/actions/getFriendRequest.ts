import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getFriendRequest = async (userId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) {
      return null;
    }

    const friendRequets = await prisma.friendRequest.findMany({
      where: {
        recipientId: userId,
      },
      include: {
        sender: true,
      },
    });

    return friendRequets;
  } catch (error) {
    return null;
  }
};
export default getFriendRequest;
