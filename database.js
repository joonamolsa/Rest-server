console.log("Lataa database.js");

import { getCollection, ObjectId } from "./mongodb.js";

const findOneUser = async (username) =>
  getCollection("users").findOne({ username });

const getAllUsers = async () => getCollection("users").find({}).toArray();

const addOneUser = async (username, password) =>
  getCollection("users").insertOne({ username, password });

const getAllData = async () => getCollection("data").find({}).toArray();

const getDataById = async (id) =>
  getCollection("data").findOne({ _id: new ObjectId(id) });

const addData = async ({ Firstname, Surname, userid }) =>
  getCollection("data").insertOne({ Firstname, Surname, userid });

const callFillData = async (count) => {
  const data = getCollection("data");
  const mock = [];
  for (let i = 0; i < count; i++) {
    mock.push({
      Firstname: `Etunimi${i}`,
      Surname: `Sukunimi${i}`,
      userid: "mockuser",
    });
  }
  return await data.insertMany(mock);
};

const callAddDataRow = async (firstname, surname, userid) => {
  const data = getCollection("data");
  return await data.insertOne({
    Firstname: firstname,
    Surname: surname,
    userid,
  });
};

const callAddData = async (firstname, surname) => {
  const data = getCollection("data");
  return await data.insertOne({
    Firstname: firstname,
    Surname: surname,
    userid: "mockuser",
  });
};

export {
  findOneUser,
  getAllUsers,
  addOneUser,
  getAllData,
  getDataById,
  addData,
  callFillData,
  callAddDataRow,
  callAddData,
};
