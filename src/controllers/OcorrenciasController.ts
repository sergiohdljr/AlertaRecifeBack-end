import { Request, Response } from "express";
import { prisma } from "../prisma";

class OcorrenciasController {
  async storeForUser(req: Request, res: Response) {
    const { descricaoDaOcorrencia, enderecoOcorrencia, tipoDaOcorrencia } =
      req.body;

    const { id } = req.params;

    const resultado = await prisma.ocorrencia.create({
      data: {
        descricaoDaOcorrencia,
        tipoDaOcorrencia,
        enderecoOcorrencia,
        autor: {
          connect: {
            id,
          },
        },
      },
    });
    res.json(resultado);
  }

  async getOcorrencias(req: Request, res: Response) {
    const ocorrencias = await prisma.ocorrencia.findMany({
      select: {
        id: true,
        descricaoDaOcorrencia: true,
        enderecoOcorrencia: true,
        tipoDaOcorrencia: true,
        dataHora: true,
        fotoOcorrencia: true,
        autor: {
          select: {
            email: true,
            nome: true,
            fotoPerfil: true,
            id: true,
          },
        },
      },
    });

    const OcorrenciasFeed = ocorrencias.map((ocorrencia) => {
      const {
        autor,
        dataHora,
        descricaoDaOcorrencia,
        id,
        enderecoOcorrencia,
        fotoOcorrencia,
        tipoDaOcorrencia,
      } = ocorrencia;

      const [data, hora] = dataHora
        .toLocaleString("pt-BR", { timeZone: "UTC" })
        .trim()
        .split(",");

      const dateTime = {
        data,
        hora,
      };
      return {
        id,
        descricaoDaOcorrencia,
        enderecoOcorrencia,
        tipoDaOcorrencia,
        fotoOcorrencia,
        dateTime,
        autor,
      };
    });

    return res.json(OcorrenciasFeed);
  }
}

export default new OcorrenciasController();
