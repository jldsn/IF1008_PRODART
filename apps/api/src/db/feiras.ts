/**
 * Queries Prisma para as entidades Feira e Alocacao.
 *
 * Queries previstas:
 *   - listarFeiras()             → lista todas as feiras com contagem de alocações
 *   - buscarFeiraPorId(id)       → detalhe com artesãos alocados
 *   - criarFeira(dados)          → RF08 (valida data futura e vagas > 0)
 *   - alocarArtesao(feiraId, artesaoId) → RF09 (abate vaga e cria Alocacao)
 *   - cancelarAlocacao(alocacaoId)      → devolve vaga ao limiteVagas
 *
 * TODO: implementar todas as queries usando o cliente `db` de cliente.ts
 */
