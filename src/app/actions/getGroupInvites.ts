import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getGroupInvites = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) {
      return null;
    }

    const groupInviteRequest = await prisma.groupInviteRequest.findMany({
      where: {
        recipientId: currentUser.id,
      },
      include: {
        sender: {
          select:{
            id:true,
            name:true,
            email: true,
            image: true,
            
          }
        },
        conversation:{
          select:{
            id: true,
            name: true,
            description: true,
          }
        }
      },
    });

    return groupInviteRequest;
  } catch (error) {
    return null;
  }
};
export default getGroupInvites;
