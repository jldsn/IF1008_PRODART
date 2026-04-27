/**
 * FÁBRICA DO SERVIDOR FASTIFY — PRODARTE
 *
 * `criarApp` é uma função assíncrona que constrói e configura a instância
 * completa do Fastify antes de qualquer requisição ser recebida. A separação
 * entre criação (aqui) e inicialização (index.ts) permite:
 *
 *   - Testar rotas sem abrir porta de rede (inject do Fastify)
 *   - Reinicializar a app em testes sem efeitos colaterais
 *
 * Ordem de registro importante:
 *   1. Plugins de infraestrutura (CORS, JWT, Swagger) — devem estar disponíveis
 *      para todas as rotas que vierem depois.
 *   2. Rotas — registradas após os plugins para que decorators como
 *      `fastify.authenticate` já existam.
 */

import Fastify, { type FastifyInstance } from 'fastify'

// Plugins internos (serão criados em src/plugins/)
import { pluginCors } from './plugins/cors.js'
import { pluginJwt } from './plugins/jwt.js'
import { pluginSwagger } from './plugins/swagger.js'

// Rotas (serão criadas em src/rotas/)
import { rotasAuth } from './rotas/auth.js'
import { rotasArtesaos } from './rotas/artesaos.js'
import { rotasFeiras } from './rotas/feiras.js'
import { rotasCuradoria } from './rotas/curadoria.js'
import { rotasMensagens } from './rotas/mensagens.js'

export async function criarApp(): Promise<FastifyInstance> {
  const app = Fastify({
    // Logger estruturado em JSON — facilita parsing em ferramentas como Datadog.
    // Em desenvolvimento, o `pino-pretty` pode ser adicionado para output legível.
    logger: {
      level: process.env['NODE_ENV'] === 'production' ? 'warn' : 'info',
    },
  })

  // ── 1. Plugins de infraestrutura ─────────────────────────────────────────
  await app.register(pluginCors)
  await app.register(pluginJwt)
  await app.register(pluginSwagger)

  // ── 2. Rotas ─────────────────────────────────────────────────────────────
  // Prefixo "/api/v1" em todas as rotas para versionamento e separação clara
  // do frontend que serve na mesma origem em produção.
  await app.register(rotasAuth, { prefix: '/api/v1/auth' })
  await app.register(rotasArtesaos, { prefix: '/api/v1/artesaos' })
  await app.register(rotasFeiras, { prefix: '/api/v1/feiras' })
  await app.register(rotasCuradoria, { prefix: '/api/v1/curadoria' })
  await app.register(rotasMensagens, { prefix: '/api/v1/mensagens' })

  // ── 3. Rota de health check ───────────────────────────────────────────────
  // Usada por balanceadores de carga e scripts de CI para verificar se a API
  // está respondendo sem autenticação.
  app.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }))

  return app
}
