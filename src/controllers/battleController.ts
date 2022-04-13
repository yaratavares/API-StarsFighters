import { Request, Response } from "express";
import * as battleService from "../services/battleService.js";

export async function battleWithTwoUsers(req: Request, res: Response) {
  const { firstUser, secondUser } = req.body;

  if (!firstUser || !secondUser) {
    return res.sendStatus(422);
  }

  const resultBattle = await battleService.calculateBattleResult(
    firstUser,
    secondUser
  );

  res.send(resultBattle).status(201);
}
