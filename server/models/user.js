const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  profilePicture: String,
  verified: Boolean,
  googleId: String,
  googleAuth: Boolean
});

const User = mongoose.model("User", userSchema);

module.exports = User;
