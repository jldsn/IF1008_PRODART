/**
 * Queries Prisma para a entidade Artesão.
 *
 * Cada função representa uma operação de banco de dados isolada.
 * As rotas em src/rotas/artesaos.ts chamam estas funções diretamente —
 * sem camada de serviço intermediária.
 *
 * Queries previstas:
 *   - listarArtesaos(filtros)   → RF01, RF02 (listagem e filtragem)
 *   - buscarArtesaoPorId(id)    → RF03 (visualização completa)
 *   - listarPorInatividade()    → RF12 (rodízio por tempo sem participação)
 *
 * TODO: implementar todas as queries usando o cliente `db` de cliente.ts
 */
