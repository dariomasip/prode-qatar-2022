const { Schema, model } = require("mongoose");

const scoreSchema = new Schema({
    competition: {
        id: Number,
        area: {
            id: Number,
            name: String,
        },
        name: String,
        code: String,
        plan: String,
        lastUpdated: String,
    },
    season: {
        id: Number,
        startDate: String,
        endDate: String,
        currentMatchday: Number,
        avaibleStages: [],
    },
    standings: [],
});

const Score = model("Score", scoreSchema);

module.exports = Score;
