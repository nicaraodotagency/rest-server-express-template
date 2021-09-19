const { response, request } = require("express");
const User = require("../models/users");
const bcryptjs = require("bcryptjs");
const generateJWT = require("../helpers/generate-jwt");

const authLogin = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!user || !validPassword || !user.status) {
      return res
        .status(400)
        .json({ ok: false, msg: "Email or Password Invalid" });
    }

    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      body: {
        user,
        token,
      },
    });
  } catch (error) {
    throw error;
    return res.status(500).json({ ok: false, msg: "Auth Login Error" });
  }
};

module.exports = {
  authLogin,
};
