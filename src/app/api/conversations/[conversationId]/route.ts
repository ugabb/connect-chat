import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

interface IParams {
  conversationId: string;
}

export default async function DELETE(
  request: NextApiRequest,
  { params }: { params: IParams }
) {
    console.log("nao achou padrim")
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
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
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.log("ERROR_DELETE_CONVERSATION", error);
    return NextResponse.json("Internal Error", { status: 500 });
  }
}
