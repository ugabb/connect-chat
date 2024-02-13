import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

interface IParams {
    conversationId: string;
  }

export async function POST(request: Request,{ params }: { params: IParams }) {
  try {
    // Obtém o usuário atual
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    // Verifica se o usuário atual está autenticado
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Obtém o corpo da requisição como JSON
    const body = await request.json();

    // Extrai informações do corpo da requisição
    const { userId: senderId } = body;

    // Obtém o pedido de amizade
    const existingGroupRequest = await prisma.groupInviteRequest.findFirst({
      where: {
        senderId,
        recipientId: currentUser.id,
        conversationId
      },
    });

    // Verifica se o pedido de amizade existe
    if (!existingGroupRequest) {
      return new NextResponse("Friend request not found", { status: 404 });
    }

    await prisma.groupInviteRequest.update({
      where: {
        id: existingGroupRequest.id,
      },
      data: {
        status: "rejected",
      },
    });

    // Retorna uma resposta de sucesso
    return new NextResponse("Friend request rejected successfully", {
      status: 200,
    });
  } catch (error) {
    // Captura e trata erros, se houver algum
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
