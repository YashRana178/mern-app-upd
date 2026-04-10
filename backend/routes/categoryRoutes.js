const router = require("express").Router();
const Category = require("../models/Category");

// GET all
router.get("/", async (req, res) => {
  const data = await Category.find();
  res.json(data);
});

// ADD
router.post("/", async (req, res) => {
  const newData = new Category(req.body);
  await newData.save();
  res.json(newData);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;