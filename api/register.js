console.log("Lataa register.js");
import { Router } from "express";
import { addOneUser, findOneUser } from "../database.js";

const router = Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  // 1) Tarkista, ettei käyttäjä ole jo olemassa
  if (await findOneUser(username)) {
    return res.status(409).json({ error: "User already exists" });
  }

  try {
    // 2) Luo uusi käyttäjä (bcrypt-hashattu)
    await addOneUser(username, password);
    res.status(201).json({ success: true, username });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
