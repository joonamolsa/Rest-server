import { MongoClient, ObjectId } from "mongodb";

const dbHost = "localhost:27017";
const dbUser = "mongoAdmin";
const dbPassword = "Salasana1";
const dbName = "testi";
const destConnString = `mongodb://${dbUser}:${dbPassword}@${dbHost}/?authSource=admin`;

const dbServer = new MongoClient(destConnString);
let db;

const openDbConn = async () => {
  try {
    await dbServer.connect();
    db = dbServer.db(dbName);
    console.log("✅ Yhdistetty MongoDB:hen");
  } catch (error) {
    console.error("❌ Yhteysvirhe MongoDB:hen:", error);
    throw error;
  }
};

const closeDbConnection = async () => {
  try {
    await dbServer.close();
    console.log("🔒 Yhteys MongoDB:hen suljettu");
  } catch (error) {
    console.error("❌ Sulkeminen epäonnistui", error);
  }
};

const getCollection = (name) => db.collection(name);

process.on("SIGINT", closeDbConnection);
process.on("SIGTERM", closeDbConnection);

export { openDbConn, closeDbConnection, getCollection, ObjectId };
