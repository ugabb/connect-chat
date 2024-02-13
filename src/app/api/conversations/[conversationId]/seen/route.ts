import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";

interface IParams {
  conversationId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    // Obtém informações do usuário atual
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    // Verifica se o usuário está autenticado
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized - ERROR_MESSAGES_SEEN", {
        status: 401,
      });
    }

    // Procura pela conversa no banco de dados
    const conversation = await prisma?.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    // Verifica se a conversa existe
    if (!conversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    // Obtém a última mensagem da conversa
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if(!lastMessage){
      return new NextResponse("Without last message")
    }

    // Atualiza quem viu a última mensagem no banco de dados
    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    // pusher
    await pusherServer.trigger(currentUser.email, "conversation:update", {
      id: conversationId,
      messages: [updatedMessage],
    });

    // se usuario ja viu a mensagem, retorna
    if (lastMessage.seenIds.indexOf(currentUser.id) === -1) {
      return NextResponse.json(conversation);
    }

    // atualiza a utlima mensagem 
    await pusherServer.trigger(
      conversationId!,
      "message:update",
      updatedMessage
    );

    // Retorna a resposta em formato JSON
    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.log("ERROR_MESSAGES_SEEN", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
