const { Schema, model } = require("mongoose");

const teamSchema = new Schema([
    {
        id: Number,
        area: {
            id: Number,
            name: String,
        },
        name: String,
        shortName: String,
        tla: String,
        crestUrl: String,
        address: String,
        phone: String,
        website: String,
        email: String,
        founded: Number,
        clubColors: String,
        venue: String,
        lastUpdated: String,
    },
]);

const Team = model("Team", teamSchema);

module.exports = Team;
