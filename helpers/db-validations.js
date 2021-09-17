const Role = require("../models/roles");
const User = require("../models/users");

const isValidRole = async (role = "") => {
  const existRole = await Role.findOne({ name: role });
  if (!existRole) {
  }
};

const isUniqueEmail = async (email = "") => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error("Email already in use");
  }
};

const isUserId = async (id) => {
  const existUserId = await User.findById(id);
  if (!existUserId) {
    throw new Error("User Id does not exists");
  }
};

module.exports = {
  isValidRole,
  isUniqueEmail,
  isUserId,
};
