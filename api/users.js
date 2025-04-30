console.log("Lataa users.js");
import { Router } from "express";
import { getUserRecordCounts } from "../database.js";
import { verifyToken } from "../utils.js";

const router = Router();
router.get("/record-counts", verifyToken, async (req, res) => {
  const stats = await getUserRecordCounts();
  res.json(stats);
});

export default router;
