const express = require("express");
const User = require("../models/User");
const Prediction = require("../models/Prediction");
const Matches = require("../models/Match");
const Team = require("../models/Team");

const matchesController = {};

matchesController.getMatches = async (req, res) => {
  const matches = await Matches.find({});
  res.send(matches);
};

module.exports = matchesController;
