// GET /users/record-counts
router.get("/record-counts", verifyToken, async (req, res) => {
  const stats = await getUserRecordCounts();
  res.json(stats);
});
