const { Schema, model } = require("mongoose");

const competitionSchema = new Schema({
    id: Number,
    area: {
        id: Number,
        name: String,
    },
    name: String,
    code: String,
    emblemUrl: String,
    plan: String,
    currentSeason: {
        id: Number,
        startDate: Date,
        endDate: Date,
        currentMatchday: Number,
        winner: {
            id: Number,
            name: String,
            tla: String,
            crestUrl: String,
        },
    },
});

const Competition = model("Competition", competitionSchema);

module.exports = Competition;
