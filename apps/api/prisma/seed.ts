/**
 * SEED DO BANCO DE DADOS — PRODARTE
 *
 * Popula o banco com dados iniciais para desenvolvimento e testes.
 * Execute com: npm run db:seed (dentro de apps/api)
 *
 * O seed cria:
 *   - Um gestor padrão para acesso inicial ao backoffice
 *   - Artesãos de exemplo com diferentes segmentos e status
 *   - Uma feira de exemplo para testar o fluxo de alocação
 *
 * ATENÇÃO: nunca execute o seed em produção com dados fictícios.
 * Use variáveis de ambiente para controlar isso se necessário.
 *
 * TODO: implementar os dados de seed após finalizar o schema
 */

async function seed(): Promise<void> {
  console.log('[seed] TODO: implementar dados iniciais')
}

seed()
  .catch(console.error)
