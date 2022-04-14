import connection from "../databse.js";

export async function getBattles() {
  const { rows } = await connection.query(
    `SELECT username, wins, losses, draws FROM fighters
    ORDER BY draws, wins DESC
    `
  );

  return { fighters: rows };
}
