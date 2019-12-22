const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  role: { type: String, default: "user" },

  name: {
    type: String
  },

  email: {
    type: String
  },

  password: {
    type: String
  }
});

module.exports = User = mongoose.model("user", UserSchema);
