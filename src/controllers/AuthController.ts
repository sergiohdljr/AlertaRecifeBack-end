import { Request, Response } from "express";
import { prisma } from "../prisma";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, senha } = req.body;

    const user = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPassword = await compare(senha, user.senha);

    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      "secret",
      { expiresIn: "7d" }
    );

    return res.json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      fotoPerfil: user.fotoPerfil,
      token,
    });
  }
}

export default new AuthController();
