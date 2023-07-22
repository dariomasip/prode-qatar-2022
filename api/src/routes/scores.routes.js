const express = require("express");
const router = express.Router();

const {
    getScores,
    getScoresDetails,
} = require("../controllers/scores.controller");

router.get("/posiciones", getScores);
router.get("/posiciones/details", getScoresDetails);

module.exports = router;
