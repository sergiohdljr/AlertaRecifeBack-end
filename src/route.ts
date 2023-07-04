import { Router } from "express";
import { prisma } from "./prisma";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";
import authMiddleware from "./middlewares/authMiddleware";
import OcorrenciasController from "./controllers/OcorrenciasController";

export const router = Router();

router.post("/register", UserController.store);
router.get("/user/:id", authMiddleware, UserController.findById);
router.post("/auth", AuthController.authenticate);
router.post(
  "/ocorrencia/:id",
  authMiddleware,
  OcorrenciasController.storeForUser
);
router.get(
  "/ocorrencias",
  authMiddleware,
  OcorrenciasController.getOcorrencias
);

router.get("/", authMiddleware, async (req, res) => {
  res.json("dale mammi");
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
