console.log("Lataa data.js");
import { Router } from "express";
import {
  getAllData,
  getDataById,
  findDataByUser,
  addData,
  findDataByFirstname,
  callFillData,
  callAddDataRow,
  callAddData,
} from "../database.js";

let router = Router();

// GET /data → kaikki tiedot
router.get("/", async (req, res) => {
  try {
    const data = await getAllData();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /data/:id → yksi tietue
router.get("/:id", async (req, res) => {
  try {
    const data = await getDataById(req.params.id);
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /data/find → hae kaikki datat juuri kirjautuneelta käyttäjältä
router.get("/find", async (req, res) => {
  try {
    const docs = await findDataByUser(username);
    res.json(docs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /data/search
router.post("/search", async (req, res) => {
  const { firstname } = req.body;
  try {
    const docs = await findDataByFirstname(firstname);
    res.json(docs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /data → lisää uusi tietue
router.post("/", async (req, res) => {
  try {
    const exist = await getDataById(req.body.id);
    if (exist) {
      res.status(409).json({ error: "Record already exists" });
    } else {
      const result = await addData(req.body);
      res.json({ success: true, insertedId: result.insertedId });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /data/fill → lisää mock-dataa määrän verran
router.post("/fill", async (req, res) => {
  const { count } = req.body;
  const userid = req.user.username; // kirjautuneen käyttäjän tunnus

  try {
    const result = await callFillData(count, userid);
    res.json({ success: true, insertedCount: result.insertedCount });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /data/add-row → lisää yksi tietue kirjautuneelle käyttäjälle
router.post("/add-row", async (req, res) => {
  const { Firstname, Surname } = req.body;
  const userid = req.user.username; // kirjautuneen käyttäjän tunnus
  try {
    const result = await callAddDataRow(Firstname, Surname, userid);
    res.json({ success: true, insertedId: result.insertedId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /data/add-data → lisää yksi tietue satunnaiskäyttäjälle
router.post("/add-data", async (req, res) => {
  const { Firstname, Surname } = req.body;
  try {
    const result = await callAddData(Firstname, Surname);
    res.json({ success: true, insertedId: result.insertedId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
