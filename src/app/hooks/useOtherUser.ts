import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

// Função que recebe uma conversa (FullConversationType ou { users: User[] }) e retorna o outro usuário na conversa
const useOtherUser = (
  conversation: FullConversationType | { users: User[] }
) => {
  // Obtendo informações sobre a sessão do usuário atual
  const session = useSession();

  // Utilizando useMemo para memoizar o cálculo do outro usuário na conversa
  const otherUser = useMemo(() => {
    // Obtendo o email do usuário atual a partir das informações de sessão
    const currentUserEmail = session.data?.user?.email;

    // Filtrando os usuários da conversa para encontrar o usuário que não é o usuário atual
    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );

    // Retornando o primeiro (e único) usuário que não é o usuário atual na conversa
    return otherUser[0];
  }, [session.data?.user?.email, conversation.users]);

  // Retornando o outro usuário na conversa
  return otherUser;
};

export default useOtherUser;
