-- CreateTable
CREATE TABLE "Ocorrencia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipoDaOcorrencia" TEXT NOT NULL,
    "descricaoDaOcorrencia" TEXT NOT NULL,
    "fotoOcorrencia" BLOB,
    "enderecoOcorrencia" TEXT NOT NULL,
    "dataHora" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "autorId" TEXT NOT NULL,
    CONSTRAINT "Ocorrencia_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "fotoPerfil" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
