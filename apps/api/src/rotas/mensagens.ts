/**
 * Rotas de mensagens — disparo manual de WhatsApp (individual e em massa).
 * Referência: RF06 (massa), RF07 (individual), US04.
 *
 * Endpoints previstos:
 *   POST /api/v1/mensagens/massa      → envia mesma mensagem para lista de artesãos
 *     Body: { artesaoIds: string[], conteudo: string }
 *   POST /api/v1/mensagens/individual → envia mensagem para um único artesão
 *     Body: { artesaoId: string, conteudo: string }
 *
 * Todas as mensagens são registradas na tabela Mensagem independentemente
 * do resultado do envio (StatusEnvio.ENVIADO ou StatusEnvio.FALHOU).
 *
 * TODO: implementar handlers e integração com a API WhatsApp Business
 */

import type { FastifyInstance } from 'fastify'

export async function rotasMensagens(_app: FastifyInstance): Promise<void> {
  // TODO: implementar rotas de mensageria
}
