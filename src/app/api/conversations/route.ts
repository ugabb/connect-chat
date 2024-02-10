import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
export async function POST(request: Request) {
  try {
    // Obtém o usuário atual
    const currentUser = await getCurrentUser();

    // Obtém o corpo da requisição como JSON
    const body = await request.json();

    // Extrai informações do corpo da requisição
    const { userId, isGroup, members, name } = body;

    // Verifica se o usuário atual está autenticado
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verifica se é um grupo e se possui dados válidos - se existe membros ou se existe mais de 2 membros
    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    // Cria uma nova conversa (grupo)
    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          // Define o nome do grupo com base nos dados recebidos na requisição
          name,
          // Indica que é um grupo
          isGroup,
          // Conecta os usuários ao grupo utilizando o array de members
          users: {
            connect: [
              // Mapeia os membros do grupo para o formato de conexão do Prisma
              ...members.map((member: { userId: string }) => ({
                id: member.userId,
              })),
              // Adiciona o usuário atual à lista de usuários conectados ao grupo
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

      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, "conversation:new", newConversation);
        }
      });

      // Retorna a nova conversa como resposta
      return NextResponse.json(newConversation);
    }

    // Procura conversas existentes entre o usuário atual e o destinatário
    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    // Obtém a primeira conversa encontrada
    const singleConversation = existingConversations[0];

    // Se a conversa existir, retorna como resposta
    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    // Se não houver uma conversa existente, cria uma nova
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    newConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:new", newConversation);
      }
    });

    // Retorna a nova conversa como resposta
    return NextResponse.json(newConversation);
  } catch (error) {
    // Captura e trata erros, se houver algum
  }
}
