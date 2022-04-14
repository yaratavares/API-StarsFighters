import { Request, Response } from "express";
import * as rankingService from "../services/rankingService.js";

export async function returnBattles(req: Request, res: Response) {
  const listOfBattles = await rankingService.getBattles();

  res.send(listOfBattles);
}
