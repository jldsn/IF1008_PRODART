# PRODARTE — Sistema de Gestão de Artesãos

Plataforma de backoffice para modernização da gestão do programa **PRODARTE** da Prefeitura do Recife. Desenvolvida como projeto da disciplina **IF1008 — Tópicos em Sistemas de Informação** (UFPE).

---

## Problema que o sistema resolve

O sistema atual (**CONECTA**, operado pela EMPREL) é passivo e limitado à conferência de dados, criando os seguintes gargalos:

- Localização de cadastros exige busca manual iterativa (por nome, CPF, telefone)
- Controle de rodízio de barracas feito em planilhas e mapas de papel
- Comunicação com artesãos exige adicionar contatos **um a um** no WhatsApp
- Documentos rejeitados precisam de intervenção manual da equipe para reenvio

---

## Solução proposta

Backoffice integrado que funciona como **ponte** sobre os processos existentes da EMPREL, sem substituir o CONECTA diretamente. O sistema mantém um banco de dados paralelo enquanto a integração real com a EMPREL não está disponível.

**Funcionalidades principais:**
- Listagem e filtragem de inscrições por segmento, produto e status de curadoria
- Fluxo de curadoria técnica (Aprovado / Em Análise / Rejeitado com justificativa)
- Gestão de feiras (cadastro, limite de vagas, mapa de alocação)
- Rodízio automático por tempo de inatividade do artesão
- Mensageria em massa e individual via API do WhatsApp

---

## Arquitetura do Monorepo

```
prodarte/
├── apps/
│   ├── api/                    → API REST (Fastify + Prisma + PostgreSQL)
│   │   ├── prisma/
│   │   │   ├── schema.prisma   → Definição dos modelos e enums do banco
│   │   │   └── seed.ts         → Script para popular o banco em desenvolvimento
│   │   └── src/
│   │       ├── db/             → Queries Prisma organizadas por entidade
│   │       ├── plugins/        → Plugins Fastify (autenticação JWT, CORS, Swagger)
│   │       ├── rotas/          → Handlers HTTP agrupados por recurso
│   │       ├── app.ts          → Fábrica do servidor Fastify (registra plugins e rotas)
│   │       └── index.ts        → Ponto de entrada — inicia o servidor
│   └── web/                    → Backoffice (Next.js 15 + Tailwind CSS)
│       └── src/
│           ├── app/            → App Router do Next.js (layouts, páginas, Server Actions)
│           ├── components/     → Componentes React reutilizáveis
│           └── lib/            → Utilitários e cliente HTTP para a API
├── packages/
│   └── types/                  → Tipos TypeScript compartilhados entre api e web
│       └── src/
│           ├── artesao.ts      → Tipos e enums do domínio Artesão
│           ├── feira.ts        → Tipos do domínio Feira e Alocação
│           ├── curadoria.ts    → Tipos do fluxo de curadoria
│           └── index.ts        → Re-exporta todos os tipos públicos
├── package.json                → Configuração do npm workspaces (raiz)
└── tsconfig.base.json          → Configuração base do TypeScript (herdada por todos)
```

### Por que monorepo?

- `apps/api` e `apps/web` compartilham os tipos de domínio de `packages/types`
- Evita duplicação: mudanças nos tipos são refletidas automaticamente nos dois apps
- Um único `npm install` na raiz instala todas as dependências

### Por que estrutura por camadas na API?

A API segue uma divisão simples em três camadas horizontais, sem abstrações desnecessárias:

| Camada | Pasta | Responsabilidade |
|--------|-------|-----------------|
| **HTTP** | `src/rotas/` | Receber requisições, validar entrada com Zod, retornar respostas |
| **Dados** | `src/db/` | Executar queries no Prisma — uma função por operação |
| **Infraestrutura** | `src/plugins/` | Configurar JWT, CORS, Swagger e outros plugins do Fastify |

Cada rota chama diretamente as funções de `db/`, sem uma camada de serviços intermediária. Isso é suficiente para o escopo atual do backoffice e mantém o código rastreável sem indireção desnecessária.

---

## Pré-requisitos

| Ferramenta | Versão mínima |
|------------|---------------|
| Node.js    | 20.x LTS      |
| npm        | 10.x          |
| PostgreSQL  | 15.x          |

---

## Configuração inicial

```bash
# 1. Instalar todas as dependências do monorepo
npm install

# 2. Configurar variáveis de ambiente da API
cp apps/api/.env.example apps/api/.env
# Edite apps/api/.env com suas credenciais do banco de dados

# 3. Criar o banco de dados e aplicar as migrations
cd apps/api
npx prisma migrate dev --name init

# 4. Subir os dois apps em modo de desenvolvimento
cd ../..
npm run dev
```

---

## Perfis de usuário

| Perfil | Descrição | Interface |
|--------|-----------|-----------|
| **Gestor PRODARTE** | Operador direto do backoffice — realiza curadoria, gerencia feiras e dispara comunicações | `apps/web` (backoffice) |
| **Artesão** | Usuário passivo — interage apenas via formulário externo EMPREL e notificações WhatsApp | Formulário EMPREL + WhatsApp |

---

## Integrações externas

| Sistema | Finalidade | Status |
|---------|-----------|--------|
| Formulário EMPREL | Origem das inscrições e recadastramentos | Mockado (banco paralelo) |
| API WhatsApp (Business) | Disparos individuais e em massa para artesãos | Pendente de credenciais |

---

## Stack tecnológica

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| API | Fastify + TypeScript | Alta performance, suporte nativo a schemas e plugins |
| ORM | Prisma | Migrations automáticas, type safety no acesso ao banco |
| Banco | PostgreSQL | Suporte a JSON, queries complexas para filtros e rodízio |
| Frontend | Next.js 15 (App Router) | SSR/SSG nativo, Server Actions, excelente DX |
| Estilização | Tailwind CSS | Consistência visual sem conflitos de especificidade |
| Tipos | @prodarte/types | Contrato único entre API e frontend |

---

## Estrutura de commits

Todos os commits seguem o padrão em **português** com tipo explícito:

```
<tipo>: <descrição curta no infinitivo>

<corpo opcional com contexto adicional>
```

**Tipos usados:** `feat`, `chore`, `fix`, `docs`, `refactor`, `test`

---

## Equipe

Projeto desenvolvido pelo **Grupo 2** — IF1008, UFPE, Abril 2026.
