const express = require("express");
const router = express.Router();

const {
  getNotifications,
  deleteNotification,
  getUsernames,
} = require("../controllers/user.controller");
const userExtractor = require("../middlewares/userExtractor");

router.get("/usuario/notificaciones", userExtractor, getNotifications);

router.get("/usuario/usernames", getUsernames);

router.post(
  "/usuario/notificacion/eliminar/:notification",
  userExtractor,
  deleteNotification
);

module.exports = router;
