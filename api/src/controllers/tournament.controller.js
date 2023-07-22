const User = require("../models/User");
const Tournament = require("../models/Tournament");
const uuid = require("uuid");

const tournamentController = {};

tournamentController.createTournament = async (req, res) => {
  const { title, description, type } = req.body;
  console.log("username", req.username);

  const newTournament = new Tournament({
    code: uuid.v1().slice(0, 10).toUpperCase().replace("-", ""),
    "creator.id": req.userId,
    "creator.username": req.username,
    type,
    title,
    description,
    participants: {
      id: req.userId,
      username: req.username,
      rol: "Creador",
    },
  });

  await newTournament.save();

  res.status(200).json("Torneo creado");
};

tournamentController.editTournament = async (req, res) => {
  const { code, title, description } = req.body;

  const creatorCheck = await Tournament.findOne(
    { code },
    {
      creator: { id: 1 },
    }
  );

  if (!(creatorCheck.creator.id === req.userId)) {
    return res.status(401).json({ error: "Usuario no creador." });
  }

  const updateTournament = await Tournament.findOneAndUpdate(
    { code },
    {
      title: title,
      description: description,
    }
  );

  return res.send(updateTournament);
};

tournamentController.getTournaments = async (req, res) => {
  const tournamentsUser = await Tournament.find(
    {
      "participants.id": req.userId,
    },
    {
      code: 1,
      title: 1,
      points: 1,
      "participants._id": 1,
    }
  );

  if (!tournamentsUser.length) {
    return res.status(200).json({ error: "Sin torneos" });
  }

  res.send(tournamentsUser);
};

tournamentController.getTournament = async (req, res) => {
  const { tournament } = req.params;

  const tournamentQuery = await Tournament.findOne({ code: tournament });

  if (!tournamentQuery) {
    return res.status(404).json({ error: "Torneo no encontrado" });
  }

  res.send(tournamentQuery);
};

tournamentController.getOpenTournaments = async (req, res) => {
  const tournamentsOpen = await Tournament.find(
    {},
    {
      code: 1,
      title: 1,
      points: 1,
      "participants._id": 1,
    }
  );

  res.send(tournamentsOpen);
};

tournamentController.joinRequestTournament = async (req, res) => {
  const { tournament } = req.params;
  const isExistsTournament = await Tournament.findOne({ code: tournament });

  if (!isExistsTournament) {
    return res.status(404).json({ error: "Torneo no encontrado." });
  }
};

tournamentController.joinOpenTournament = async (req, res) => {
  const { tournament } = req.params;

  const pointsUser = await User.findOne(
    { _id: req.userId },
    {
      "stats.points": 1,
    }
  );

  const creatorTournament = await Tournament.findOne(
    { code: tournament },
    {
      title: 1,
      creator: {
        id: 1,
      },
    }
  );

  const {
    title,
    creator: { id: creatorId },
  } = creatorTournament;

  const participantsQuery = await Tournament.findOne(
    {
      code: tournament,
    },
    {
      participants: 1,
    }
  );

  const { participants } = participantsQuery;

  const contentNotification = {
    joinUser: {
      id: req.userId,
      username: req.username,
    },
    tournament: {
      code: tournament,
      title: title,
    },
  };

  participants.map(async (participant) => {
    return await User.findOneAndUpdate(
      {
        _id: participant.id,
      },
      {
        $addToSet: {
          notifications: {
            date: Date.now(),
            type: "joinTournament",
            content: JSON.stringify(contentNotification),
          },
        },
      }
    );
  });

  const saveParticipant = await Tournament.updateOne(
    { code: tournament },
    {
      $addToSet: {
        participants: {
          id: req.userId,
          username: req.username,
          rol: "Miembro",
          points: pointsUser.stats.points,
        },
      },
    }
  );

  res.send(saveParticipant);
};

tournamentController.joinRequestTournament = async (req, res) => {
  const { tournament } = req.params;

  const checkUser = await Tournament.findOne(
    {
      code: tournament,
      "participants.id": req.userId,
    },
    {
      participants: 1,
    }
  );

  console.log({ checkUser });

  // if (checkUser) {
  //   return res.status(401).json({ error: "Ya se encuentra en este torneo" });
  // }

  await Tournament.findOneAndUpdate(
    { code: tournament },
    {
      $addToSet: {
        joinRequests: {
          user: {
            id: req.userId,
            username: req.username,
          },
          date: Date.now(),
        },
      },
    }
  );

  const creatorTournament = await Tournament.findOne(
    { code: tournament },
    {
      title: 1,
      creator: {
        id: 1,
      },
    }
  );

  const {
    title,
    creator: { id: creatorId },
  } = creatorTournament;

  const contentNotification = {
    requestingUser: {
      id: req.userId,
      username: req.username,
    },
    tournament: {
      code: tournament,
      title: title,
    },
  };

  const saveNotificationCreator = await User.findOneAndUpdate(
    { _id: creatorId },
    {
      $addToSet: {
        notifications: {
          date: Date.now(),
          type: "joinRequest",
          content: JSON.stringify(contentNotification),
        },
      },
    }
  );

  res.send(creatorTournament);
};

tournamentController.joinConfirmTournament = async (req, res) => {
  const { tournament, user, notification } = req.params;

  const usernameQuery = await User.findOne(
    { _id: user },
    {
      credentials: {
        username: 1,
      },
    }
  );

  const pointsUser = await User.findOne(
    { _id: user },
    {
      "stats.points": 1,
    }
  );

  const {
    credentials: { username: username },
  } = usernameQuery;

  const creatorTournament = await Tournament.findOne(
    { code: tournament },
    {
      title: 1,
      creator: {
        id: 1,
      },
    }
  );

  const {
    title,
    creator: { id: creatorId },
  } = creatorTournament;

  const saveParticipant = await Tournament.updateOne(
    { code: tournament },
    {
      $addToSet: {
        participants: {
          id: user,
          username: username,
          rol: "Miembro",
          points: pointsUser.stats.points,
        },
      },
    }
  );

  if (saveParticipant) {
    await User.findOneAndUpdate(
      { _id: req.userId },
      {
        $pull: { notifications: { _id: notification } },
      }
    );

    await Tournament.findOneAndUpdate(
      { code: tournament },
      {
        $pull: { joinRequests: { "user.id": user } },
      }
    );

    const contentNotification = {
      declinedUser: {
        id: req.userId,
        username: req.username,
      },
      tournament: {
        code: tournament,
        title: title,
      },
    };

    await User.findOneAndUpdate(
      {
        _id: user,
      },
      {
        $addToSet: {
          notifications: {
            date: Date.now(),
            type: "acceptRequest",
            content: JSON.stringify(contentNotification),
          },
        },
      }
    );
  }

  res.send(saveParticipant);
};

tournamentController.declineRequestTournament = async (req, res) => {
  const { tournament, user, notification } = req.params;

  const creatorTournament = await Tournament.findOne(
    { code: tournament },
    {
      title: 1,
      creator: {
        id: 1,
      },
    }
  );

  const {
    title,
    creator: { id: creatorId },
  } = creatorTournament;

  await User.findOneAndUpdate(
    { _id: req.userId },
    {
      $pull: { notifications: { _id: notification } },
    }
  );

  await Tournament.findOneAndUpdate(
    { code: tournament },
    {
      $pull: { joinRequests: { "user.id": user } },
    }
  );

  const contentNotification = {
    declinedUser: {
      id: req.userId,
      username: req.username,
    },
    tournament: {
      code: tournament,
      title: title,
    },
  };

  await User.findOneAndUpdate(
    { _id: user },
    {
      $addToSet: {
        notifications: {
          date: Date.now(),
          type: "declinedRequest",
          content: JSON.stringify(contentNotification),
        },
      },
    }
  );
};

tournamentController.cancelRequestTournament = async (req, res) => {
  const { tournament, user } = req.params;

  await Tournament.findOneAndUpdate(
    {
      code: tournament,
    },
    {
      $pull: { joinRequests: { "user.id": user } },
    }
  );

  const creatorTournament = await Tournament.findOne(
    { code: tournament },
    {
      title: 1,
      creator: {
        id: 1,
      },
    }
  );

  const {
    title,
    creator: { id: creatorId },
  } = creatorTournament;

  const notificationsQuery = await User.findOne(
    { _id: creatorId },
    {
      notifications: 1,
    }
  );

  const { notifications } = notificationsQuery;

  let notificationsArray = [];

  notifications.map((notification) => {
    const contentJSON = JSON.parse(notification.content);

    notificationsArray.push([notification._id, contentJSON]);
  });

  console.log({ notificationsArray });

  const notificationForDelete = notificationsArray.filter(
    (notification) =>
      notification[1].requestingUser.id === user ||
      notification[1].declinedUser.id === user
  );

  if (notificationForDelete.length) {
    const idNotification = notificationForDelete[0][0];

    await User.findOneAndUpdate(
      {
        _id: creatorId,
      },
      {
        $pull: {
          notifications: { _id: idNotification.toString() },
        },
      }
    )
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }
};

tournamentController.leaveTournament = async (req, res) => {
  const { tournament } = req.params;

  await Tournament.findOneAndUpdate(
    { code: tournament },
    {
      $pull: { participants: { id: req.userId } },
    }
  );

  const creatorTournament = await Tournament.findOne(
    { code: tournament },
    {
      title: 1,
      creator: {
        id: 1,
      },
    }
  );

  const {
    title,
    creator: { id: creatorId },
  } = creatorTournament;

  const participantsQuery = await Tournament.findOne(
    {
      code: tournament,
    },
    {
      participants: 1,
    }
  );

  const { participants } = participantsQuery;

  const contentNotification = {
    leaveUser: {
      id: req.userId,
      username: req.username,
    },
    tournament: {
      code: tournament,
      title: title,
    },
  };

  participants.map(async (participant) => {
    return await User.findOneAndUpdate(
      {
        _id: participant.id,
      },
      {
        $addToSet: {
          notifications: {
            date: Date.now(),
            type: "leaveTournament",
            content: JSON.stringify(contentNotification),
          },
        },
      }
    );
  });
};

module.exports = tournamentController;
