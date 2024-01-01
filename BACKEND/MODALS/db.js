const mongoose = require("mongoose");

const schema = mongoose.Schema;

//  # NOTE
//  User amount is saved in paise for floating point precesion errors;
const userSchema = new schema({
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
});

const USER = new mongoose.model("USER", userSchema);
module.exports = { USER };
