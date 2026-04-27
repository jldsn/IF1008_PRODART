/**
 * CONFIGURAÇÃO DO NEXT.JS — PRODARTE BACKOFFICE
 *
 * Documentação completa: https://nextjs.org/docs/app/api-reference/next-config-js
 */

import type { NextConfig } from 'next'

const config: NextConfig = {
  /*
   * Modo estrito do React — ativa verificações adicionais em desenvolvimento,
   * como detecção de efeitos colaterais inesperados e uso de APIs depreciadas.
   * Não tem impacto no build de produção.
   */
  reactStrictMode: true,

  /*
   * rewrites: redireciona chamadas /api/* no frontend para a API Fastify,
   * evitando problemas de CORS em desenvolvimento. Em produção, o proxy
   * deve ser configurado no servidor web (nginx, Caddy, etc.).
   */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:3001'}/api/:path*`,
      },
    ]
  },
}

export default config
