/**
 * Rotas de curadoria — registro de aprovação, análise ou rejeição de inscrições.
 * Referência: RF04 (aprovação), RF05 (rejeição com justificativa), US03.
 *
 * Endpoints previstos:
 *   POST /api/v1/curadoria/:artesaoId → registra resultado da curadoria
 *     Body: { status: 'APROVADO' | 'EM_ANALISE' | 'REJEITADO', justificativa?: string }
 *     Regra: justificativa é obrigatória quando status = 'REJEITADO'
 *
 * TODO: implementar handler com validação Zod (regra da justificativa) e db/curadoria.ts
 */

import type { FastifyInstance } from 'fastify'

export async function rotasCuradoria(_app: FastifyInstance): Promise<void> {
  // TODO: implementar rota POST de registro de curadoria
}
