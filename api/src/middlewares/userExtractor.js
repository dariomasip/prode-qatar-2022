const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authorization = req.get("authorization");

  let token = "";
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  let decodedToken = {};

  try {
    decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);
  } catch (error) {
    console.error({ error });
  }

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "Token no encotrado o inválido" });
  }

  const { id: userId, email, username } = decodedToken;

  req.userId = userId;
  req.email = email;
  req.username = username;

  next();
};
