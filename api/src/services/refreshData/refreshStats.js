const User = require("../../models/User");
const Match = require("../../models/Match");
const Tournament = require("../../models/Tournament");

const refreshStats = async () => {
  const resultUserQuery = await User.find({}, { _id: 1, predictions: 1 });

  resultUserQuery.map(async (resultUserMap, index) => {
    let acumulatedPoints = 0;
    resultUserMap.predictions.forEach(async (element, indexElement) => {
      const match = await Match.findOne(
        { id: element.match.id },
        {
          id: 1,
          status: 1,
          score: {
            fullTime: 1,
          },
          homeTeam: { name: 1 },
          awayTeam: { name: 1 },
        }
      );
      const {
        match: { id: idMatch },
        score: { homeTeam: homeTeamUser, awayTeam: awayTeamUser },
      } = element;
      const {
        score: {
          fullTime: { homeTeam: homeTeamMatch, awayTeam: awayTeamMatch },
        },
        homeTeam: { name: homeTeamName },
        awayTeam: { name: awayTeamName },
      } = match;
      const resultMatch = [homeTeamMatch, awayTeamMatch];
      const teamsMatch = [homeTeamName, awayTeamName];
      const resultUser = [homeTeamUser, awayTeamUser];

      if (!resultMatch.includes(null)) {
        let statusResultMatch;
        let statusResultUser;

        resultMatch[0] === resultMatch[1]
          ? (statusResultMatch = 0)
          : resultMatch[0] > resultMatch[1]
          ? (statusResultMatch = 1)
          : (statusResultMatch = -1);

        resultUser[0] === resultUser[1]
          ? (statusResultUser = 0)
          : resultUser[0] > resultUser[1]
          ? (statusResultUser = 1)
          : (statusResultUser = -1);

        let resultPrediction;

        JSON.stringify(resultMatch) === JSON.stringify(resultUser) &&
          (resultPrediction = 3);
        if (!resultPrediction) {
          statusResultMatch === statusResultUser
            ? (resultPrediction = 1)
            : (resultPrediction = 0);
        }

        const stringQuery = `predictions.${indexElement}.result`;

        acumulatedPoints += resultPrediction;

        await User.findByIdAndUpdate(resultUserMap._id, {
          $set: {
            "stats.points": acumulatedPoints,
            [stringQuery]: resultPrediction,
          },
        });

        console.log(
          "Equipos",
          teamsMatch,
          "Partido",
          statusResultMatch,
          "Usuario",
          statusResultUser,
          ":",
          resultPrediction
        );

        await Tournament.updateMany(
          {
            "participants.id": resultUserMap._id,
          },
          {
            $set: { "participants.$[elem].points": acumulatedPoints },
          },
          {
            arrayFilters: [{ "elem.id": resultUserMap._id }],
            multi: true,
          }
        );
      }
    });
  });

  return resultUserQuery;
};

module.exports = refreshStats;
