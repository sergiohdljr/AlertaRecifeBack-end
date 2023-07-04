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
    const ocorrencias = await prisma.ocorrencia.findMany();

    return res.json(ocorrencias);
  }
}

export default new OcorrenciasController();
