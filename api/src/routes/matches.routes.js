const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Prediction = require("../models/Prediction");
const Matches = require("../models/Match");
const Team = require("../models/Team");

router.get("/partidos", async (req, res) => {
  console.log("hola");
  const matches = await Matches.find({});
  res.send(matches);
});

module.exports = router;
