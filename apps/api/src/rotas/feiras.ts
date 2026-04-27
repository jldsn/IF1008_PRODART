/**
 * Rotas de feiras — cadastro, listagem e alocação de artesãos.
 * Referência: RF08 (cadastrar feira), RF09 (alocar artesão), RF10 (notificar).
 *
 * Endpoints previstos:
 *   GET    /api/v1/feiras           → lista todas as feiras
 *   POST   /api/v1/feiras           → cria nova feira (valida data futura e vagas > 0)
 *   GET    /api/v1/feiras/:id       → detalhe da feira com artesãos alocados
 *   POST   /api/v1/feiras/:id/alocar         → vincula artesão à feira e abate vaga
 *   POST   /api/v1/feiras/:id/notificar      → dispara convocação via WhatsApp (RF10)
 *
 * TODO: implementar handlers com validação Zod e consultas em db/feiras.ts
 */

import type { FastifyInstance } from 'fastify'

export async function rotasFeiras(_app: FastifyInstance): Promise<void> {
  // TODO: implementar rotas de feiras e alocações
}
