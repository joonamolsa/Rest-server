import { Router } from "express";
import jwt from "jsonwebtoken";
import { logonUsers, findOneUser } from "../database.js";
let router = Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findOneUser(username);
    if (!user) return res.status(401).json({ error: "User not found" });

    if (user.password === password) {
      const token = jwt.sign({ username }, "my_secret_key", {
        expiresIn: "1d",
      });
      logonUsers.set(username, { ...user, token });
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
