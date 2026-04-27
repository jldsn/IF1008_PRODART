/**
 * Cliente HTTP para comunicação com a API Fastify.
 *
 * Centraliza a URL base e os headers comuns (Authorization Bearer).
 * Todos os módulos do frontend devem importar daqui em vez de usar
 * fetch diretamente, para facilitar troca de implementação futuramente.
 *
 * TODO: implementar funções tipadas por recurso (artesaos, feiras, curadoria)
 * usando os tipos de @prodarte/types como contrato de resposta.
 */

const URL_BASE = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:3001'

export async function apiFetch(caminho: string, opcoes?: RequestInit): Promise<Response> {
  return fetch(`${URL_BASE}${caminho}`, {
    ...opcoes,
    headers: {
      'Content-Type': 'application/json',
      ...opcoes?.headers,
    },
  })
}
