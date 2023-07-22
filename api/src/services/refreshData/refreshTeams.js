const axios = require("axios");
const Team = require("../../models/Team");

const refreshTeams = async () => {
  let teamsWorld;

  await axios
    .get("http://api.football-data.org/v2/competitions/2000/teams", {
      headers: { "X-Auth-Token": process.env("FOOTBALL_DATA_API_KEY") },
    })
    .then((response) => {
      teamsWorld = response.data.teams;
    })
    .catch((err) => console.error(err));

  await Team.deleteMany();
  await Team.insertMany(teamsWorld);
  return teamsWorld;
};

module.exports = refreshTeams;
