const User = require("../models/User");
const Prediction = require("../models/Prediction");
const Match = require("../models/Match");
const refreshMatches = require("../services/refreshData/refreshMatches");

const predictionsController = {};

predictionsController.addPredictions = async (req, res) => {
  const { idMatch, homeTeam, awayTeam } = req.body;
  const { userId } = req;

  const matchStatusCheck = await Match.findOne(
    {
      id: idMatch,
    },
    {
      status: 1,
    }
  );

  const { status } = matchStatusCheck;

  if (status === "SCHEDULED") {
    const userPredicts = await User.findById(userId, {
      predictions: { match: { id: 1 } },
    });

    const idMatchFilter = userPredicts.predictions.find(
      (prediction) => prediction.match.id === idMatch
    );

    if (idMatchFilter) {
      console.log(
        "Si existe la prediccion del partido",
        idMatchFilter.match.id
      );

      const datePredict = await User.findOne(
        {
          _id: userId,
          "predictions.match.id": idMatchFilter.match.id,
        },
        {
          "predictions.$": 1,
        }
      );

      await User.updateOne(
        {
          _id: userId,
          "predictions.match.id": idMatchFilter.match.id,
        },
        {
          $set: {
            "predictions.$": {
              date: datePredict.predictions[0].date,
              result: null,
              match: {
                id: idMatch,
              },
              score: {
                homeTeam: homeTeam,
                awayTeam: awayTeam,
              },
            },
          },
        }
      );
    } else {
      await User.findByIdAndUpdate(userId, {
        $addToSet: {
          predictions: {
            result: null,
            match: {
              id: idMatch,
            },
            score: {
              homeTeam: homeTeam,
              awayTeam: awayTeam,
            },
          },
        },
      });
    }
  } else {
    return res
      .status(401)
      .json({ errors: "Ha expirado el tiempo para pronosticar este partido." });
  }

  res.send("Pronosticos enviados");
};

predictionsController.getResults = async (req, res) => {
  const { userId } = req;
  const resultUserQuery = await User.findOne(
    { _id: userId },
    { predictions: 1 }
  );

  const { predictions } = resultUserQuery;

  res.send(predictions);
};

predictionsController.getResultsUsers = async (req, res) => {
  const { idMatch } = req.params;

  const predictsUsers = await User.find(
    {
      "predictions.match.id": idMatch,
    },
    {
      "credentials.username": 1,
      "predictions.$": 1,
    }
  );
  console.log(
    "🚀 ~ file: predictions.controller.js ~ line 117 ~ predictionsController.getResultsUsers= ~ predictsUsers",
    predictsUsers
  );
  res.send(predictsUsers);
};

module.exports = predictionsController;
