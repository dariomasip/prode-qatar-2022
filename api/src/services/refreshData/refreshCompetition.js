const axios = require("axios");
const Competition = require("../../models/Competition");

const refreshCompetition = async () => {
  let dataWorldCoup;

  await axios
    .get("http://api.football-data.org/v2/competitions/2000", {
      headers: { "X-Auth-Token": process.env("FOOTBALL_DATA_API_KEY") },
    })
    .then((response) => {
      dataWorldCoup = response.data;
    })
    .catch((err) => console.error(err));

  await Competition.deleteMany();
  await Competition.insertMany(dataWorldCoup);
  console.log(dataWorldCoup);
  return dataWorldCoup;
};

module.exports = refreshCompetition;
