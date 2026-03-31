const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/submit", (req, res) => {
  const newData = req.body;

  let data = [];
  if (fs.existsSync("data.json")) {
    data = JSON.parse(fs.readFileSync("data.json"));
  }

  data.push(newData);
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

  res.json({ message: "Saved successfully" });
});

app.listen(5000, () => console.log("Server running on port 5000"));