import pg from "pg";

const { Pool } = pg;

const user = "postgres";
const password = "123456";
const host = "localhost";
const port = 5432;
const database = "starfighters";

const connection = new Pool({
  user,
  password,
  host,
  port,
  database,
});

// const connection = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

export default connection;
