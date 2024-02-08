/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
  /** Configuração Experimental com SWC:
 * 
 * Utiliza a funcionalidade experimental do Next.js para incorporar plugins SWC durante a compilação.
 * Aqui, adicionamos o plugin 'next-superjson-plugin' para otimizar operações JSON.
 * O objeto vazio '{}' indica a utilização da configuração padrão para o 'next-superjson-plugin'.
 */
  experimental: {
    // swcPlugins: [
    //   ["next-superjson-plugin", {}]
    // ]
  }
};

export default nextConfig;
