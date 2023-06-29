import { Request, Response } from "express";
import { prisma } from "../prisma";
import {hashSync} from 'bcrypt'

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
        senha: hashSync(senha,8),
        fotoPerfil,
        nome,
      },
    });

    return res.json(User);
  }
}

export default new UserController();
