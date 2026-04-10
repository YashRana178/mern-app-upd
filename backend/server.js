const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const categoryRoutes = require("./routes/categoryRoutes"); 

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", settingsRoutes);
app.use("/api/category", categoryRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));