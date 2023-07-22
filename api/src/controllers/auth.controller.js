const User = require("../models/User");
const uuid = require("uuid");
const sendMail = require("../helpers/sendMail");
const jwt = require("jsonwebtoken");
const Tournament = require("../models/Tournament");

const authController = {};

authController.login = async (req, res) => {
  let errors = [];
  const { username, password } = req.body;

  if (username && password) {
    const userCheck = await User.findOne(
      { "credentials.username": username },
      {
        "credentials.email": 1,
        "credentials.username": 1,
        "credentials.verifiedAccount": 1,
        "credentials.password": 1,
      }
    );

    if (userCheck) {
      const {
        credentials: { verifiedAccount: verifiedAccount },
      } = userCheck;

      if (!verifiedAccount) {
        errors.push("No se encuentra verificada la cuenta");
        return res.status(401).json({ errors });
      }

      if (!(await userCheck.comparePassword(password))) {
        errors.push("Contraseña incorrecta");
        return res.status(401).json({ errors });
      } else {
        const userForToken = {
          id: userCheck._id,
          email: userCheck.credentials.email,
          username: userCheck.credentials.username,
        };

        const token = jwt.sign(userForToken, `${process.env.JWT_KEY}`);
        console.log(
          "🚀 ~ file: auth.controller.js ~ line 44 ~ authController.login= ~ token",
          token
        );
        return res.send({
          id: userCheck._id,
          username: userCheck.credentials.username,
          email: userCheck.credentials.email,
          token,
        });
      }
    } else {
      errors.push("Correo electrónico o contraseña inválida");
      return res.status(401).json({ errors });
    }
  } else {
    errors.push("Datos incompletos");
    return res.status(401).json({ errors });
  }
};

authController.register = async (req, res) => {
  let errorsCheck = [];

  const { username, email, password } = req.body;

  const usernameCheck = await User.findOne(
    { "credentials.username": username },
    {
      "credentials.username": 1,
    }
  );

  const emailCheck = await User.findOne(
    { "credentials.email": email },
    {
      "credentials.email": 1,
    }
  );

  if (usernameCheck || emailCheck) {
    if (usernameCheck) errorsCheck.push("Ya existe el usuario.");
    if (emailCheck) errorsCheck.push("Ya existe el email.");
    return res.status(401).json({ errorsCheck });
  } else {
    const tokenVerication = uuid.v1();
    const newUser = new User({
      "credentials.username": username,
      "credentials.email": email,
      "credentials.password": password,
      "credentials.tokenVerification": tokenVerication,
    });

    await newUser.save();

    // Unión al torneo

    const tournament = "ED35E3001";

    const userId = await User.findOne(
      { "credentials.username": username },
      {
        _id: 1,
      }
    );

    await Tournament.updateOne(
      { code: tournament },
      {
        $addToSet: {
          participants: {
            id: userId._id,
            username: username,
            rol: "Miembro",
            points: 0,
          },
        },
      }
    );
    // await sendMail(tokenVerication, email, username);

    res.status(200).json("Usuario registrado");
  }
};

authController.confirmarCuenta = async (req, res) => {
  const { token } = req.params;

  const tokenUser = await User.findOne(
    { "credentials.tokenVerification": token },
    {
      "credentials.tokenVerification": 1,
    }
  );

  try {
    if (!tokenUser) throw new Error("Token de vericacion de email invalido.");
    const update = await User.findOneAndUpdate(
      {
        "credentials.tokenVerification": token,
      },
      {
        $set: { "credentials.verifiedAccount": true },
      }
    );

    res.redirect("https://theprophecygame.dariomasip.com/login");
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = authController;
