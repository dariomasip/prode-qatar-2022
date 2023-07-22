const User = require("../models/User");

const userController = {};

userController.getNotifications = async (req, res) => {
  const notificationsQuery = await User.findOne(
    { _id: req.userId },
    {
      notifications: 1,
    }
  );

  const { notifications } = notificationsQuery;

  res.send(notifications);
};

userController.deleteNotification = async (req, res) => {
  const { notification } = req.params;

  await User.findOneAndUpdate(
    { _id: req.userId },
    {
      $pull: { notifications: { _id: notification } },
    }
  );

  res.send("Notificación eliminada");
};

userController.getUsernames = async (req, res) => {
  const usernames = await User.find(
    {},
    {
      "credentials.username": 1,
      "credentials.email": 1,
    }
  );

  res.send(usernames);
};

module.exports = userController;
