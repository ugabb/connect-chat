import { useParams } from "next/navigation";
import { useMemo } from "react";


const useConversation = () => {
  // Obtendo os parâmetros da URL usando o hook useParams do Next.js
  const params = useParams();

  // Utilizando useMemo para memorizar o valor de conversationId
  const conversationId = useMemo(() => {
    // Verificando se não há um parâmetro conversationId na URL
    if (!params?.conversationId) {
      return "";
    }

    // Retornando o valor do parâmetro conversationId como uma string
    return params.conversationId as string;
  }, [params?.conversationId]);

  // Utilizando useMemo para determinar se a conversa está aberta com base no conversationId
  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  // Retornando um objeto com informações sobre a conversa, utilizando useMemo para memoizar o resultado
  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId]
  );
};

export default useConversation;
