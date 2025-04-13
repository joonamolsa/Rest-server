import poolObj from "./dbPool.js";
const { pool } = poolObj;

let logonUsers = new Map();

const sendQuery = async (sql, doCommit, ...params) => {
  let conn, result;
  try {
    conn = await pool.getConnection();
    result = await conn.query(sql, params);
    if (doCommit) {
      await conn.query("COMMIT");
    }
  } catch (err) {
    result = err;
    throw err;
  } finally {
    if (conn) conn.end();
    return result;
  }
};

const findOneUser = async (username) =>
  sendQuery(`SELECT * FROM users WHERE username = ?`, true, username);

const getAllData = async () => sendQuery(`SELECT * FROM data`);

const getDataById = async (id) =>
  sendQuery(`SELECT * FROM data WHERE data.id = ?`, false, id);

const getAllUsers = async () => sendQuery(`SELECT * FROM users`);

const addOneUser = async (username, password) =>
  sendQuery(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    false,
    username,
    password
  );

const addData = ({ id, Firstname, Surname, userid }) =>
  sendQuery(
    `INSERT INTO data (id, Firstname, Surname, userid) VALUES (?, ?, ?, ?)`,
    true,
    id,
    Firstname,
    Surname,
    userid
  );

// Kutsuu fillData-proseduuria, joka lisää annetun määrän satunnaisia rivejä data-tauluun.
const callFillData = async (count) =>
  sendQuery(`CALL fillData(?)`, true, count);

// Kutsuu addDataRow-proseduuria, joka lisää yhden rivin data-tauluun annetulla etunimellä, sukunimellä ja käyttäjätunnuksella.
const callAddDataRow = async (firstname, surname, userid) =>
  sendQuery(`CALL addDataRow(?, ?, ?)`, true, firstname, surname, userid);

// Kutsuu addData-proseduuria, joka lisää yhden rivin data-tauluun annetulla etunimellä, sukunimellä ja satunnaisella käyttäjätunnuksella.
const callAddData = async (firstname, surname) =>
  sendQuery(`CALL addData(?, ?)`, true, firstname, surname);

/*
const getUserByName = (username) => 
    sendQuery(`SELECT * FROM users WHERE username = ?`, false, username);

const deleteData = (id, userid) =>
    sendQuery(`DELETE FROM data WHERE id = ? AND userid = ?`, true, id, userid);
*/
export {
  addOneUser,
  getAllUsers,
  findOneUser,
  getAllData,
  getDataById,
  addData,
  logonUsers,
  callFillData,
  callAddDataRow,
  callAddData,
  //    getUserByName,
  //    deleteData,
};
