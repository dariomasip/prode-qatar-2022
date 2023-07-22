const axios = require("axios");
const Match = require("../../models/Match");

const refreshMatches = async () => {
  let APIMatchesWorldCup;
  let diferentData;
  const DBMatchesWorldCup = await Match.find({});

  await axios
    .get("http://api.football-data.org/v2/competitions/2001/matches", {
      headers: { "X-Auth-Token": process.env("FOOTBALL_DATA_API_KEY") },
    })
    .then((response) => {
      APIMatchesWorldCup = response.data.matches;
    })
    .catch((err) => console.error(err));

  await Match.deleteMany();
  await Match.insertMany(APIMatchesWorldCup);
  console.log(APIMatchesWorldCup);
  return APIMatchesWorldCup;
};

module.exports = refreshMatches;
