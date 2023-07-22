const { Schema, model } = require("mongoose");

const tournamentSchema = new Schema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  creator: {
    id: { type: String, required: true },
    username: { type: String, required: true },
  },
  creationDate: { type: Date, default: Date.now() },
  points: { type: Number, default: 0 },
  participants: [
    {
      id: { type: String },
      username: { type: String },
      rol: { type: String },
      points: { type: Number, default: null },
      position: { type: Number, default: null },
      positionChange: { type: String, default: null },
      differencePosition: { type: Number, default: "normal" },
      joinDate: { type: Date, default: Date.now() },
    },
  ],
  joinRequests: [
    {
      user: {
        id: { type: String },
        username: { type: String },
      },
      date: { type: Date },
    },
  ],
});

const Tournament = model("Tournament", tournamentSchema);

module.exports = Tournament;
