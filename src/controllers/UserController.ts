import { Request, Response } from "express";
import { prisma } from "../prisma";
import { hashSync } from "bcrypt";
import { json } from "stream/consumers";

class UserController {
  async store(req: Request, res: Response) {
    const { email, senha, fotoPerfil, nome } = req.body;

    const userExists = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.sendStatus(409);
    }

    const User = await prisma.usuario.create({
      data: {
        email,
        senha: hashSync(senha, 8),
        fotoPerfil,
        nome,
      },
    });

    return res.json(User);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const userById = await prisma.usuario.findUnique({
      where: {
        id,
      },
      include: {
        Ocorrencias: true,
      },
    });

    if (!userById) {
      return res.sendStatus(409);
    }

    return res.json(userById);
  }
}

export default new UserController();
