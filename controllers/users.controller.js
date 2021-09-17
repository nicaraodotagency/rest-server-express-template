const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/users");
const { validationResult } = require("express-validator");

const usersGet = async (req = request, res = response) => {
  const { skip = 0, limit = 0 } = req.query;

  const [users, total] = await Promise.all([
    User.find({ status: true }).skip(Number(skip)).limit(Number(limit)),
    User.count({ status: true }),
  ]);

  res.json({
    ok: true,
    body: { users, total },
  });
};

const usersPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({
    ok: true,
    body: user,
  });
};

const usersPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...userData } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    userData.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, userData);

  res.json({
    ok: true,
    msg: {
      id: id,
      body: user,
    },
  });
};

const usersPatch = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...userData } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    userData.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, userData);

  res.json({
    ok: true,
    msg: {
      id: id,
      body: user,
    },
  });
};

const usersDelete = async (req = request, res = response) => {
  const id = req.params.id;

  const user = await User.findByIdAndUpdate(id, { status: false });

  res.json({
    ok: true,
    msg: {
      id: id,
      body: user,
    },
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
