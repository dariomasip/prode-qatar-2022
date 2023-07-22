require("./database");

const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
var bodyParser = require("body-parser");
const refreshMatches = require("./services/refreshData/refreshMatches");
const uuid = require("uuid");
var util = require("util");
const refreshStats = require("./services/refreshData/refreshStats");
const refreshStatsTournament = require("./services/refreshData/refreshStatsTournament");
var encoder = new util.TextEncoder("utf-8");
console.log(uuid.v1().slice(0, 10).toUpperCase());

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    optionsSuccessStatus: 200,
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api", require("./routes/user.routes"));
app.use("/api", require("./routes/predictions.routes"));
app.use("/api", require("./routes/matches.routes"));
app.use("/api", require("./routes/tournaments.routes"));

// Settings
app.set("port", process.env.PORT || 3001);

// Static files
app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), () => {
  console.log(`Sever on port ${app.get("port")}`);
});
