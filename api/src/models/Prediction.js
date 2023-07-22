const { Schema, model } = require("mongoose");

const predictionSchema = new Schema({
    user: {
        id: String,
        username: String,
    },
    match: {
        id: Number,
    },
    score: {
        homeTeam: Number,
        awayTeam: Number,
    },
});

const Prediction = model("Prediction", predictionSchema);

module.exports = Prediction;
