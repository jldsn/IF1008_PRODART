/**
 * Plugin CORS — controle de origens permitidas para requisições à API.
 * Referência: segurança entre o backoffice (Next.js) e a API (Fastify).
 * TODO: implementar com @fastify/cors, separando origens de dev e produção.
 */

import type { FastifyInstance } from 'fastify'

export async function pluginCors(_app: FastifyInstance): Promise<void> {
  // TODO: registrar @fastify/cors com origens configuradas por NODE_ENV
}
