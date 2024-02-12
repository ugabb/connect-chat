import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    // Obtém o usuário atual
    const currentUser = await getCurrentUser();

    // Verifica se o usuário atual está autenticado
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Obtém o corpo da requisição como JSON
    const body = await request.json();

    // Extrai informações do corpo da requisição
    const { userId } = body;

    // Obtém o pedido de amizade
    const existingFriendRequest = await prisma.friendRequest.findFirst({
      where: {
        senderId: userId,
        recipientId: currentUser.id,
      },
    });

    // Verifica se o pedido de amizade existe
    if (!existingFriendRequest) {
      return new NextResponse("Friend request not found", { status: 404 });
    }

    await prisma.friendRequest.update({
      where: {
        id: existingFriendRequest.id,
      },
      data: {
        status: "accepted",
      },
    });


    // Adiciona o sender à lista de amigos do recipient (usuário atual)
    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        friends: {
          connect: [
            {
              id: existingFriendRequest.senderId,
            },
          ],
        },
      },
    });

    // Adiciona o recipient ao sender à lista de amigos
    await prisma.user.update({
      where: {
        id: existingFriendRequest.senderId,
      },
      data: {
        friends: {
          connect: [
            {
              id: currentUser.id,
            },
          ],
        },
      },
    });

    // Retorna uma resposta de sucesso
    return new NextResponse("Friend request accepted successfully", {
      status: 200,
    });
  } catch (error) {
    // Captura e trata erros, se houver algum
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
