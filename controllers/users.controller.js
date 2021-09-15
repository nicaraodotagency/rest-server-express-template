const { request, response } = require("express");

const usersGet = (req = request, res = response) => {
  const query = req.query;

  res.json({
    ok: true,
    msg: { query: query },
  });
};

const usersPost = (req = request, res = response) => {
  const body = req.body;

  res.json({
    ok: true,
    msg: body,
  });
};

const usersPut = (req = request, res = response) => {
  const id = req.params.id;
  const body = req.body;

  res.json({
    ok: true,
    msg: {
      id: id,
      body: body,
    },
  });
};

const usersPatch = (req = request, res = response) => {
  const id = req.params.id;
  const body = req.body;

  res.json({
    ok: true,
    msg: {
      id: id,
      body: body,
    },
  });
};

const usersDelete = (req = request, res = response) => {
  const id = req.params.id;
  const body = req.body;

  res.json({
    ok: true,
    msg: {
      id: id,
      body: body,
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
