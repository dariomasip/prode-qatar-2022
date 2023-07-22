const User = require("../../models/User");
const Match = require("../../models/Match");
const Tournament = require("../../models/Tournament");

const refreshStatsTournament = async () => {
  const participantsQuery = await Tournament.find(
    {},
    {
      participants: 1,
    }
  );

  const tournamentsArray = await Tournament.find(
    {},
    {
      code: 1,
    }
  );

  tournamentsArray.map(async (tournament) => {
    let positionsCurrentArray = [];
    const predictionsTournament = await Tournament.findOne(
      {
        code: tournament.code,
      },
      {
        participants: 1,
      }
    );

    const { participants } = predictionsTournament;

    const positionsCurrent = await Promise.all(
      participants.map(async (participant, index) => {
        const positionCurrentQuery = await Tournament.findOne(
          {
            code: tournament.code,
            participants: { $elemMatch: { _id: participant._id } },
          },
          {
            "participants.$": 1,
          }
        );

        const { participants } = positionCurrentQuery;
        const positionCurrent = participants[0].position;
        const user = participants[0].id;

        positionsCurrentArray.push({
          positionCurrent,
          user,
        });

        return positionsCurrentArray;
      })
    );

    const participantsOrdened = participants.sort((a, b) => {
      if (a.points > b.points) {
        return -1;
      }

      if (a.points < b.points) {
        return 1;
      } else {
        if (a.joinDate > b.joinDate) {
          return 1;
        }

        if (a.joinDate < b.joinDate) {
          return -1;
        }

        return 0;
      }
    });

    participantsOrdened.map(async (participant, index) => {
      const positionParticipant = positionsCurrent[0].find(
        (position) => position.user == participant.id
      );

      let statusPosition;
      let diferencePosition;
      positionParticipant.positionCurrent > index + 1
        ? (statusPosition = "ascendió")
        : positionParticipant.positionCurrent < index + 1
        ? (statusPosition = "descendió")
        : (statusPosition = "normal");

      if (statusPosition === "descendió" || statusPosition === "ascendió") {
        diferencePosition = positionParticipant.positionCurrent - (index + 1);
      } else {
        diferencePosition = null;
      }

      await Tournament.updateMany(
        {
          code: tournament.code,
        },
        {
          $set: {
            "participants.$[elem].position": index + 1,
            "participants.$[elem].positionChange": statusPosition,
            "participants.$[elem].differencePosition": diferencePosition,
          },
        },
        {
          arrayFilters: [{ "elem.id": participant.id }],
          multi: true,
        }
      );

      console.log(
        "posición actual: ",
        positionParticipant.positionCurrent,
        "->",
        "posicion nueva: ",
        index + 1,
        "=",
        statusPosition,
        diferencePosition,
        " puestos."
      );
    });

    // console.log({ participantsOrdened });
  });
};

module.exports = refreshStatsTournament;
