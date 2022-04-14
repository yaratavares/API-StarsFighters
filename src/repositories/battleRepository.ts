import connection from "../databse.js";

export async function selectOrInsertFighters(username: string) {
  const resultUserexist = await connection.query(
    `
      SELECT id, username FROM fighters 
      WHERE username = $1`,
    [username]
  );
  let usernameExist = resultUserexist.rows[0] || [];

  if (usernameExist.length === 0) {
    const { rows } = await connection.query(
      `INSERT INTO fighters(username, wins, losses, draws) 
        VALUES ($1, 0, 0, 0) RETURNING id, username`,
      [username]
    );
    usernameExist = rows;
  }

  return usernameExist;
}

export async function updateUserWithBattle(
  wins: number,
  losses: number,
  draws: boolean
) {
  if (!draws) {
    await connection.query(
      `
        UPDATE fighters SET wins = wins +1
        WHERE id=$1`,
      [wins]
    );
    await connection.query(
      `
        UPDATE fighters SET losses = losses + 1
        WHERE id=$1`,
      [losses]
    );
  }

  if (draws) {
    await connection.query(
      `
        UPDATE fighters SET draws = draws +1
        WHERE id=$1 OR id= $2`,
      [wins, losses]
    );
  }
}
