const jwt = require("jsonwebtoken");

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(payload, process.env.PRIVATE_KEY, {}, (err, token) => {
      if (err) {
        reject("Token not generated");
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = generateJWT;
