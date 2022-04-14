import * as rankingRepository from "../repositories/rankingRepository.js";

export async function getBattles() {
  const { rows } = await rankingRepository.selectBattles();

  return { fighters: rows };
}
