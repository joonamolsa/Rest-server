import { getCollection, ObjectId } from "./mongodb.js";

const logonUsers = new Map();

const findOneUser = async (username) => {
  const users = getCollection("users");
  return await users.findOne(
    { username },
    { projection: { username: 1, password: 1, _id: 0 } }
  );
};

const getAllUsers = async () => {
  const users = getCollection("users");
  return await users.find({}).toArray();
};

const addOneUser = async (username, password) => {
  const users = getCollection("users");
  return await users.insertOne({ username, password });
};

const getAllData = async () => {
  const data = getCollection("data");
  return await data.find({}).toArray();
};

const getDataById = async (id) => {
  const data = getCollection("data");
  return await data.findOne({ _id: new ObjectId(id) });
};

const addData = async ({ Firstname, Surname, userid }) => {
  const data = getCollection("data");
  return await data.insertOne({ Firstname, Surname, userid });
};

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
  logonUsers,
  callFillData,
  callAddDataRow,
  callAddData,
};
