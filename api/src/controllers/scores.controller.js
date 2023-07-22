const Score = require("../models/Score");
const Team = require("../models/Team");

const scoresController = {};

scoresController.getScores = async (req, res) => {
  const scoreQuery = await Score.findOne(
    { "competition.id": 2000 },
    {
      id: 1,
      "standings.group": 1,
      "standings.table.position": 1,
      "standings.table.team": 1,
    }
  );

  const scoresResults = scoreQuery.standings.flatMap((elementScore, index) => {
    const teams = elementScore.table.map((elementTeam, index) => {
      const { group } = elementScore;
      const resultFinal = [group, elementTeam];
      return resultFinal;
    });
    return teams;
  });

  const scoresWithTla = await Promise.all(
    scoresResults.flatMap(async (elementScore, index) => {
      const team = await Team.findOne(
        { id: elementScore[1].team.id },

        { tla: 1 }
      );
      return [elementScore[0], elementScore[1], team];
    })
  );

  console.log(scoresWithTla);

  res.send(scoresWithTla);
};

scoresController.getScoresDetails = async (req, res) => {
  const scoreQuery = await Score.findOne(
    { "competition.id": 2000 },
    {
      id: 1,
      "standings.group": 1,
      "standings.table.position": 1,
      "standings.table.team": 1,
      "standings.table.playedGames": 1,
      "standings.table.form": 1,
      "standings.table.won": 1,
      "standings.table.draw": 1,
      "standings.table.lost": 1,
      "standings.table.points": 1,
      "standings.table.goalsFor": 1,
      "standings.table.goalsAgainst": 1,
      "standings.table.goalDifference": 1,
    }
  );

  console.log(scoreQuery);

  const standingsResults = scoreQuery.standings.flatMap((standing, index) => {
    const teams = standing.table.map((team) => {
      const { group } = standing;
      const resultFinal = [group, team];
      return resultFinal;
    });
    return teams;
  });

  res.send(standingsResults);
};
module.exports = scoresController;
