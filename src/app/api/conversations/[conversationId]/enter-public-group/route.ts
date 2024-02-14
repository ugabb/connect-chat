import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import prisma from "@/lib/prismadb";

interface IParams {
  conversationId: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    // Obtém informações do usuário atual
    const currentUser = await getCurrentUser();
    const { conversationId } = params;
    console.log(conversationId)

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

    return NextResponse.json(updatedGroup);
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
