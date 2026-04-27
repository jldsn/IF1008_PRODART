/**
 * Rotas de autenticação — login e renovação de token dos gestores.
 * Referência: RF13 (autenticação de usuário), RNF05 (política de senhas).
 *
 * Endpoints previstos:
 *   POST /api/v1/auth/login   → recebe email + senha, retorna JWT
 *   POST /api/v1/auth/logout  → invalida sessão (client-side para JWT stateless)
 *
 * TODO: implementar handlers com validação Zod e consulta ao db/gestores.ts
 */

import type { FastifyInstance } from 'fastify'

export async function rotasAuth(_app: FastifyInstance): Promise<void> {
  // TODO: implementar rota POST /login
}
