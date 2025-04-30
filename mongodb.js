// Ladataan .env-tiedosto, jotta voimme käyttää ympäristömuuttujia
import dotenv from "dotenv";
dotenv.config();

import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri || !dbName) {
  console.error("❌ Puuttuva MONGODB_URI tai MONGODB_DB ympäristömuuttuja.");
  process.exit(1);
}

const client = new MongoClient(uri);
let db;

export const openDbConn = async () => {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("✅ Yhdistetty MongoDB:hen:", dbName);
  } catch (error) {
    console.error("❌ Yhteysvirhe MongoDB:hen:", error);
    throw error;
  }
};

export const closeDbConnection = async () => {
  try {
    await client.close();
    console.log("🔒 Yhteys MongoDB:hen suljettu");
  } catch (error) {
    console.error("❌ Sulkeminen epäonnistui", error);
  }
};

export const getCollection = (name) => {
  if (!db)
    throw new Error(
      "Tietokantayhteyttä ei ole avattu ennen getCollection-kutsua"
    );
  return db.collection(name);
};

process.on("SIGINT", closeDbConnection);
process.on("SIGTERM", closeDbConnection);

export { ObjectId };
