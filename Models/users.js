const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String } // Added profile picture field
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;
