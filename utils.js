console.log("Lataa utils.js");
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const bearer = req.header("Authorization") ?? "";
  if (!bearer.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const token = bearer.slice(7);
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "my_secret_key"
    );
    // voit halutessasi hakea käyttäjän DB:stä varmistaaksesi oikeudet
    req.user = { username: decoded.username, id: decoded.sub };
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

export { verifyToken };
