const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const jwtValidator = async (req = request, res = response, next) => {
  const authorizationHeader = req.headers.authorization?.split(" ");

  if (!authorizationHeader) {
    return res.status(401).json({
      ok: false,
      body: "Authentication Failed - Token Not Found",
    });
  }

  const token =
    authorizationHeader[0] == "Bearer" ? authorizationHeader[1] : undefined;

  if (!token) {
    return res.status(401).json({
      ok: false,
      body: "Authentication Failed - Token Not Found",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);
    req.loggedUser = await User.findById(uid);

    if (!req.loggedUser || !req.loggedUser.status) {
      return res.status(401).json({
        ok: false,
        body: "Authentication Failed - Token Not Valid",
      });
    }
  } catch (error) {
    return res.status(401).json({
      ok: false,
      body: "Authentication Failed - Token Not Valid",
    });
  }

  next();
};

module.exports = {
  jwtValidator,
};
