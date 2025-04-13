import { Router } from "express";
import jwt from "jsonwebtoken";
import { logonUsers, findOneUser } from "../database.js";
let router = Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findOneUser(username);
    if (!user[0]) return res.status(401).json({ error: "User not found" });

    if (user[0].password === password) {
      const token = jwt.sign({ username }, "my_secret_key", {
        expiresIn: "1d",
      });
      logonUsers.set(username, { ...user[0], token });
      res.json({
        username,
        access_token: token,
        token_type: "Bearer",
        expires_in: "1d",
      });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
