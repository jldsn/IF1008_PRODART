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
- Mensageria em massa e individual via WhatsApp (Twilio)

---

## Arquitetura do repositório

```
prodarte/
├── apps/
│   ├── api/
│   │   ├── README.md                       → Documentação detalhada da API REST
│   │   └── gestaoartesaos/                 → API REST (Spring Boot + JPA + PostgreSQL)
│   │       ├── pom.xml
│   │       ├── Dockerfile
│   │       └── src/main/
│   │           ├── java/com/prodarte/gestaoartesaos/
│   │           │   ├── GestaoartesaosApplication.java
│   │           │   ├── configs/            → Security, CORS, Twilio
│   │           │   ├── controllers/        → Endpoints REST
│   │           │   ├── dtos/               → Contratos de entrada e saída
│   │           │   ├── enums/              → Enums do domínio
│   │           │   ├── models/             → Entidades JPA
│   │           │   ├── repositories/       → Acesso ao banco via Spring Data
│   │           │   ├── services/           → Regras de negócio (rodízio, WhatsApp)
│   │           │   └── specifications/     → Filtros dinâmicos de artesãos
│   │           └── resources/
│   │               ├── application.properties.example
│   │               ├── data.sql              → Carga inicial em desenvolvimento
│   │               └── certs/                → Chaves RSA para JWT
│   └── web/
│       └── proarte-gestao-digital/         → Backoffice (React + Vite + TanStack Start)
│           └── src/
│               ├── routes/                 → Páginas (login, dashboard, feiras, mensageria)
│               ├── components/             → Layout e componentes Shadcn UI
│               └── lib/
│                   ├── api-client.ts       → Cliente HTTP tipado para a API
│                   └── store.ts            → Estado global (Zustand)
├── packages/
│   └── types/                              → Tipos TypeScript do domínio (frontend)
├── Apresentacao_Final/
│   └── MANUAL_DE_INSTRUCOES.md             → Guia completo de instalação e execução
└── package.json                            → Scripts npm na raiz (pacotes compartilhados)
```

### Camadas da API (Spring Boot)

| Camada | Pasta | Responsabilidade |
|--------|-------|-----------------|
| **HTTP** | `controllers/` | Receber requisições, validar entrada e retornar respostas |
| **Negócio** | `services/` | Rodízio, integração WhatsApp e regras que cruzam entidades |
| **Dados** | `repositories/` + `specifications/` | Persistência JPA e filtros dinâmicos |
| **Infraestrutura** | `configs/` | JWT (OAuth2 Resource Server), CORS, Twilio |

---

## Pré-requisitos

| Ferramenta | Versão mínima |
|------------|---------------|
| Java (JDK) | 21 |
| Maven | 3.8+ (ou use o `./mvnw` incluso no projeto) |
| Node.js    | 20.x LTS      |
| npm        | 10.x          |
| PostgreSQL | 15.x          |
| OpenSSL    | Para gerar o par de chaves RSA do JWT |

---

## Configuração inicial

### 1. Banco de dados

Crie um banco vazio no PostgreSQL:

```sql
CREATE DATABASE gestaoartesaos;
```

### 2. Backend (API)

```bash
# 1. Gerar chaves RSA e colocá-las em apps/api/gestaoartesaos/src/main/resources/
#    (veja Apresentacao_Final/MANUAL_DE_INSTRUCOES.md, seção 3)

# 2. Configurar variáveis de ambiente
cp apps/api/gestaoartesaos/src/main/resources/application.properties.example \
   apps/api/gestaoartesaos/src/main/resources/application.properties
# Edite application.properties com credenciais do PostgreSQL e Twilio (opcional)

# 3. Subir a API
cd apps/api/gestaoartesaos
./mvnw spring-boot:run
```

A API ficará disponível em `http://localhost:8080`. O schema é criado via Hibernate (`ddl-auto=update`) e populado automaticamente pelo `data.sql`.

**Login padrão (desenvolvimento):** `gestor@prodarte.com` / `Teste123`

Documentação completa dos endpoints: [`apps/api/README.md`](apps/api/README.md)

### 3. Frontend (backoffice)

```bash
cd apps/web/proarte-gestao-digital
cp .env.example .env
npm install
npm run dev
```

O painel ficará disponível em `http://localhost:5173`.

Para instruções detalhadas (Docker, chaves RSA, troubleshooting), consulte [`Apresentacao_Final/MANUAL_DE_INSTRUCOES.md`](Apresentacao_Final/MANUAL_DE_INSTRUCOES.md).

---

## Perfis de usuário

| Perfil | Descrição | Interface |
|--------|-----------|-----------|
| **Gestor PRODARTE** | Operador direto do backoffice — realiza curadoria, gerencia feiras e dispara comunicações | `apps/web/proarte-gestao-digital` |
| **Artesão** | Usuário passivo — interage apenas via formulário externo EMPREL e notificações WhatsApp | Formulário EMPREL + WhatsApp |

---

## Integrações externas

| Sistema | Finalidade | Status |
|---------|-----------|--------|
| Formulário EMPREL | Origem das inscrições e recadastramentos | Mockado (banco paralelo via `data.sql`) |
| WhatsApp (Twilio) | Disparos individuais e em massa para artesãos | Integrado na API; credenciais configuráveis |

---

## Stack tecnológica

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| API | Java 21 + Spring Boot 4 | Arquitetura resiliente e alinhada aos stakeholders |
| Persistência | Spring Data JPA + Hibernate | ORM maduro, integrado ao ecossistema Spring |
| Banco | PostgreSQL | Suporte a JSON, queries complexas para filtros e rodízio |
| Autenticação | JWT com chaves RSA (OAuth2 Resource Server) | Tokens stateless para o backoffice |
| Frontend | React 19 + Vite + TanStack Start/Router | SPA moderna com roteamento file-based |
| Estilização | Tailwind CSS v4 + Shadcn UI | Consistência visual e componentes acessíveis |
| Estado | Zustand + TanStack Query | Sessão do gestor e cache de requisições |
| Tipos | `packages/types` + `api-client.ts` | Contratos TypeScript do domínio no frontend |

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
