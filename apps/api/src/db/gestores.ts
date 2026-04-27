/**
 * Queries Prisma para a entidade Gestor.
 *
 * Queries previstas:
 *   - buscarGestorPorEmail(email) → usado na rota de login para verificar credenciais
 *   - criarGestor(dados)          → criação inicial via seed ou painel de administração
 *
 * Segurança: a senha nunca é retornada nas queries de leitura — usar `select`
 * explícito do Prisma para excluir o campo `senha` das respostas.
 *
 * TODO: implementar usando o cliente `db` de cliente.ts
 */
