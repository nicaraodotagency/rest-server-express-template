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
const { fieldsValidator } = require("../middlewares/fields-validator");

const router = Router();

router.get("/", usersGet);
router.post(
  "/",
  [
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
    check("id", "invalid id").isMongoId().bail().custom(isUserId),
    check("role").custom(isValidRole),
    fieldsValidator,
  ],
  usersPut
);
router.patch("/:id", usersPatch);
router.delete(
  "/:id",
  [
    check("id", "invalid id").isMongoId().bail().custom(isUserId),
    fieldsValidator,
  ],
  usersDelete
);

module.exports = router;
