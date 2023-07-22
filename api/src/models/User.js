const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  credentials: {
    username: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    tokenVerification: { type: String },
    verifiedAccount: { type: Boolean, default: false },
  },
  profile: {
    firstname: { type: String, default: null },
    lastname: { type: String, default: null },
    dateOfBirth: { type: Date, default: null },
    favoriteTeam: {
      id: { type: Number, default: null },
      name: { type: String, default: null },
    },
  },
  stats: {
    points: { type: Number, default: 0 },
    rank: {
      global: { type: Number, default: null },
      local: { type: Number, default: null },
    },
    achievements: {
      hammering: { type: Boolean, default: false },
      unbeaten: { type: Boolean, default: false },
      streak: {
        three: { type: Boolean, default: false },
        six: { type: Boolean, default: false },
        twelve: { type: Boolean, default: false },
        twentyFour: { type: Boolean, default: false },
        fortyEight: { type: Boolean, default: false },
      },
      success: {
        first: { type: Boolean, default: false },
        five: { type: Boolean, default: false },
        ten: { type: Boolean, default: false },
        fifteen: { type: Boolean, default: false },
        twenty: { type: Boolean, default: false },
        twentyFive: { type: Boolean, default: false },
        thirty: { type: Boolean, default: false },
        thirtyFive: { type: Boolean, default: false },
        forty: { type: Boolean, default: false },
        fortyFive: { type: Boolean, default: false },
        fifty: { type: Boolean, default: false },
        fiftyFive: { type: Boolean, default: false },
      },
    },
  },
  predictions: [
    {
      date: { type: Date, default: Date.now() },
      result: { type: Number, default: null },
      match: {
        id: { type: Number, default: null },
      },
      score: {
        homeTeam: { type: Number, default: null },
        awayTeam: { type: Number, default: null },
      },
    },
  ],
  social: {
    tournaments: [
      {
        id: { type: String },
        rol: { type: String },
      },
    ],
  },
  notifications: [
    {
      date: { type: Date, default: Date.now() },
      type: { type: String },
      content: { type: String },
      isDone: { type: Boolean, default: false },
      isRead: { type: Boolean, default: false },
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("credentials.password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.credentials.password, salt);

    user.credentials.password = hash;
    next();
  } catch (error) {
    console.error(error);
    next();
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.credentials.password);
};

const User = model("User", userSchema);

module.exports = User;
