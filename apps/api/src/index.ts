/**
 * PONTO DE ENTRADA DA API — PRODARTE
 *
 * Este arquivo é responsável exclusivamente por:
 *   1. Ler as variáveis de ambiente necessárias para a inicialização
 *   2. Criar a instância do servidor via `criarApp()` (definida em app.ts)
 *   3. Iniciar o servidor na porta configurada
 *
 * Toda a configuração de plugins e rotas fica em `app.ts`, mantendo
 * este arquivo o mais simples possível — facilita testes de integração,
 * pois `criarApp()` pode ser chamado sem `listen()`.
 */

import { criarApp } from './app.js'

// Porta padrão 3001 para evitar conflito com o Next.js, que usa 3000.
const PORTA = Number(process.env['PORT']) || 3001
const HOST = process.env['NODE_ENV'] === 'production' ? '0.0.0.0' : '127.0.0.1'

async function iniciar(): Promise<void> {
  const app = await criarApp()

  try {
    await app.listen({ port: PORTA, host: HOST })
    console.log(`[api] servidor rodando em http://${HOST}:${PORTA}`)
    console.log(`[api] documentação Swagger disponível em http://${HOST}:${PORTA}/docs`)
  } catch (erro) {
    app.log.error(erro)
    process.exit(1)
  }
}

iniciar()
