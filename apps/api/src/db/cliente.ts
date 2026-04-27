/**
 * Instância singleton do Prisma Client compartilhada por toda a API.
 *
 * Por que singleton?
 * O Prisma Client mantém um pool de conexões com o banco. Criar múltiplas
 * instâncias (ex: uma por módulo) esgota as conexões disponíveis do PostgreSQL.
 * Com o singleton, há apenas um pool para toda a aplicação.
 *
 * Em ambiente de desenvolvimento com hot-reload (tsx watch), o módulo pode
 * ser reavaliado várias vezes. O padrão `globalThis` evita que novas instâncias
 * sejam criadas a cada reload.
 */

import { PrismaClient } from '@prisma/client'

const globalParaDev = globalThis as typeof globalThis & {
  prisma?: PrismaClient
}

export const db: PrismaClient =
  globalParaDev.prisma ??
  new PrismaClient({
    log: process.env['NODE_ENV'] === 'development' ? ['query', 'warn', 'error'] : ['error'],
  })

if (process.env['NODE_ENV'] !== 'production') {
  globalParaDev.prisma = db
}
