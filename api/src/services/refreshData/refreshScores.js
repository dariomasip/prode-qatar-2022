const axios = require("axios");
const { response } = require("express");
const Score = require("../../models/Score");

const refreshScores = async () => {
  const DBScoresWorldCup = await Score.findOne({})
    .sort({ $natural: -1 })
    .limit(1);

  console.log(
    "🚀 ~ file: refreshScores.js ~ line 7 ~ refreshScores ~ DBScoresWorldCup",
    DBScoresWorldCup
  );

  let APIscoresWorldCup;
  await axios
    .get("http://api.football-data.org/v2/competitions/2000/standings", {
      headers: { "X-Auth-Token": process.env("FOOTBALL_DATA_API_KEY") },
    })
    .then((response) => {
      APIscoresWorldCup = response.data;
    })
    .catch((err) => console.error(err));

  let DBcurrentMatchday;
  let APIcurrentMatchday;

  if (DBScoresWorldCup) {
    DBcurrentMatchday = DBScoresWorldCup.season.currentMatchday;
    APIcurrentMatchday = APIscoresWorldCup.season.currentMatchday;
    DBcurrentMatchday === APIcurrentMatchday
      ? await Score.replaceOne(
          { currentMatchday: DBcurrentMatchday },
          APIscoresWorldCup
        )
      : await Score.insertMany(APIscoresWorldCup);
  } else {
    await Score.insertMany(APIscoresWorldCup);
  }

  console.log("l", DBcurrentMatchday, APIcurrentMatchday);

  return APIscoresWorldCup;
};

module.exports = refreshScores;
