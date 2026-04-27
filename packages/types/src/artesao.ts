/**
 * Tipos do domínio Artesão.
 *
 * Espelham os enums e campos do schema.prisma, mas como tipos TypeScript puros —
 * sem dependência do Prisma Client, que não deve ser importado pelo frontend.
 *
 * TODO: expandir com tipos de request/response de cada endpoint quando as rotas
 * da API forem implementadas (ex: FiltrosListagemArtesaos, RespostaArtesao).
 */

export type Segmento = 'ARTESANATO' | 'GASTRONOMIA'

export type StatusCuradoria = 'EM_ANALISE' | 'APROVADO' | 'REJEITADO'

export type TipoDocumento =
  | 'RG'
  | 'CPF_DOC'
  | 'COMPROVANTE_RESIDENCIA'
  | 'PORTFOLIO'
  | 'MEI'
  | 'OUTRO'

/** Representação resumida usada na listagem de inscrições (RF01). */
export interface ArtesaoResumo {
  id: string
  nome: string
  cpf: string
  segmento: Segmento
  statusCuradoria: StatusCuradoria
  dataInscricao: string // ISO 8601
}

/** Representação completa usada na tela de cadastro individual (RF03). */
export interface ArtesaoDetalhado extends ArtesaoResumo {
  rg?: string
  telefone: string
  email?: string
  nomeMarca?: string
  descricaoProduto?: string
  possuiMEI: boolean
  cnpj?: string
  logradouro?: string
  numero?: string
  complemento?: string
  bairro?: string
  cidade?: string
  uf?: string
  cep?: string
}
