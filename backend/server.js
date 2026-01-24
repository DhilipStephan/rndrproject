const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Absolute path to frontend folder
const frontendPath = path.join(__dirname, "../frontend");

// Serve static files (css, images, html)
app.use(express.static(frontendPath));

// API
const FILE = "messages.json";

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const entry = { name, email, message, date: new Date().toISOString() };

  let data = [];
  if (fs.existsSync(FILE)) {
    data = JSON.parse(fs.readFileSync(FILE));
  }

  data.push(entry);
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

  res.json({ message: "Thank you! We will contact you soon." });
});

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

