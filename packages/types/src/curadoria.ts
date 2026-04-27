/**
 * Tipos do domínio Curadoria e Mensagem.
 * Referência: RF04, RF05, RF06, RF07, US03, US04.
 *
 * TODO: adicionar tipos de request/response quando as rotas forem implementadas.
 */

import type { StatusCuradoria } from './artesao.js'

export interface Curadoria {
  id: string
  artesaoId: string
  gestorId: string
  status: StatusCuradoria
  /** Obrigatória quando status é 'REJEITADO' (CA03-02). */
  justificativa?: string
  criadaEm: string
}

export type TipoMensagem = 'REJEICAO' | 'CONVOCACAO' | 'MASSA' | 'INDIVIDUAL'
export type StatusEnvio = 'PENDENTE' | 'ENVIADO' | 'FALHOU'

export interface Mensagem {
  id: string
  artesaoId: string
  gestorId?: string
  conteudo: string
  tipo: TipoMensagem
  status: StatusEnvio
  criadaEm: string
}
