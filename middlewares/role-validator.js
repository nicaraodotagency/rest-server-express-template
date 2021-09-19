const { request, response } = require("express");

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!roles.includes(req.loggedUser.role)) {
      return res.status(403).json({
        ok: false,
        body: "Authentication Failed - User is not allowed",
      });
    }
    next();
  };
};

const isAdmin = (req = request, res = response, next) => {
  if (req.loggedUser.role !== "ADMIN_ROLE") {
    return res.status(403).json({
      ok: false,
      body: "Authentication Failed - User is not allowed",
    });
  }

  next();
};

const isUser = (req = request, res = response, next) => {
  if (req.loggedUser.role !== "USER_ROLE") {
    return res.status(403).json({
      ok: false,
      body: "Authentication Failed - User is not allowed",
    });
  }

  next();
};

module.exports = {
  hasRole,
  isAdmin,
  isUser,
};
