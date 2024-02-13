import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

interface IBody {
  senderId?: string;
  recipientId?: string;
}

// Função assíncrona que lida com requisições HTTP do tipo POST
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    // Obtém o corpo da requisição como JSON
    const body: IBody = await request.json();

    // Extrai informações do corpo da requisição
    const { senderId, recipientId } = body;

    const existingRequest = await prisma.friendRequest.findFirst({
      where: {
        senderId,
        recipientId,
      },
    });

    if (existingRequest)
      return new NextResponse("Already sent", {
        status: 400,
        statusText: "Voce ja mandou um pedido para essa pessoa",
      });

    const friendRequest = await prisma.friendRequest.create({
      data: {
        status: "pending",
        sender: { connect: { id: senderId } },
        recipient: { connect: { id: recipientId } },
      },
      include: {
        sender: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },
      },
    });

    console.log(recipientId);

    await pusherServer.trigger(recipientId, "friendRequest:new", friendRequest);

    return NextResponse.json({ message: "Friend request sent", friendRequest });
  } catch (error) {
    // Se ocorrer um erro não relacionado à validação do esquema, retornar uma resposta com status 400 (Bad Request)
    return new NextResponse("Error", { status: 500 });
  }
}
