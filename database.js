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

const callFillData = async (count, userid) => {
  const dataCol = getCollection("data");
  // Hae olemassaolevat etu- ja sukunimet
  const allDocs = await dataCol
    .find({}, { projection: { Firstname: 1, Surname: 1 } })
    .toArray();

  if (allDocs.length === 0) {
    throw new Error("Ei tarpeeksi dataa mock-generointiin");
  }

  const firstNames = allDocs.map((d) => d.Firstname);
  const lastNames = allDocs.map((d) => d.Surname);

  // Generoi mock-dokumentit
  const mockDocs = Array.from({ length: count }, () => ({
    Firstname: firstNames[Math.floor(Math.random() * firstNames.length)],
    Surname: lastNames[Math.floor(Math.random() * lastNames.length)],
    userid,
  }));

  return dataCol.insertMany(mockDocs);
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
