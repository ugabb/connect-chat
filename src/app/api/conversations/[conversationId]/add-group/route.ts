import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import prisma from "@/lib/prismadb";

interface IParams {
  conversationId: string;
}

interface Body {
  senderId: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    // Obtém informações do usuário atual
    const currentUser = await getCurrentUser();
    const { conversationId } = params;
    const body: Body = await request.json();
    const { senderId } = body;

    // Verifica se o usuário está autenticado
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized - ERROR_MESSAGES_SEEN", {
        status: 401,
      });
    }

    const updatedGroup = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    await pusherServer.trigger(currentUser.email, "groupRequest:add", updatedGroup)

    const existingGroupRequest = await prisma.groupInviteRequest.findFirst({
      where: {
        senderId: senderId,
        recipientId: currentUser.id,
        conversationId
      },
    });

    if (existingGroupRequest) {
      const accepted = await prisma.groupInviteRequest.update({
        where: {
          id: existingGroupRequest.id,
        },
        data: {
          status: "accepted",
        },
      });
      await pusherServer.trigger(currentUser.email, "groupRequest:accept", accepted)
    }


    return new NextResponse(JSON.stringify(updatedGroup), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error)
  }
}
