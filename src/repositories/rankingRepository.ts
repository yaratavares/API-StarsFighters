import connection from "../databse.js";

export function selectBattles() {
  return connection.query(
    `SELECT username, wins, losses, draws FROM fighters
        ORDER BY draws, wins DESC
        `
  );
}
