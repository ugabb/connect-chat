// Obtendo as variáveis de ambiente UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN
const upstashRedisRestURL = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// Definindo um tipo Command, que representa os possíveis comandos Redis suportados
type Command = "zrange" | "sismember" | "get" | "smembers";

// Definindo uma função assíncrona chamada fetchRedis que recebe um comando e argumentos
export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  // Construindo a URL do comando no serviço Redis utilizando a variável de ambiente
  const commandUrl = `${upstashRedisRestURL}/${command}/${args.join("/")}`;

  // Enviando uma requisição HTTP para o serviço Redis utilizando a API fetch
  const response = await fetch(commandUrl, {
    // Incluindo o token de autorização nos cabeçalhos da requisição
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    // Desativando o cache para garantir que os dados sejam sempre buscados do servidor
    cache: "no-store",
  });

  // Verificando se a resposta da requisição deu errado
  if (!response.ok) {
    // Lançando uma exceção em caso de erro na resposta
    throw new Error(
      `Erro ao executar o comando do Redis: ${response.statusText}`
    );
  }

  // Convertendo a resposta JSON da requisição para obter o resultado do comando
  const data = await response.json();

  // Retornando o resultado do comando
  return data.result;
}
