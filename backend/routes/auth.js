const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET = "supersecretkey";


// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, age, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      age,
      password: hashedPassword,
    });

    await user.save();
    res.json({ message: "User Registered!" });

  } catch (err) {
    res.status(500).json(err);
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: user._id }, SECRET);
  res.json({ token });
});


// GET USER DETAILS (Protected)
router.get("/profile", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, SECRET);
  const user = await User.findById(decoded.id).select("-password");
  res.json(user);
});

module.exports = router;