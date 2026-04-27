/**
 * Layout raiz do Next.js App Router.
 * Envolve todas as páginas com metadados globais e estrutura HTML base.
 * TODO: adicionar providers de autenticação e tema quando implementados.
 */

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PRODARTE — Backoffice',
  description: 'Sistema de gestão do programa PRODARTE — Prefeitura do Recife',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
