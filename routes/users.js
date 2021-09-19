const { Router } = require("express");
const { check } = require("express-validator");
const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require("../controllers/users.controller");
const {
  isValidRole,
  isUniqueEmail,
  isUserId,
} = require("../helpers/db-validations");
const {
  fieldsValidator,
  jwtValidator,
  hasRole,
  isAdmin,
} = require("../middlewares");

const router = Router();

router.get("/", [jwtValidator, hasRole("ADMIN_ROLE", "USER_ROLE")], usersGet);
router.post(
  "/",
  [
    jwtValidator,
    isAdmin,
    check("name", "name required").not().isEmpty(),
    check("password", "password min lenght is 6 chars").isLength({ min: 6 }),
    check("email", "invalid email").isEmail().custom(isUniqueEmail),
    check("role").custom(isValidRole),
    fieldsValidator,
  ],
  usersPost
);
router.put(
  "/:id",
  [
    jwtValidator,
    hasRole("ADMIN_ROLE", "USER_ROLE"),
    check("id", "invalid id").isMongoId().bail().custom(isUserId),
    check("role").custom(isValidRole),
    fieldsValidator,
  ],
  usersPut
);
router.patch(
  "/:id",
  [
    jwtValidator,
    hasRole("ADMIN_ROLE", "USER_ROLE"),
    check("id", "invalid id").isMongoId().bail().custom(isUserId),
    check("role").custom(isValidRole),
    fieldsValidator,
  ],
  usersPatch
);
router.delete(
  "/:id",
  [
    jwtValidator,
    isAdmin,
    check("id", "invalid id").isMongoId().bail().custom(isUserId),
    fieldsValidator,
  ],
  usersDelete
);

module.exports = router;
