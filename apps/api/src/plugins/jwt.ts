/**
 * Plugin JWT — autenticação dos gestores via token Bearer.
 * Referência: RF13 (autenticação de usuário), RNF04 (acesso a dados sensíveis).
 * TODO: implementar com @fastify/jwt e decorator `fastify.authenticate`.
 */

import type { FastifyInstance } from 'fastify'

export async function pluginJwt(_app: FastifyInstance): Promise<void> {
  // TODO: registrar @fastify/jwt com JWT_SECRET e adicionar decorator de autenticação
}
