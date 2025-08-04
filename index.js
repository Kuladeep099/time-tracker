const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const TimeEntry = require("./models/TimeEntry");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/productivity", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// POST route to save time
app.post("/track", async (req, res) => {
  try {
    const entry = new TimeEntry(req.body);
    await entry.save();
    res.status(200).send("Time entry saved");
  } catch (err) {
    res.status(500).send("Error saving entry");
  }
});

// GET route to fetch user report
app.get("/report/:userId", async (req, res) => {
  const entries = await TimeEntry.find({ userId: req.params.userId });
  res.json(entries);
});

app.listen(3000, () => {
  console.log("🚀 Backend running on http://localhost:3000");
});
