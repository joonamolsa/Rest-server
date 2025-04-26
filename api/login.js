console.log("Lataa login.js");
import { Router } from "express";
import jwt from "jsonwebtoken";
import { findOneUser } from "../database.js";

const router = Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  // 1) Hae käyttäjä DB:stä
  const user = await findOneUser(username);

  // 2) Jos löytyi ja salasana OK, luo token
  if (user && user.password === password) {
    const token = jwt.sign(
      { sub: user._id.toString(), username: user.username },
      process.env.JWT_SECRET || "my_secret_key",
      { expiresIn: "1h" }
    );

    return res.json({
      username: user.username,
      access_token: token,
      token_type: "Bearer",
      expires_in: 3600,
    });
  }

  // 3) Muuten epäonnistuu
  res.status(401).json({ error: "Login failed" });
});

export default router;
