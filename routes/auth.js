const { Router } = require("express");
const { check } = require("express-validator");
const { authLogin } = require("../controllers/auth.controller");
const { fieldsValidator } = require("../middlewares/fields-validator");

const router = Router();

router.post(
  "/login",
  [
    check("email", "email required").isEmail(),
    check("password", "password required").not().isEmpty(),
    fieldsValidator,
  ],
  authLogin
);

module.exports = router;
