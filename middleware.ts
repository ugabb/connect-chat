import { withAuth } from "next-auth/middleware";

// Exporta o middleware withAuth configurado
export default withAuth({
  // Configuração das páginas para redirecionamento
  pages: {
    signIn: "/login", // Redireciona para a página inicial ("/") ao tentar acessar uma rota protegida sem autenticação
  },
});

// Configuração adicional usando um objeto config
export const config = {
  // Define padrões de roteamento que esse middleware deve ser aplicado
  matcher: ["/users/:path*", "chat/:path*"],
  // Isso significa que o middleware será aplicado a rotas que começam com "/users/" ou "chat/"
};