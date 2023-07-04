import { Router } from "express";
import { prisma } from "./prisma";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";
import authMiddleware from "./middlewares/authMiddleware";

export const router = Router();

router.post("/users", UserController.store);
router.get("/user/:id",authMiddleware, UserController.findById);
router.post("/auth", AuthController.authenticate);

router.get("/", authMiddleware, async (req, res) => {
  res.json("dale mammi");
});

router.post("/ocorrencia", async (req, res) => {
  const {
    descricaoDaOcorrencia,
    fotoOcorrencia,
    enderecoOcorrencia,
    nome,
    email,
    fotoPerfil,
    tipoDaOcorrencia,
    senha,
  } = req.body;

  const resultado = await prisma.ocorrencia.create({
    data: {
      fotoOcorrencia,
      descricaoDaOcorrencia,
      tipoDaOcorrencia,
      enderecoOcorrencia,
      autor: {
        connectOrCreate: {
          where: {
            email,
          },
          create: {
            senha,
            email,
            fotoPerfil,
            nome,
          },
        },
      },
    },
  });
  res.json(resultado);
});

router.get("/ocorrencias", async (req, res) => {
  const todasOcorrencias = await prisma.ocorrencia.findMany({
    select: {
      id: true,
      fotoOcorrencia: true,
      descricaoDaOcorrencia: true,
      tipoDaOcorrencia: true,
      enderecoOcorrencia: true,
      dataHora: true,
      autorId: true,
      autor: true,
    },
  });
  res.json(todasOcorrencias);
});

router.get("/ocorrencias/:email", async (req, res) => {
  const { email } = req.params;

  const ocorrenciasPorUsuario = await prisma.usuario.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      _count: true,
      nome: true,
      email: true,
      fotoPerfil: true,
      Ocorrencias: true,
    },
  });

  res.json(ocorrenciasPorUsuario);
});

router.delete("/delete/ocorrencia/:id", async (req, res) => {
  const { id } = req.params;

  const deletarOcorrencia = await prisma.ocorrencia.delete({
    where: {
      id,
    },
  });

  res.json(deletarOcorrencia);
});

router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { descricaoDaOcorrencia } = req.body;

  const editarOcorrencia = await prisma.ocorrencia.update({
    where: {
      id,
    },
    data: {
      descricaoDaOcorrencia,
    },
  });

  res.json(editarOcorrencia);
});
