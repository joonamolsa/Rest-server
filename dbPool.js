import { createPool } from "mariadb";

const pool = createPool({
  // host: "maria.northeurope.cloudapp.azure.com",
  host: "localhost",
  // user: "testi",
  user: "joona",
  port: 3306,
  // password: "mariadb1",
  password: "Salasana1",
  // database: "adbms",
  database: "testi",
});

export default Object.freeze({
  pool: pool,
});
