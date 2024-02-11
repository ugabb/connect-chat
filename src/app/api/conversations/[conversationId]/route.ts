import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}
    // utlizando o metodo POST, pois o metodo DELETE nao funciona com o app router do next
export async function POST(
  request: NextApiRequest,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    console.log("nao achou padrim",conversationId);
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const existingConversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId as string,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Conversation not found. Invalid ID", {
        status: 404,
      });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId as string,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          "conversation:remove",
          existingConversation
        );
      }
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.log("ERROR_DELETE_CONVERSATION", error);
    return NextResponse.json("Internal Error", { status: 500 });
  }
}
