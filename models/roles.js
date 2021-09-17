const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  name: {
    type: String,
    required: [true, "role is required"],
  },
});

module.exports = model("Roles", RoleSchema);
