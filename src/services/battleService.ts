import axios from "axios";
import * as errors from "../middlewares/errorHandleMiddleware.js";

export async function countStarsUser(user: string) {
  const result = await axios.get(`https://api.github.com/users/${user}/repos`);

  if (result.data.length === 0) {
    throw errors.notFoundError();
  }

  let sumStars: number = 0;
  result.data.map((repo) => (sumStars += repo.stargazers_count));

  return sumStars;
}

export async function calculateBattleResult(
  firstUser: string,
  secondUser: string
) {
  console.log(firstUser);

  const starsFirstUser = await countStarsUser(firstUser);
  const starsSecondUser = await countStarsUser(secondUser);

  let winner: any = null;
  let loser: any = null;
  let draw: boolean = false;

  if (starsFirstUser > starsSecondUser) {
    winner = firstUser;
    loser = secondUser;
  }
  if (starsSecondUser > starsFirstUser) {
    winner = secondUser;
    loser = firstUser;
  }
  if (starsFirstUser === starsSecondUser) {
    draw = true;
  }

  return { winner, loser, draw };
}
