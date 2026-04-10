const express = require("express");
const router = express.Router();
const Settings = require("../models/Settings");

// GET all partitions
router.get("/settings", async (req, res) => {
  const data = await Settings.find();
  res.json(data);
});

// CREATE partition
router.post("/settings", async (req, res) => {
  const newItem = new Settings(req.body);
  await newItem.save();
  res.json(newItem);
});

// UPDATE partition
router.put("/settings/:id", async (req, res) => {
  const updated = await Settings.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE partition
router.delete("/settings/:id", async (req, res) => {
  try {
    await Settings.findByIdAndDelete(req.params.id);
    res.json({ message: "Section deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;