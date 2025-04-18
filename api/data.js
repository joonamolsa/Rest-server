import { Router } from "express";
import {
  getAllData,
  getDataById,
  addData,
  callFillData,
  callAddDataRow,
  callAddData,
} from "../database.js";
let router = Router();

router.get("/", async (req, res) => {
  res.json(await getAllData());
});

router.get("/:id", async (req, res) => {
  res.json(await getDataById(req.params.id));
});

router.post("/", async (req, res) => {
  let exist = await getDataById(req.body.id);
  if (exist[0]) {
    res.status(409).json({ error: "record already exists" });
  } else {
    let result = await addData(req.body);
    if (result.affectedRows) res.json(req.body);
    else res.status(500).json({ error: "unknown database error" });
  }
});

// POST /fill -> lisää satunnaista dataa annetun määrän verran
router.post("/fill", async (req, res) => {
  const { count } = req.body;
  try {
    const result = await callFillData(count);
    res.json({ success: true, result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /add-row -> kutsuu addDataRow-proseduuria
router.post("/add-row", async (req, res) => {
  const { Firstname, Surname } = req.body;
  const userid = req.user.username; // Ottaa kirjautuneen käyttäjän ID
  try {
    const result = await callAddDataRow(Firstname, Surname, userid);
    res.json({ success: true, result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /add-data -> kutsuu addData-proseduuria
router.post("/add-data", async (req, res) => {
  const { Firstname, Surname } = req.body;
  try {
    const result = await callAddData(Firstname, Surname);
    res.json({ success: true, result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
