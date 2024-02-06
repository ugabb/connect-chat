// Importando a função fetchRedis para interagir com o serviço Redis
import { fetchRedis } from "@/app/helpers/redis";

// Importando as opções de autenticação e validador de esquema
import { authOptions } from "@/lib/auth";
import { addFriendValidator } from "@/lib/validations/add-friend";

// Importando o cliente Redis e outras utilidades do Next.js
import { redisDB } from "@/lib/db";
import { getServerSession } from "next-auth";

// Importando o validador de esquema zod para lidar com a validação de dados
import { z } from "zod";

// Função assíncrona que lida com requisições HTTP do tipo POST
export async function POST(req: Request) {
  try {
    // Obtendo o corpo da requisição como um objeto JSON
    const body = await req.json();

    // Validando e extraindo o email do corpo da requisição usando o validador addFriendValidator
    const { email: friendEmail } = addFriendValidator.parse(body.email);

    // Obtendo o ID do amigo a partir do serviço Redis usando o email
    const friendId = (await fetchRedis(
      "get",
      `user:email:${friendEmail}`
    )) as string;

    // Verificando se o amigo existe no sistema
    if (!friendId) {
      return new Response("Essa pessoa não existe.", { status: 400 });
    }

    // Obtendo a sessão do usuário autenticado
    const session = await getServerSession(authOptions);

    // Verificando se há uma sessão autenticada
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Verificando se o usuário está tentando adicionar a si mesmo como amigo
    if (friendId === session?.user?.id) {
      return new Response("Você não pode adicionar você mesmo!", {
        status: 400,
      });
    }

    // Verificando se o usuário já é amigo da pessoa
    const isAlreadyFriends = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      friendId
    )) as 0 | 1;

    // Se já são amigos, retornando uma resposta com status 400 (Bad Request)
    if (isAlreadyFriends) {
      return new Response("Você já é amigo dessa pessoa", { status: 400 });
    }

    // Adicionando a solicitação de amizade pendente no Redis
    await redisDB.sadd(
      `user:${friendId}:incoming_friend_requests`,
      session.user.id
    );

    // Retornando uma resposta de sucesso
    return new Response("OK");
  } catch (error) {
    // Tratando erros durante o processamento da requisição
    if (error instanceof z.ZodError) {
      // Se houver um erro de validação de esquema, retornar uma resposta com status 422 (Unprocessable Entity)
      return new Response("Invalid request payload", { status: 422 });
    }

    // Se ocorrer um erro não relacionado à validação do esquema, retornar uma resposta com status 400 (Bad Request)
    return new Response("Invalid request", { status: 400 });
  }
}
