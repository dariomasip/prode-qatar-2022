const { Schema, model } = require("mongoose");

const matchSchema = new Schema([
  {
    id: Number,
    season: {
      id: Number,
      startDate: String,
      endDate: String,
      currentMatchday: Number,
    },
    utcDate: String,
    matchday: Number,
    stage: String,
    status: String,
    group: String,
    lastUpdated: Date,
    odds: {
      msg: String,
    },
    score: {
      winner: String,
      duration: String,
      fullTime: {
        homeTeam: Number,
        awayTeam: Number,
      },
      halfTime: {
        homeTeam: Number,
        awayTeam: Number,
      },
      extraTime: {
        homeTeam: Number,
        awayTeam: Number,
      },
      penalties: {
        homeTeam: Number,
        awayTeam: Number,
      },
    },
    homeTeam: {
      id: Number,
      name: String,
    },
    awayTeam: {
      id: Number,
      name: String,
    },
    referees: [],
  },
]);

const Match = model("Match", matchSchema);

module.exports = Match;
