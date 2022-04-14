import axios from "axios";
import connection from "../databse.js";
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
  const starsFirstUser = await countStarsUser(firstUser);
  const starsSecondUser = await countStarsUser(secondUser);

  const idFirstUser = await selectOrInsertFighters(firstUser);
  const idSecondUser = await selectOrInsertFighters(secondUser);

  let winner: any = null;
  let loser: any = null;
  let draw: boolean = false;

  if (starsFirstUser > starsSecondUser) {
    winner = firstUser;
    loser = secondUser;
    await updateUserWithBattle({
      winner: idFirstUser,
      loser: idSecondUser,
      draw,
    });
  }
  if (starsSecondUser > starsFirstUser) {
    winner = secondUser;
    loser = firstUser;
    await updateUserWithBattle({
      winner: idSecondUser,
      loser: idFirstUser,
      draw,
    });
  }
  if (starsFirstUser === starsSecondUser) {
    draw = true;
    await updateUserWithBattle({
      winner,
      loser,
      draw,
    });
  }

  if (winner && loser) {
  }

  return { winner, loser, draw };
}

export async function selectOrInsertFighters(username: string) {
  const resultUserexist = await connection.query(
    `
    SELECT id FROM fighters 
    WHERE username = $1`,
    [username]
  );
  let usernameExist = resultUserexist.rows[0] || [];

  if (usernameExist.length === 0) {
    const { rows } = await connection.query(
      `INSERT INTO fighters(username, wins, losses, draws) 
      VALUES ($1, 0, 0, 0) RETURNING id`,
      [username]
    );
    usernameExist = rows;
  }

  return usernameExist.id;
}

export async function updateUserWithBattle({ winner, loser, draw }) {
  if (!draw) {
    console.log("entrei");
    await connection.query(
      `
      UPDATE fighters SET wins = wins +1
      WHERE id=$1`,
      [winner]
    );
    await connection.query(
      `
      UPDATE fighters SET losses = losses + 1
      WHERE id=$1`,
      [loser]
    );
  }

  if (draw) {
    await connection.query(
      `
      UPDATE fighters SET draws = draws +1
      WHERE id=$1 OR id= $2`,
      [winner, loser]
    );
  }
}
