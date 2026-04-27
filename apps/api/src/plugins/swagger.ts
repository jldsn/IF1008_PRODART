/**
 * Plugin Swagger — documentação interativa da API disponível em /docs.
 * Útil para a equipe frontend consultar contratos de rotas sem precisar
 * ler o código da API diretamente.
 * TODO: implementar com @fastify/swagger e @fastify/swagger-ui.
 */

import type { FastifyInstance } from 'fastify'

export async function pluginSwagger(_app: FastifyInstance): Promise<void> {
  // TODO: registrar @fastify/swagger com metadados do projeto e @fastify/swagger-ui
}
