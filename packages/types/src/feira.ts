/**
 * Tipos do domínio Feira e Alocacao.
 * Referência: RF08 (cadastrar), RF09 (alocar), RF10 (notificar), US05–US08.
 *
 * TODO: adicionar tipos de request/response quando as rotas forem implementadas.
 */

import type { ArtesaoResumo } from './artesao.js'

export type StatusAlocacao = 'ALOCADO' | 'CANCELADO'

export interface Feira {
  id: string
  nome: string
  data: string // ISO 8601
  local: string
  limiteVagas: number
  vagasRestantes: number
  criadaEm: string
}

/** Detalhe da feira com lista de artesãos alocados. */
export interface FeiraDetalhada extends Feira {
  alocacoes: Alocacao[]
}

export interface Alocacao {
  id: string
  artesao: ArtesaoResumo
  status: StatusAlocacao
  criadaEm: string
}
