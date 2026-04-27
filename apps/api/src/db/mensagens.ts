/**
 * Queries Prisma para a entidade Mensagem.
 *
 * Queries previstas:
 *   - registrarMensagem(dados)       → persiste a mensagem antes do envio (status PENDENTE)
 *   - atualizarStatusMensagem(id, status) → atualiza para ENVIADO ou FALHOU após resposta da API
 *   - listarMensagensPorArtesao(id)  → histórico de comunicações do artesão (RF03/CA02-03)
 *
 * TODO: implementar usando o cliente `db` de cliente.ts
 */
