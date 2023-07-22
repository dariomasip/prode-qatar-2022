const express = require("express");
const router = express.Router();

const {
  login,
  register,
  confirmarCuenta,
} = require("../controllers/auth.controller");
const User = require("../models/User");

router.post("/registro", register);

router.post("/login", login);

router.get("/confirmar-cuenta/:token", confirmarCuenta);

router.get("/usuario", async (req, res) => {
  const { userId } = req;
  const userData = await User.findById(userId, {
    profile: 1,
  });
  console.log(
    "🚀 ~ file: users.routes.js ~ line 107 ~ router.get ~ userData",
    userData
  );
  res.send(userData);
});

module.exports = router;
