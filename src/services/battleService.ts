import axios from "axios";
import * as errors from "../middlewares/errorHandleMiddleware.js";
import * as battleRepository from "../repositories/battleRepository.js";

export async function calculateBattleResult(
  firstUser: string,
  secondUser: string
) {
  const starsFirstUser = await countStarsUser(firstUser);
  const starsSecondUser = await countStarsUser(secondUser);

  const infoFirstUser = await battleRepository.selectOrInsertFighters(
    firstUser
  );
  const infoSecondUser = await battleRepository.selectOrInsertFighters(
    secondUser
  );

  let winner: any = null;
  let loser: any = null;
  let draw: boolean = false;

  if (starsFirstUser > starsSecondUser) {
    winner = infoFirstUser;
    loser = infoSecondUser;
  }
  if (starsSecondUser > starsFirstUser) {
    winner = infoSecondUser;
    loser = infoFirstUser;
  }
  if (starsFirstUser === starsSecondUser) {
    draw = true;
  }

  await battleRepository.updateUserWithBattle(winner.id, loser.id, draw);

  return { winner: winner.username, loser: loser.username, draw };
}

export async function countStarsUser(user: string) {
  const result = await axios.get(`https://api.github.com/users/${user}/repos`);

  if (result.data.length === 0) {
    throw errors.notFoundError();
  }

  let sumStars: number = 0;
  result.data.map((repo) => (sumStars += repo.stargazers_count));

  return sumStars;
}
