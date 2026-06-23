# Documentação da API — Gestão de Artesãos

API REST em **Spring Boot** para gerenciar artesãos, curadoria, feiras, alocações, rodízio e mensageria WhatsApp.

**Código-fonte:** [`gestaoartesaos/`](gestaoartesaos/)

---

## Tecnologias

| Tecnologia | Uso |
|------------|-----|
| Java 21 | Linguagem e runtime |
| Spring Boot 4 | Web MVC, validação, segurança |
| Spring Data JPA | Persistência com PostgreSQL |
| Spring Security + OAuth2 Resource Server | JWT com chaves RSA |
| Lombok | Redução de boilerplate |
| Twilio SDK | Envio de mensagens WhatsApp |

---

## Como rodar

### Pré-requisitos

- **JDK 21**
- **PostgreSQL 15+** (porta `5432`)
- **OpenSSL** (para gerar chaves JWT na primeira execução)

Maven não precisa estar instalado — use o wrapper `./mvnw` incluso em `gestaoartesaos/`.

### 1. Gerar chaves JWT

Na **raiz do repositório**:

```bash
npm run setup:keys
```

Isso cria o par `dev-private.key` / `dev-public.pub` em `gestaoartesaos/src/main/resources/certs/`. A chave privada fica fora do Git por segurança.

### 2. Configurar o banco

```sql
CREATE DATABASE gestaoartesaos;
```

Copie e edite as propriedades:

```bash
cp gestaoartesaos/src/main/resources/application.properties.example \
   gestaoartesaos/src/main/resources/application.properties
```

Ajuste `spring.datasource.url`, `username` e `password`. Credenciais Twilio são opcionais para desenvolvimento local.

### 3. Subir a API

Na raiz do repositório:

```bash
npm run dev:api
```

Ou, dentro de `gestaoartesaos/`:

```bash
./mvnw spring-boot:run
```

A API estará em **`http://localhost:8080`**.

O Hibernate cria/atualiza o schema (`ddl-auto=update`) e o `data.sql` popula dados de desenvolvimento (`spring.sql.init.mode=always`).

**Gestor padrão:** `gestor@prodarte.com` / `Teste123`

---

## Autenticação

A API usa **JWT** assinado com RSA.

1. Faça login em `POST /auth/login` ou use o gestor padrão acima.
2. Envie o token nas rotas protegidas:

```
Authorization: Bearer <accessToken>
```

### Endpoints públicos

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/usuario` | Criar usuário gestor |
| POST | `/auth/login` | Obter JWT |
| POST | `/artesao` | Nova inscrição de artesão (simula formulário EMPREL) |

Demais rotas exigem autenticação.

---

## Endpoints

### Autenticação e usuários

#### POST `/usuario` (público)

Cria um usuário com role `BASIC`.

```json
{
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "password": "senha123",
  "telefone": "5581999999999"
}
```

#### POST `/auth/login` (público)

```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

Resposta:

```json
{
  "accessToken": "eyJhbGciOi...",
  "expiresIn": 3600,
  "email": "usuario@email.com",
  "nome": "Nome do Usuário"
}
```

---

### Artesãos

#### POST `/artesao` (público)

Registra nova inscrição com status `EM_ANALISE`.

#### GET `/artesao`

Lista artesãos com filtros opcionais: `nome`, `email`, `segmento`, `telefone`, `bairro`, `possuiMei`, `statusCuradoria`, `estado`, `categoria`.

Exemplo: `/artesao?statusCuradoria=APROVADO&segmento=ARTESANATO`

#### GET `/artesao/{id}`

Retorna detalhes de um artesão.

#### PATCH `/artesao/{id}`

Atualização parcial (telefone, endereço, dados do negócio, etc.).

---

### Curadoria

Dispara mensagens WhatsApp automaticamente ao aprovar ou rejeitar.

#### POST `/curadoria/aprovar/{id}`

Aprova o artesão (`APROVADO`) e registra o gestor logado como responsável.

#### POST `/curadoria/rejeitar/{id}`

Rejeita o artesão (`REPROVADO`) com justificativa:

```json
{
  "justificativa": "Faltam documentos sanitários obrigatórios."
}
```

---

### Feiras e alocações

#### POST `/feira`

```json
{
  "nome": "Feira de Domingo",
  "data": "2026-10-12T08:00:00",
  "local": "Praça Central",
  "limiteVagas": 20
}
```

#### GET `/feira`

Lista todas as feiras.

#### PATCH `/feira/{id}`

Atualiza feira. Alterar `limiteVagas` recalcula `vagasRestantes` proporcionalmente.

#### POST `/feira/{feiraId}/alocar/{artesaoId}`

Aloca artesão aprovado em feira com vagas disponíveis. Não permite alocação duplicada na mesma feira.

---

### Rodízio

#### GET `/rodizio/ranking?feiraId={uuid}`

Retorna ranking de artesãos para alocação justa na feira informada.

---

### Mensagens (WhatsApp)

#### GET `/mensagens/tipos`

Lista os valores do enum `TipoMensagem`.

#### GET `/mensagens`

Lista histórico de mensagens enviadas (ordenado por data).

#### POST `/mensagens`

Envio em massa para artesãos selecionados:

```json
{
  "assunto": "Comunicado PRODARTE",
  "conteudo": "Texto da mensagem...",
  "tipo": "COMUNICADO",
  "artesaoIds": [1, 2, 3]
}
```

#### POST `/mensagens/teste`

Envio de teste para um número (integração Twilio):

```json
{
  "numero": "5581999999999",
  "mensagem": "Mensagem de teste"
}
```

---

### Cursos

#### POST `/curso`

Associa curso concluído a um artesão:

```json
{
  "nome": "Costura Criativa",
  "dataConclusao": "2025-06-15T00:00:00",
  "artesaoId": 1
}
```

#### DELETE `/curso/{id}`

Remove curso do artesão.

---

## Estrutura do projeto

```
gestaoartesaos/
├── pom.xml
├── Dockerfile
└── src/main/java/com/prodarte/gestaoartesaos/
    ├── GestaoartesaosApplication.java
    ├── configs/          → Security, CORS, Twilio
    ├── controllers/      → Endpoints REST
    ├── dtos/             → Request/response
    ├── enums/            → Domínio (Segmento, StatusCuradoria, etc.)
    ├── models/           → Entidades JPA
    ├── repositories/     → Spring Data
    ├── services/         → Rodízio, WhatsApp
    └── specifications/   → Filtros dinâmicos de artesãos
```

---

## Variáveis de ambiente (`application.properties`)

| Propriedade | Descrição |
|-------------|-----------|
| `jwt.public.key` | Caminho da chave pública RSA |
| `jwt.private.key` | Caminho da chave privada RSA |
| `spring.datasource.url` | JDBC PostgreSQL |
| `spring.datasource.username` | Usuário do banco |
| `spring.datasource.password` | Senha do banco |
| `twilio.account-sid` | SID Twilio (opcional em dev) |
| `twilio.auth-token` | Token Twilio |
| `twilio.whatsapp-number` | Número remetente (`whatsapp:+...`) |

Modelo completo: [`gestaoartesaos/src/main/resources/application.properties.example`](gestaoartesaos/src/main/resources/application.properties.example)
