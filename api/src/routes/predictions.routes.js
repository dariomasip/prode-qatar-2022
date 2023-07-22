const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Match = require("../models/Match");
const userExtractor = require("../middlewares/userExtractor");

const {
  addPredictions,
  getResults,
  getResultsUsers,
} = require("../controllers/predictions.controller");

router.get("/pronosticos", userExtractor, getResults);

router.get("/pronosticos/:idMatch", userExtractor, getResultsUsers);

router.post("/pronosticos", userExtractor, addPredictions);

module.exports = router;
