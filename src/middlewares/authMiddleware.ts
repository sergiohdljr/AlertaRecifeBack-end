import { Response, Request, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import RequestWithUser from "../@types/requestWithUser";

interface tokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = Jwt.verify(token, "secret");
    const { id } = data as tokenPayload;

    req.userId = id;

    return next()
  } catch {
    return res.sendStatus(401);
  }
}
