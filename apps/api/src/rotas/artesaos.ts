/**
 * Rotas de artesãos — listagem, filtragem e visualização de cadastros.
 * Referência: RF01 (listar inscrições), RF02 (filtrar), RF03 (visualizar cadastro).
 *
 * Endpoints previstos:
 *   GET  /api/v1/artesaos          → lista com filtros (segmento, produto, status)
 *   GET  /api/v1/artesaos/:id      → cadastro completo com documentos e histórico
 *   GET  /api/v1/artesaos/rodizio  → lista ordenada por tempo de inatividade (RF12)
 *
 * TODO: implementar handlers com validação Zod e consultas em db/artesaos.ts
 */

import type { FastifyInstance } from 'fastify'

export async function rotasArtesaos(_app: FastifyInstance): Promise<void> {
  // TODO: implementar rotas GET de listagem e detalhe
}
