import prisma from "@/lib/prismadb";
import { connect } from "http2";
import { NextResponse } from "next/server";

interface IBody {
  senderId?: string;
  recipientId?: string;
}

// Função assíncrona que lida com requisições HTTP do tipo POST
export async function POST(request: Request) {
  try {
    // Obtém o corpo da requisição como JSON
    const body: IBody = await request.json();

    // Extrai informações do corpo da requisição
    const { senderId, recipientId } = body;

    const existingRequest = await prisma.friendRequest.findFirst({
      where: {
        AND: [{ senderId }, { recipientId }],
      },
    });

    if (existingRequest)
      return new NextResponse("Already sent", { status: 400 });

    const friendRequest = await prisma.friendRequest.create({
      data: {
        status: "pending",
        sender: { connect: { id: senderId } },
        recipient: { connect: { id: recipientId } },
      },
    });

    return NextResponse.json({ message: "Friend request sent", friendRequest });
  } catch (error) {
    // Se ocorrer um erro não relacionado à validação do esquema, retornar uma resposta com status 400 (Bad Request)
    return new NextResponse("Error", { status: 500 });
  }
}
