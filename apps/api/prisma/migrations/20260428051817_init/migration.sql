-- CreateEnum
CREATE TYPE "Segmento" AS ENUM ('ARTESANATO', 'GASTRONOMIA');

-- CreateEnum
CREATE TYPE "StatusCuradoria" AS ENUM ('EM_ANALISE', 'APROVADO', 'REJEITADO');

-- CreateEnum
CREATE TYPE "TipoDocumento" AS ENUM ('RG', 'CPF_DOC', 'COMPROVANTE_RESIDENCIA', 'PORTFOLIO', 'MEI', 'OUTRO');

-- CreateEnum
CREATE TYPE "StatusAlocacao" AS ENUM ('ALOCADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "TipoMensagem" AS ENUM ('REJEICAO', 'CONVOCACAO', 'MASSA', 'INDIVIDUAL');

-- CreateEnum
CREATE TYPE "StatusEnvio" AS ENUM ('PENDENTE', 'ENVIADO', 'FALHOU');

-- CreateTable
CREATE TABLE "Gestor" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gestor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artesao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT,
    "dataNascimento" TIMESTAMP(3),
    "telefone" TEXT NOT NULL,
    "email" TEXT,
    "logradouro" TEXT,
    "numero" TEXT,
    "complemento" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "uf" TEXT,
    "cep" TEXT,
    "nomeMarca" TEXT,
    "segmento" "Segmento" NOT NULL,
    "descricaoProduto" TEXT,
    "possuiMEI" BOOLEAN NOT NULL DEFAULT false,
    "cnpj" TEXT,
    "statusCuradoria" "StatusCuradoria" NOT NULL DEFAULT 'EM_ANALISE',
    "dataInscricao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artesao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" TEXT NOT NULL,
    "artesaoId" TEXT NOT NULL,
    "tipo" "TipoDocumento" NOT NULL,
    "url" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "tamanhoBytes" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curadoria" (
    "id" TEXT NOT NULL,
    "artesaoId" TEXT NOT NULL,
    "gestorId" TEXT NOT NULL,
    "status" "StatusCuradoria" NOT NULL,
    "justificativa" TEXT,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Curadoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feira" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "local" TEXT NOT NULL,
    "limiteVagas" INTEGER NOT NULL,
    "vagasRestantes" INTEGER NOT NULL,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alocacao" (
    "id" TEXT NOT NULL,
    "artesaoId" TEXT NOT NULL,
    "feiraId" TEXT NOT NULL,
    "status" "StatusAlocacao" NOT NULL DEFAULT 'ALOCADO',
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alocacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mensagem" (
    "id" TEXT NOT NULL,
    "gestorId" TEXT,
    "artesaoId" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "tipo" "TipoMensagem" NOT NULL,
    "status" "StatusEnvio" NOT NULL DEFAULT 'PENDENTE',
    "processadaEm" TIMESTAMP(3),
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mensagem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gestor_email_key" ON "Gestor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Artesao_cpf_key" ON "Artesao"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Alocacao_artesaoId_feiraId_key" ON "Alocacao"("artesaoId", "feiraId");

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_artesaoId_fkey" FOREIGN KEY ("artesaoId") REFERENCES "Artesao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curadoria" ADD CONSTRAINT "Curadoria_artesaoId_fkey" FOREIGN KEY ("artesaoId") REFERENCES "Artesao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curadoria" ADD CONSTRAINT "Curadoria_gestorId_fkey" FOREIGN KEY ("gestorId") REFERENCES "Gestor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alocacao" ADD CONSTRAINT "Alocacao_artesaoId_fkey" FOREIGN KEY ("artesaoId") REFERENCES "Artesao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alocacao" ADD CONSTRAINT "Alocacao_feiraId_fkey" FOREIGN KEY ("feiraId") REFERENCES "Feira"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensagem" ADD CONSTRAINT "Mensagem_gestorId_fkey" FOREIGN KEY ("gestorId") REFERENCES "Gestor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensagem" ADD CONSTRAINT "Mensagem_artesaoId_fkey" FOREIGN KEY ("artesaoId") REFERENCES "Artesao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
