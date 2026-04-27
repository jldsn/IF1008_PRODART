/**
 * Queries Prisma para a entidade Curadoria.
 *
 * Queries previstas:
 *   - registrarCuradoria(dados) → RF04/RF05 (cria registro e atualiza statusCuradoria no Artesao)
 *
 * Importante: registrar uma curadoria é uma operação de duas etapas que
 * deve ser feita em uma transação Prisma para garantir consistência:
 *   1. Criar o registro em Curadoria (histórico da avaliação)
 *   2. Atualizar Artesao.statusCuradoria com o novo status
 *
 * TODO: implementar usando db.$transaction([...]) de cliente.ts
 */
