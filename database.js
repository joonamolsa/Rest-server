console.log("Lataa database.js");

import { getCollection, ObjectId } from "./mongodb.js";
import bcrypt from "bcrypt";

const findOneUser = async (username) =>
  getCollection("users").findOne({ username });

const getAllUsers = async () => getCollection("users").find({}).toArray();

const addOneUser = async (username, plainPassword) => {
  // 1) luo hash (suolalla rounds=10)
  const hash = await bcrypt.hash(plainPassword, 10);
  // 2) talleta käyttäjä hashattuna salasanana
  return getCollection("users").insertOne({
    username,
    password: hash,
  });
};

const getAllData = async () => getCollection("data").find({}).toArray();

const getDataById = async (id) =>
  getCollection("data").findOne({ _id: new ObjectId(id) });

const findDataByUser = async (userid) =>
  getCollection("data").find({ userid }).toArray();

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

const findDataByFirstname = async (firstname) => {
  return getCollection("data")
    .find(
      { Firstname: firstname },
      { projection: { Firstname: 1, Surname: 1, _id: 0 } }
    )
    .toArray();
};

// Tehtävä 11 Mongo-kysely REST-ohjelmaan
const getUserRecordCounts = async () =>
  getCollection("users")
    .aggregate([
      {
        $lookup: {
          from: "data",
          localField: "username",
          foreignField: "userid",
          as: "records",
        },
      },
      {
        $project: { _id: 0, username: 1, usersRecords: { $size: "$records" } },
      },
    ])
    .toArray();

export {
  findOneUser,
  getAllUsers,
  addOneUser,
  getAllData,
  getDataById,
  findDataByUser,
  addData,
  callFillData,
  callAddDataRow,
  callAddData,
  findDataByFirstname,
  getUserRecordCounts,
};
