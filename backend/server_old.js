const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "messages.json";

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const entry = {
    name,
    email,
    message,
    date: new Date().toISOString()
  };

  let data = [];
  if (fs.existsSync(FILE)) {
    data = JSON.parse(fs.readFileSync(FILE));
  }

  data.push(entry);
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

  res.json({ message: "Thank you! We will contact you soon." });
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});

